-- =============================================
-- MESSAGING SYSTEM
-- Direct messaging between users and companies
-- Supports both authenticated and guest users
-- =============================================

-- =============================================
-- CONVERSATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Participants
    company_id UUID REFERENCES public.company_profiles(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- NULL for guest users
    
    -- Guest Information (for non-authenticated users)
    guest_name TEXT,
    guest_email TEXT,
    guest_phone TEXT,
    
    -- Conversation Details
    subject TEXT NOT NULL,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'archived')),
    
    -- Context (what service/page they messaged from)
    context_type TEXT CHECK (context_type IN ('service', 'profile', 'project', 'general')),
    context_id TEXT, -- ID of service, project, etc.
    
    -- Metadata
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    
    -- Constraints
    CONSTRAINT guest_or_user_required CHECK (
        user_id IS NOT NULL OR 
        (guest_name IS NOT NULL AND guest_email IS NOT NULL)
    )
);

-- Indexes
CREATE INDEX idx_conversations_company_id ON public.conversations(company_id);
CREATE INDEX idx_conversations_user_id ON public.conversations(user_id);
CREATE INDEX idx_conversations_guest_email ON public.conversations(guest_email);
CREATE INDEX idx_conversations_status ON public.conversations(status);
CREATE INDEX idx_conversations_last_message_at ON public.conversations(last_message_at DESC);

-- Enable RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Company members can see all conversations for their company
CREATE POLICY "conversations_select_company" ON public.conversations 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.company_profiles 
            WHERE id = company_id 
            AND (owner_id = auth.uid() OR is_company_member(id))
        )
    );

-- Authenticated users can see their own conversations
CREATE POLICY "conversations_select_user" ON public.conversations 
    FOR SELECT USING (user_id = auth.uid());

-- Anyone can create a conversation (including guests via service role)
CREATE POLICY "conversations_insert" ON public.conversations 
    FOR INSERT WITH CHECK (true);

-- Company members can update their conversations
CREATE POLICY "conversations_update_company" ON public.conversations 
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.company_profiles 
            WHERE id = company_id 
            AND (owner_id = auth.uid() OR is_company_member(id))
        )
    );

-- Users can update their own conversations
CREATE POLICY "conversations_update_user" ON public.conversations 
    FOR UPDATE USING (user_id = auth.uid());

-- Auto-update updated_at timestamp
CREATE TRIGGER conversations_updated_at 
    BEFORE UPDATE ON public.conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- MESSAGES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
    
    -- Sender Information
    sender_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- NULL if guest or deleted user
    sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'company', 'guest')),
    sender_name TEXT NOT NULL, -- Store name for display (important for guests)
    
    -- Message Content
    content TEXT NOT NULL,
    
    -- Attachments (optional)
    attachments JSONB DEFAULT '[]'::jsonb,
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX idx_messages_is_read ON public.messages(is_read);

-- Enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can see messages in conversations they're part of
CREATE POLICY "messages_select_participant" ON public.messages 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.conversations c
            WHERE c.id = conversation_id
            AND (
                c.user_id = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM public.company_profiles cp
                    WHERE cp.id = c.company_id
                    AND (cp.owner_id = auth.uid() OR is_company_member(cp.id))
                )
            )
        )
    );

-- Participants can insert messages
CREATE POLICY "messages_insert_participant" ON public.messages 
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.conversations c
            WHERE c.id = conversation_id
            AND (
                c.user_id = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM public.company_profiles cp
                    WHERE cp.id = c.company_id
                    AND (cp.owner_id = auth.uid() OR is_company_member(cp.id))
                )
            )
        )
    );

-- Participants can update their own messages (e.g., mark as read)
CREATE POLICY "messages_update_participant" ON public.messages 
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.conversations c
            WHERE c.id = conversation_id
            AND (
                c.user_id = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM public.company_profiles cp
                    WHERE cp.id = c.company_id
                    AND (cp.owner_id = auth.uid() OR is_company_member(cp.id))
                )
            )
        )
    );

-- Auto-update updated_at timestamp
CREATE TRIGGER messages_updated_at 
    BEFORE UPDATE ON public.messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- HELPER FUNCTION: Update conversation timestamp
-- =============================================
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.conversations
    SET last_message_at = NEW.created_at
    WHERE id = NEW.conversation_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update conversation when new message is added
CREATE TRIGGER messages_update_conversation_timestamp
    AFTER INSERT ON public.messages
    FOR EACH ROW EXECUTE FUNCTION update_conversation_last_message();

-- =============================================
-- HELPER VIEWS (Optional - for easier queries)
-- =============================================

-- View for company inbox (all conversations with message counts)
CREATE OR REPLACE VIEW company_inbox AS
SELECT 
    c.id,
    c.company_id,
    c.user_id,
    c.guest_name,
    c.guest_email,
    c.subject,
    c.status,
    c.last_message_at,
    c.created_at,
    COALESCE(p.full_name, c.guest_name) as sender_name,
    COALESCE(p.email, c.guest_email) as sender_email,
    COUNT(m.id) as message_count,
    COUNT(m.id) FILTER (WHERE m.is_read = FALSE AND m.sender_type != 'company') as unread_count
FROM public.conversations c
LEFT JOIN public.profiles p ON c.user_id = p.id
LEFT JOIN public.messages m ON c.id = m.conversation_id
GROUP BY c.id, p.full_name, p.email;

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================
CREATE INDEX idx_messages_conversation_created ON public.messages(conversation_id, created_at DESC);
CREATE INDEX idx_conversations_company_last_message ON public.conversations(company_id, last_message_at DESC);

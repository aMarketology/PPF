-- =============================================
-- SIMPLIFIED COMPANY PROFILES SCHEMA
-- Run this in your Supabase SQL Editor
-- =============================================

-- Create company_profiles table for detailed company information
CREATE TABLE IF NOT EXISTS public.company_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Basic Information
    company_name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    logo_url TEXT,
    cover_image_url TEXT,
    
    -- Contact Information
    website TEXT,
    phone TEXT,
    email TEXT,
    
    -- Address
    street_address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    
    -- Business Details
    specialties TEXT[],
    certifications TEXT[],
    
    -- Stats
    years_in_business INTEGER,
    
    -- Settings
    verified BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Team members table - allows multiple users to manage a company profile
CREATE TABLE IF NOT EXISTS public.company_team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.company_profiles(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    role TEXT CHECK (role IN ('owner', 'admin', 'member')) DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE(company_id, user_id)
);

-- Add indexes
CREATE INDEX idx_company_profiles_owner_id ON public.company_profiles(owner_id);
CREATE INDEX idx_company_profiles_city ON public.company_profiles(city);
CREATE INDEX idx_company_profiles_state ON public.company_profiles(state);
CREATE INDEX idx_company_team_members_company_id ON public.company_team_members(company_id);
CREATE INDEX idx_company_team_members_user_id ON public.company_team_members(user_id);

-- Enable RLS
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_team_members ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is team member of company
CREATE OR REPLACE FUNCTION is_company_member(company_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.company_team_members 
        WHERE company_id = company_uuid AND user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for company_profiles
-- Public can read active company profiles
CREATE POLICY "company_profiles_select" ON public.company_profiles 
    FOR SELECT USING (active = true OR owner_id = auth.uid() OR is_company_member(id));

-- Only engineers can create company profiles
CREATE POLICY "company_profiles_insert" ON public.company_profiles 
    FOR INSERT WITH CHECK (
        auth.uid() = owner_id AND 
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'engineer')
    );

-- Owner and team members can update
CREATE POLICY "company_profiles_update" ON public.company_profiles 
    FOR UPDATE USING (owner_id = auth.uid() OR is_company_member(id));

-- Only owner can delete
CREATE POLICY "company_profiles_delete" ON public.company_profiles 
    FOR DELETE USING (owner_id = auth.uid());

-- RLS Policies for company_team_members
CREATE POLICY "company_team_members_select" ON public.company_team_members 
    FOR SELECT USING (
        user_id = auth.uid() OR 
        company_id IN (SELECT id FROM public.company_profiles WHERE owner_id = auth.uid())
    );

CREATE POLICY "company_team_members_insert" ON public.company_team_members 
    FOR INSERT WITH CHECK (
        company_id IN (SELECT id FROM public.company_profiles WHERE owner_id = auth.uid())
    );

CREATE POLICY "company_team_members_delete" ON public.company_team_members 
    FOR DELETE USING (
        company_id IN (SELECT id FROM public.company_profiles WHERE owner_id = auth.uid())
    );

-- Auto-update updated_at timestamp
CREATE TRIGGER company_profiles_updated_at 
    BEFORE UPDATE ON public.company_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create team member entry when company profile is created
CREATE OR REPLACE FUNCTION auto_add_owner_as_team_member()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.company_team_members (company_id, user_id, role)
    VALUES (NEW.id, NEW.owner_id, 'owner');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER company_profile_add_owner
    AFTER INSERT ON public.company_profiles
    FOR EACH ROW EXECUTE FUNCTION auto_add_owner_as_team_member();

-- =============================================
-- PORTFOLIO PROJECTS TABLE (Simplified)
-- =============================================
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.company_profiles(id) ON DELETE CASCADE NOT NULL,
    
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    
    -- Project Details
    completion_date DATE,
    budget_range TEXT,
    
    -- Media
    images TEXT[], -- Array of image URLs
    
    -- Tags
    tags TEXT[],
    
    -- Settings
    featured BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add indexes
CREATE INDEX idx_portfolio_projects_company_id ON public.portfolio_projects(company_id);
CREATE INDEX idx_portfolio_projects_category ON public.portfolio_projects(category);

-- Enable RLS
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public can read all portfolio projects
CREATE POLICY "portfolio_projects_select" ON public.portfolio_projects 
    FOR SELECT USING (true);

-- Company members can insert projects
CREATE POLICY "portfolio_projects_insert" ON public.portfolio_projects 
    FOR INSERT WITH CHECK (is_company_member(company_id));

-- Company members can update their projects
CREATE POLICY "portfolio_projects_update" ON public.portfolio_projects 
    FOR UPDATE USING (is_company_member(company_id));

-- Company members can delete their projects
CREATE POLICY "portfolio_projects_delete" ON public.portfolio_projects 
    FOR DELETE USING (is_company_member(company_id));

-- Auto-update updated_at timestamp
CREATE TRIGGER portfolio_projects_updated_at 
    BEFORE UPDATE ON public.portfolio_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- PROJECT REQUESTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.project_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    
    -- Budget & Timeline
    budget_min DECIMAL(10, 2),
    budget_max DECIMAL(10, 2),
    deadline DATE,
    location TEXT,
    
    -- Requirements
    requirements TEXT[],
    attachments TEXT[], -- Array of file URLs
    
    -- Status
    status TEXT CHECK (status IN ('open', 'in_review', 'awarded', 'closed', 'cancelled')) DEFAULT 'open',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add indexes
CREATE INDEX idx_project_requests_client_id ON public.project_requests(client_id);
CREATE INDEX idx_project_requests_category ON public.project_requests(category);
CREATE INDEX idx_project_requests_status ON public.project_requests(status);

-- Enable RLS
ALTER TABLE public.project_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public can read open project requests
CREATE POLICY "project_requests_select" ON public.project_requests 
    FOR SELECT USING (status = 'open' OR auth.uid() = client_id);

-- Clients can insert their own project requests
CREATE POLICY "project_requests_insert" ON public.project_requests 
    FOR INSERT WITH CHECK (auth.uid() = client_id);

-- Clients can update their own project requests
CREATE POLICY "project_requests_update" ON public.project_requests 
    FOR UPDATE USING (auth.uid() = client_id);

-- Auto-update updated_at timestamp
CREATE TRIGGER project_requests_updated_at 
    BEFORE UPDATE ON public.project_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- PROPOSALS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.proposals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.project_requests(id) ON DELETE CASCADE NOT NULL,
    engineer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    bid_amount DECIMAL(10, 2) NOT NULL,
    delivery_time TEXT NOT NULL,
    cover_letter TEXT NOT NULL,
    
    -- Milestones (stored as JSONB)
    milestones JSONB,
    
    -- Attachments
    attachments TEXT[],
    
    -- Status
    status TEXT CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')) DEFAULT 'pending',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add indexes
CREATE INDEX idx_proposals_project_id ON public.proposals(project_id);
CREATE INDEX idx_proposals_engineer_id ON public.proposals(engineer_id);
CREATE INDEX idx_proposals_status ON public.proposals(status);

-- Enable RLS
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Project owner and proposal creator can read
CREATE POLICY "proposals_select" ON public.proposals 
    FOR SELECT USING (
        auth.uid() = engineer_id OR 
        auth.uid() IN (
            SELECT client_id FROM public.project_requests WHERE id = project_id
        )
    );

-- Engineers can insert their own proposals
CREATE POLICY "proposals_insert" ON public.proposals 
    FOR INSERT WITH CHECK (auth.uid() = engineer_id);

-- Engineers can update their own proposals (if pending)
CREATE POLICY "proposals_update" ON public.proposals 
    FOR UPDATE USING (auth.uid() = engineer_id AND status = 'pending');

-- Auto-update updated_at timestamp
CREATE TRIGGER proposals_updated_at 
    BEFORE UPDATE ON public.proposals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

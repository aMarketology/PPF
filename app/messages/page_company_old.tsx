'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  MessageSquare, 
  Send, 
  Loader,
  Mail,
  Phone,
  User,
  Clock,
  AlertCircle,
  Archive,
  CheckCircle
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { formatDistanceToNow } from 'date-fns';

interface Conversation {
  id: string;
  company_id: string;
  user_id: string | null;
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  subject: string;
  status: string;
  last_message_at: string;
  created_at: string;
  sender_name?: string;
  sender_email?: string;
  unread_count?: number;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string | null;
  sender_type: 'user' | 'company' | 'guest';
  sender_name: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export default function MessagesPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [senderName, setSenderName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
      markMessagesAsRead(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversations = async () => {
    try {
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setCurrentUserId(user.id);

      // Get user profile for sender name
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      
      setSenderName(profile?.full_name || 'You');

      // Get company that user owns or is a member of
      const { data: companies } = await supabase
        .from('company_profiles')
        .select('id, name')
        .or(`owner_id.eq.${user.id},company_team_members.user_id.eq.${user.id}`);

      if (!companies || companies.length === 0) {
        toast.error('No company profile found');
        return;
      }

      const userCompanyId = companies[0].id;
      setCompanyId(userCompanyId);

      // Load conversations for this company
      const { data: convData, error } = await supabase
        .from('conversations')
        .select(`
          *,
          profiles:user_id(full_name, email)
        `)
        .eq('company_id', userCompanyId)
        .order('last_message_at', { ascending: false });

      if (error) throw error;

      // Transform data to include sender info
      const transformedConversations = convData.map((conv: any) => ({
        ...conv,
        sender_name: conv.profiles?.full_name || conv.guest_name,
        sender_email: conv.profiles?.email || conv.guest_email,
      }));

      setConversations(transformedConversations);

      // Get unread counts
      for (const conv of transformedConversations) {
        const { count } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .eq('conversation_id', conv.id)
          .eq('is_read', false)
          .neq('sender_type', 'company');
        
        conv.unread_count = count || 0;
      }

      setConversations([...transformedConversations]);
      
    } catch (error: any) {
      console.error('Error loading conversations:', error);
      toast.error('Failed to load conversations');
    } finally {
      setIsLoadingConversations(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    setIsLoadingMessages(true);
    try {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
      
    } catch (error: any) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const markMessagesAsRead = async (conversationId: string) => {
    try {
      const supabase = createClient();
      
      await supabase
        .from('messages')
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq('conversation_id', conversationId)
        .eq('is_read', false)
        .neq('sender_type', 'company');
      
      // Update local state
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, unread_count: 0 }
            : conv
        )
      );
      
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const sendMessage = async () => {
    if (!replyMessage.trim() || !selectedConversation || !currentUserId) return;
    
    setIsSending(true);
    try {
      const supabase = createClient();
      
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: selectedConversation.id,
          sender_id: currentUserId,
          sender_type: 'company',
          sender_name: senderName,
          content: replyMessage.trim(),
        });

      if (error) throw error;

      // Reload messages
      await loadMessages(selectedConversation.id);
      setReplyMessage('');
      toast.success('Message sent!');
      
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const updateConversationStatus = async (conversationId: string, status: string) => {
    try {
      const supabase = createClient();
      
      const { error } = await supabase
        .from('conversations')
        .update({ status })
        .eq('id', conversationId);

      if (error) throw error;

      // Update local state
      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversationId ? { ...conv, status } : conv
        )
      );

      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(prev => prev ? { ...prev, status } : null);
      }

      toast.success(`Conversation ${status}`);
      
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  if (isLoadingConversations) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
          <div className="flex items-center justify-center py-20">
            <Loader className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">Manage your company's conversations with clients</p>
          </div>

          {/* Messages Interface */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex h-[700px]">
              
              {/* Conversations List */}
              <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No messages yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {conversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                          selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{conv.sender_name}</p>
                              <p className="text-xs text-gray-500">{conv.sender_email}</p>
                            </div>
                          </div>
                          {(conv.unread_count || 0) > 0 && (
                            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                              {conv.unread_count}
                            </span>
                          )}
                        </div>
                        <p className="font-medium text-sm text-gray-900 mb-1 truncate">{conv.subject}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
                        </div>
                        {conv.status !== 'open' && (
                          <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            {conv.status}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Message Thread */}
              <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Thread Header */}
                    <div className="p-4 border-b border-gray-200 bg-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{selectedConversation.subject}</h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {selectedConversation.sender_email}
                            </div>
                            {selectedConversation.guest_phone && (
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                {selectedConversation.guest_phone}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {selectedConversation.status === 'open' && (
                            <button
                              onClick={() => updateConversationStatus(selectedConversation.id, 'closed')}
                              className="flex items-center px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Close
                            </button>
                          )}
                          <button
                            onClick={() => updateConversationStatus(selectedConversation.id, 'archived')}
                            className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Archive className="h-4 w-4 mr-1" />
                            Archive
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                      {isLoadingMessages ? (
                        <div className="flex items-center justify-center h-full">
                          <Loader className="h-6 w-6 animate-spin text-blue-600" />
                        </div>
                      ) : (
                        <>
                          {messages.map((msg) => (
                            <motion.div
                              key={msg.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${msg.sender_type === 'company' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`max-w-[70%] ${
                                msg.sender_type === 'company' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-white text-gray-900 border border-gray-200'
                              } rounded-2xl p-4 shadow-sm`}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-sm font-medium ${
                                    msg.sender_type === 'company' ? 'text-blue-100' : 'text-gray-600'
                                  }`}>
                                    {msg.sender_name}
                                  </span>
                                  <span className={`text-xs ${
                                    msg.sender_type === 'company' ? 'text-blue-200' : 'text-gray-500'
                                  }`}>
                                    {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                                  </span>
                                </div>
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                              </div>
                            </motion.div>
                          ))}
                          <div ref={messagesEndRef} />
                        </>
                      )}
                    </div>

                    {/* Reply Box */}
                    {selectedConversation.status === 'open' && (
                      <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex items-end space-x-3">
                          <textarea
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                              }
                            }}
                            placeholder="Type your reply..."
                            rows={3}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          />
                          <button
                            onClick={sendMessage}
                            disabled={!replyMessage.trim() || isSending}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium h-[60px] flex items-center"
                          >
                            {isSending ? (
                              <Loader className="h-5 w-5 animate-spin" />
                            ) : (
                              <>
                                <Send className="h-5 w-5 mr-2" />
                                Send
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Select a conversation to view messages</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

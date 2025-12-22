'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  MessageSquare, 
  Send, 
  Loader,
  User,
  Clock,
  Search,
  X,
  Plus,
  CheckCheck,
  Check
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { formatDistanceToNow } from 'date-fns';

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  user_type: string;
}

interface Conversation {
  id: string;
  participant_one_id: string;
  participant_two_id: string;
  last_message_at: string;
  created_at: string;
  other_user: UserProfile;
  last_message?: {
    content: string;
    sender_id: string;
    created_at: string;
  };
  unread_count: number;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  read_at: string | null;
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
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // New conversation modal
  const [showNewConversationModal, setShowNewConversationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      loadConversations();
    }
  }, [currentUserId]);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
      markMessagesAsRead(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Search users as typing
  useEffect(() => {
    if (searchQuery.length >= 2) {
      searchUsers();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const initializeUser = async () => {
    try {
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setCurrentUserId(user.id);

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, full_name, email, user_type')
        .eq('id', user.id)
        .single();
      
      if (profile) {
        setCurrentUserProfile(profile);
      }
      
    } catch (error: any) {
      console.error('Error initializing user:', error);
      toast.error('Failed to load user profile');
    }
  };

  const loadConversations = async () => {
    setIsLoadingConversations(true);
    try {
      const supabase = createClient();
      
      // Get all conversations for current user
      const { data: convData, error } = await supabase
        .from('user_conversations')
        .select('*')
        .or(`participant_one_id.eq.${currentUserId},participant_two_id.eq.${currentUserId}`)
        .order('last_message_at', { ascending: false });

      if (error) throw error;

      // For each conversation, get the other user's profile and last message
      const conversationsWithDetails = await Promise.all(
        (convData || []).map(async (conv) => {
          const otherUserId = conv.participant_one_id === currentUserId 
            ? conv.participant_two_id 
            : conv.participant_one_id;

          // Get other user's profile
          const { data: otherUserProfile } = await supabase
            .from('profiles')
            .select('id, full_name, email, user_type')
            .eq('id', otherUserId)
            .single();

          // Get last message
          const { data: lastMsg } = await supabase
            .from('user_messages')
            .select('content, sender_id, created_at')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          // Get unread count
          const { count } = await supabase
            .from('user_messages')
            .select('*', { count: 'exact', head: true })
            .eq('conversation_id', conv.id)
            .eq('is_read', false)
            .neq('sender_id', currentUserId);

          return {
            ...conv,
            other_user: otherUserProfile,
            last_message: lastMsg,
            unread_count: count || 0
          };
        })
      );

      setConversations(conversationsWithDetails as Conversation[]);
      
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
        .from('user_messages')
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
        .from('user_messages')
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq('conversation_id', conversationId)
        .eq('is_read', false)
        .neq('sender_id', currentUserId);
      
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!replyMessage.trim() || !selectedConversation || !currentUserId) return;

    setIsSending(true);
    try {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('user_messages')
        .insert({
          conversation_id: selectedConversation.id,
          sender_id: currentUserId,
          content: replyMessage.trim()
        })
        .select()
        .single();

      if (error) throw error;

      // Add message to local state
      setMessages(prev => [...prev, data]);
      setReplyMessage('');
      
      // Update conversation in list
      await loadConversations();
      
      toast.success('Message sent!');
      
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const searchUsers = async () => {
    setIsSearching(true);
    try {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, user_type')
        .neq('id', currentUserId!)
        .ilike('full_name', `%${searchQuery}%`)
        .limit(10);

      if (error) throw error;
      setSearchResults(data || []);
      
    } catch (error: any) {
      console.error('Error searching users:', error);
      toast.error('Failed to search users');
    } finally {
      setIsSearching(false);
    }
  };

  const startConversation = async (otherUser: UserProfile) => {
    try {
      const supabase = createClient();
      
      // Use the helper function to get or create conversation
      const { data, error } = await supabase.rpc('get_or_create_conversation', {
        user_one_id: currentUserId,
        user_two_id: otherUser.id
      });

      if (error) throw error;

      // Load the conversation
      const { data: convData } = await supabase
        .from('user_conversations')
        .select('*')
        .eq('id', data)
        .single();

      if (convData) {
        const conversation: Conversation = {
          ...convData,
          other_user: otherUser,
          unread_count: 0
        };
        
        setSelectedConversation(conversation);
        setShowNewConversationModal(false);
        setSearchQuery('');
        setSearchResults([]);
        
        // Reload conversations to update the list
        await loadConversations();
      }
      
    } catch (error: any) {
      console.error('Error starting conversation:', error);
      toast.error('Failed to start conversation');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Navigation />
      
      <div className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">Connect and communicate with other users</p>
          </div>

          {/* Messages Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ height: '70vh' }}>
            <div className="flex h-full">
              
              {/* Conversations List */}
              <div className="w-1/3 border-r border-gray-200 flex flex-col">
                {/* New Conversation Button */}
                <div className="p-4 border-b border-gray-200">
                  <button
                    onClick={() => setShowNewConversationModal(true)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    New Message
                  </button>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto">
                  {isLoadingConversations ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                  ) : conversations.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No conversations yet</p>
                      <p className="text-sm mt-1">Start a new conversation!</p>
                    </div>
                  ) : (
                    conversations.map((conv) => (
                      <motion.button
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`w-full p-4 text-left border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                          selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {conv.other_user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {conv.other_user?.full_name || 'Unknown User'}
                              </h3>
                              {conv.unread_count > 0 && (
                                <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                                  {conv.unread_count}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mb-1">
                              <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                {conv.other_user?.user_type === 'engineer' ? 'Engineer' : 'Client'}
                              </span>
                            </p>
                            {conv.last_message && (
                              <p className="text-sm text-gray-600 truncate">
                                {conv.last_message.sender_id === currentUserId ? 'You: ' : ''}
                                {conv.last_message.content}
                              </p>
                            )}
                            <p className="text-xs text-gray-400 mt-1">
                              {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>
              </div>

              {/* Messages Thread */}
              <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Conversation Header */}
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                          {selectedConversation.other_user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">
                            {selectedConversation.other_user?.full_name || 'Unknown User'}
                          </h2>
                          <p className="text-sm text-gray-600">
                            {selectedConversation.other_user?.email}
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                              {selectedConversation.other_user?.user_type === 'engineer' ? 'Engineer' : 'Client'}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Messages List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {isLoadingMessages ? (
                        <div className="flex items-center justify-center h-full">
                          <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          <div className="text-center">
                            <MessageSquare className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                            <p>No messages yet</p>
                            <p className="text-sm mt-1">Start the conversation!</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          {messages.map((msg) => {
                            const isOwnMessage = msg.sender_id === currentUserId;
                            return (
                              <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                              >
                                <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                                  <div
                                    className={`rounded-2xl px-4 py-3 ${
                                      isOwnMessage
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-900'
                                    }`}
                                  >
                                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                                  </div>
                                  <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                                    <Clock className="w-3 h-3" />
                                    <span>{formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}</span>
                                    {isOwnMessage && (
                                      msg.is_read ? (
                                        <CheckCheck className="w-4 h-4 text-blue-500" />
                                      ) : (
                                        <Check className="w-4 h-4" />
                                      )
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                          <div ref={messagesEndRef} />
                        </>
                      )}
                    </div>

                    {/* Reply Form */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-gray-50">
                      <div className="flex gap-3">
                        <textarea
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={2}
                          disabled={isSending}
                        />
                        <button
                          type="submit"
                          disabled={!replyMessage.trim() || isSending}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {isSending ? (
                            <Loader className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Send
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MessageSquare className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg">Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Conversation Modal */}
      <AnimatePresence>
        {showNewConversationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewConversationModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">New Message</h3>
                <button
                  onClick={() => setShowNewConversationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users by name..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
              </div>

              {/* Search Results */}
              <div className="p-6 overflow-y-auto max-h-96">
                {isSearching ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>{searchQuery.length >= 2 ? 'No users found' : 'Start typing to search users'}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {searchResults.map((user) => (
                      <motion.button
                        key={user.id}
                        onClick={() => startConversation(user)}
                        className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                            {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{user.full_name}</h4>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                              {user.user_type === 'engineer' ? 'Engineer' : 'Client'}
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

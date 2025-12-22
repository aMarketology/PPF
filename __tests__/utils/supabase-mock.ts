// Test utilities for mocking Supabase client

export const mockSupabaseClient = {
  auth: {
    getUser: jest.fn(),
    signUp: jest.fn(),
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
  },
  from: jest.fn((table: string) => ({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    neq: jest.fn().mockReturnThis(),
    or: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    single: jest.fn(),
    maybeSingle: jest.fn(),
  })),
};

// Mock createClient function
export const mockCreateClient = jest.fn(() => mockSupabaseClient);

// Helper to setup auth mock with user
export const setupAuthenticatedUser = (userId = 'test-user-id', userType = 'engineer') => {
  mockSupabaseClient.auth.getUser.mockResolvedValue({
    data: {
      user: {
        id: userId,
        email: 'test@example.com',
        user_metadata: {
          full_name: 'Test User',
          user_type: userType,
        },
      },
    },
    error: null,
  });
};

// Helper to setup auth mock without user
export const setupUnauthenticatedUser = () => {
  mockSupabaseClient.auth.getUser.mockResolvedValue({
    data: { user: null },
    error: null,
  });
};

// Helper to setup profile data
export const setupProfileData = (profile: any) => {
  const fromMock = mockSupabaseClient.from('profiles');
  fromMock.single.mockResolvedValue({
    data: profile,
    error: null,
  });
};

// Helper to setup company data
export const setupCompanyData = (company: any) => {
  const fromMock = mockSupabaseClient.from('company_profiles');
  fromMock.single.mockResolvedValue({
    data: company,
    error: null,
  });
};

// Helper to setup conversations data
export const setupConversationsData = (conversations: any[]) => {
  const fromMock = mockSupabaseClient.from('conversations');
  fromMock.select.mockResolvedValue({
    data: conversations,
    error: null,
  });
};

// Helper to setup messages data
export const setupMessagesData = (messages: any[]) => {
  const fromMock = mockSupabaseClient.from('messages');
  fromMock.select.mockResolvedValue({
    data: messages,
    error: null,
  });
};

// Reset all mocks
export const resetAllMocks = () => {
  jest.clearAllMocks();
  mockSupabaseClient.auth.getUser.mockReset();
  mockSupabaseClient.auth.signUp.mockReset();
  mockSupabaseClient.auth.signInWithPassword.mockReset();
  mockSupabaseClient.from.mockReset();
};

// Mock successful signup
export const mockSuccessfulSignup = () => {
  mockSupabaseClient.auth.signUp.mockResolvedValue({
    data: {
      user: {
        id: 'new-user-id',
        email: 'newuser@example.com',
      },
      session: null,
    },
    error: null,
  });

  const updateMock = mockSupabaseClient.from('profiles').update;
  updateMock.mockResolvedValue({
    data: null,
    error: null,
  });

  const insertMock = mockSupabaseClient.from('company_profiles').insert;
  insertMock.mockResolvedValue({
    data: null,
    error: null,
  });
};

// Mock failed signup
export const mockFailedSignup = (errorMessage = 'Signup failed') => {
  mockSupabaseClient.auth.signUp.mockResolvedValue({
    data: { user: null, session: null },
    error: { message: errorMessage },
  });
};

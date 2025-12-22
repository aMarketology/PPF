import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactCompanyForm from '@/app/components/ContactCompanyForm';
import { 
  mockSupabaseClient, 
  mockCreateClient,
  setupAuthenticatedUser,
  setupUnauthenticatedUser,
  setupProfileData,
  resetAllMocks 
} from '../utils/supabase-mock';
import { toast } from 'react-hot-toast';

// Mock the Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: () => mockSupabaseClient,
}));

describe('ContactCompanyForm', () => {
  beforeEach(() => {
    resetAllMocks();
  });

  const defaultProps = {
    companyId: 'test-company-id',
    companyName: 'Test Engineering Co.',
    contextType: 'service' as const,
    contextId: 'service-123',
  };

  describe('Initial Rendering', () => {
    it('should render trigger button with custom text', () => {
      render(<ContactCompanyForm {...defaultProps} buttonText="Get Quote" />);
      expect(screen.getByText('Get Quote')).toBeInTheDocument();
    });

    it('should render default button text when not provided', () => {
      render(<ContactCompanyForm {...defaultProps} />);
      expect(screen.getByText('Contact Company')).toBeInTheDocument();
    });

    it('should not show modal initially', () => {
      render(<ContactCompanyForm {...defaultProps} />);
      expect(screen.queryByText(/Contact Test Engineering Co./i)).not.toBeInTheDocument();
    });
  });

  describe('Opening Modal', () => {
    it('should open modal when trigger button is clicked', async () => {
      setupUnauthenticatedUser();
      render(<ContactCompanyForm {...defaultProps} />);
      
      const triggerButton = screen.getByText('Contact Company');
      fireEvent.click(triggerButton);

      await waitFor(() => {
        expect(screen.getByText(/Contact Test Engineering Co./i)).toBeInTheDocument();
      });
    });

    it('should check authentication status when opening', async () => {
      setupAuthenticatedUser();
      setupProfileData({
        id: 'test-user-id',
        full_name: 'John Doe',
        email: 'john@example.com',
      });

      render(<ContactCompanyForm {...defaultProps} />);
      
      const triggerButton = screen.getByText('Contact Company');
      fireEvent.click(triggerButton);

      await waitFor(() => {
        expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
      });
    });
  });

  describe('Guest User Form', () => {
    beforeEach(async () => {
      setupUnauthenticatedUser();
      render(<ContactCompanyForm {...defaultProps} />);
      
      const triggerButton = screen.getByText('Contact Company');
      fireEvent.click(triggerButton);

      await waitFor(() => {
        expect(screen.getByText(/Contact Test Engineering Co./i)).toBeInTheDocument();
      });
    });

    it('should show all required fields for guest users', () => {
      expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText("What's your inquiry about?")).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Tell the company about your project/i)).toBeInTheDocument();
    });

    it('should show phone field as optional for guests', () => {
      expect(screen.getByPlaceholderText('(555) 123-4567')).toBeInTheDocument();
    });

    it('should validate required fields', async () => {
      const user = userEvent.setup();
      const sendButton = screen.getByText('Send Message');
      
      await user.click(sendButton);

      await waitFor(() => {
        expect(screen.getByText(/Name must be at least 2 characters/i)).toBeInTheDocument();
      });
    });

    it('should validate email format', async () => {
      const user = userEvent.setup();
      
      const emailInput = screen.getByPlaceholderText('john@example.com');
      await user.type(emailInput, 'invalid-email');
      
      const sendButton = screen.getByText('Send Message');
      await user.click(sendButton);

      await waitFor(() => {
        expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('should submit form with guest information', async () => {
      const user = userEvent.setup();
      
      // Mock successful conversation and message creation
      mockSupabaseClient.from('conversations').insert.mockResolvedValue({
        data: { id: 'new-conv-id' },
        error: null,
      });
      mockSupabaseClient.from('conversations').select.mockReturnValue({
        single: jest.fn().mockResolvedValue({
          data: { id: 'new-conv-id' },
          error: null,
        }),
      });
      mockSupabaseClient.from('messages').insert.mockResolvedValue({
        data: null,
        error: null,
      });

      // Fill out form
      await user.type(screen.getByPlaceholderText('John Doe'), 'Guest User');
      await user.type(screen.getByPlaceholderText('john@example.com'), 'guest@example.com');
      await user.type(screen.getByPlaceholderText("What's your inquiry about?"), 'Project Inquiry');
      await user.type(screen.getByPlaceholderText(/Tell the company about your project/i), 
        'I need help with my engineering project. Can we discuss details?');

      // Submit form
      const sendButton = screen.getByText('Send Message');
      await user.click(sendButton);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Message sent successfully!');
      });
    });
  });

  describe('Authenticated User Form', () => {
    beforeEach(async () => {
      setupAuthenticatedUser('auth-user-id', 'client');
      setupProfileData({
        id: 'auth-user-id',
        full_name: 'Jane Client',
        email: 'jane@example.com',
      });

      render(<ContactCompanyForm {...defaultProps} />);
      
      const triggerButton = screen.getByText('Contact Company');
      fireEvent.click(triggerButton);

      await waitFor(() => {
        expect(screen.getByText(/Contact Test Engineering Co./i)).toBeInTheDocument();
      });
    });

    it('should pre-fill name and email for authenticated users', async () => {
      await waitFor(() => {
        const nameInput = screen.queryByPlaceholderText('John Doe');
        const emailInput = screen.queryByPlaceholderText('john@example.com');
        
        // For authenticated users, name/email fields should not be shown
        // since they are pre-filled from profile
        expect(nameInput).not.toBeInTheDocument();
        expect(emailInput).not.toBeInTheDocument();
      });
    });

    it('should only require subject and message for authenticated users', () => {
      expect(screen.getByPlaceholderText("What's your inquiry about?")).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Tell the company about your project/i)).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('should show loading state while submitting', async () => {
      setupUnauthenticatedUser();
      render(<ContactCompanyForm {...defaultProps} />);
      
      const triggerButton = screen.getByText('Contact Company');
      fireEvent.click(triggerButton);

      await waitFor(() => {
        expect(screen.getByText(/Contact Test Engineering Co./i)).toBeInTheDocument();
      });

      const user = userEvent.setup();
      
      // Mock delayed response
      mockSupabaseClient.from('conversations').insert.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ data: { id: 'conv-id' }, error: null }), 100))
      );

      // Fill and submit form
      await user.type(screen.getByPlaceholderText('John Doe'), 'Test User');
      await user.type(screen.getByPlaceholderText('john@example.com'), 'test@example.com');
      await user.type(screen.getByPlaceholderText("What's your inquiry about?"), 'Test Subject');
      await user.type(screen.getByPlaceholderText(/Tell the company about your project/i), 
        'This is a test message with enough characters');

      const sendButton = screen.getByText('Send Message');
      await user.click(sendButton);

      expect(screen.getByText('Sending...')).toBeInTheDocument();
    });

    it('should show success message after successful submission', async () => {
      setupUnauthenticatedUser();
      
      mockSupabaseClient.from('conversations').insert.mockResolvedValue({
        data: { id: 'new-conv-id' },
        error: null,
      });
      mockSupabaseClient.from('conversations').select.mockReturnValue({
        single: jest.fn().mockResolvedValue({
          data: { id: 'new-conv-id' },
          error: null,
        }),
      });
      mockSupabaseClient.from('messages').insert.mockResolvedValue({
        data: null,
        error: null,
      });

      render(<ContactCompanyForm {...defaultProps} />);
      
      const triggerButton = screen.getByText('Contact Company');
      fireEvent.click(triggerButton);

      await waitFor(() => {
        expect(screen.getByText(/Contact Test Engineering Co./i)).toBeInTheDocument();
      });

      const user = userEvent.setup();
      
      await user.type(screen.getByPlaceholderText('John Doe'), 'Test User');
      await user.type(screen.getByPlaceholderText('john@example.com'), 'test@example.com');
      await user.type(screen.getByPlaceholderText("What's your inquiry about?"), 'Test Subject');
      await user.type(screen.getByPlaceholderText(/Tell the company about your project/i), 
        'This is a test message with at least twenty characters');

      const sendButton = screen.getByText('Send Message');
      await user.click(sendButton);

      await waitFor(() => {
        expect(screen.getByText('Message Sent!')).toBeInTheDocument();
      });
    });

    it('should show error message on submission failure', async () => {
      setupUnauthenticatedUser();
      
      mockSupabaseClient.from('conversations').insert.mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
      });

      render(<ContactCompanyForm {...defaultProps} />);
      
      const triggerButton = screen.getByText('Contact Company');
      fireEvent.click(triggerButton);

      await waitFor(() => {
        expect(screen.getByText(/Contact Test Engineering Co./i)).toBeInTheDocument();
      });

      const user = userEvent.setup();
      
      await user.type(screen.getByPlaceholderText('John Doe'), 'Test User');
      await user.type(screen.getByPlaceholderText('john@example.com'), 'test@example.com');
      await user.type(screen.getByPlaceholderText("What's your inquiry about?"), 'Test Subject');
      await user.type(screen.getByPlaceholderText(/Tell the company about your project/i), 
        'This is a test message with enough characters');

      const sendButton = screen.getByText('Send Message');
      await user.click(sendButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });
    });
  });

  describe('Modal Controls', () => {
    it('should close modal when cancel button is clicked', async () => {
      setupUnauthenticatedUser();
      render(<ContactCompanyForm {...defaultProps} />);
      
      const triggerButton = screen.getByText('Contact Company');
      fireEvent.click(triggerButton);

      await waitFor(() => {
        expect(screen.getByText(/Contact Test Engineering Co./i)).toBeInTheDocument();
      });

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByText(/Contact Test Engineering Co./i)).not.toBeInTheDocument();
      });
    });

    it('should close modal when X button is clicked', async () => {
      setupUnauthenticatedUser();
      render(<ContactCompanyForm {...defaultProps} />);
      
      const triggerButton = screen.getByText('Contact Company');
      fireEvent.click(triggerButton);

      await waitFor(() => {
        expect(screen.getByText(/Contact Test Engineering Co./i)).toBeInTheDocument();
      });

      const closeButtons = screen.getAllByRole('button');
      const xButton = closeButtons.find(btn => btn.querySelector('svg')); // Find the X icon button
      if (xButton) {
        fireEvent.click(xButton);
      }

      await waitFor(() => {
        expect(screen.queryByText(/Contact Test Engineering Co./i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Custom Props', () => {
    it('should call onSuccess callback after successful submission', async () => {
      const onSuccess = jest.fn();
      setupUnauthenticatedUser();
      
      mockSupabaseClient.from('conversations').insert.mockResolvedValue({
        data: { id: 'new-conv-id' },
        error: null,
      });
      mockSupabaseClient.from('conversations').select.mockReturnValue({
        single: jest.fn().mockResolvedValue({
          data: { id: 'new-conv-id' },
          error: null,
        }),
      });
      mockSupabaseClient.from('messages').insert.mockResolvedValue({
        data: null,
        error: null,
      });

      render(<ContactCompanyForm {...defaultProps} onSuccess={onSuccess} />);
      
      const triggerButton = screen.getByText('Contact Company');
      fireEvent.click(triggerButton);

      await waitFor(() => {
        expect(screen.getByText(/Contact Test Engineering Co./i)).toBeInTheDocument();
      });

      const user = userEvent.setup();
      
      await user.type(screen.getByPlaceholderText('John Doe'), 'Test User');
      await user.type(screen.getByPlaceholderText('john@example.com'), 'test@example.com');
      await user.type(screen.getByPlaceholderText("What's your inquiry about?"), 'Test Subject');
      await user.type(screen.getByPlaceholderText(/Tell the company about your project/i), 
        'This is a test message with enough characters');

      const sendButton = screen.getByText('Send Message');
      await user.click(sendButton);

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
    });

    it('should apply custom trigger class name', () => {
      render(
        <ContactCompanyForm 
          {...defaultProps} 
          triggerClassName="custom-class bg-red-500" 
        />
      );
      
      const button = screen.getByText('Contact Company');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('bg-red-500');
    });
  });
});

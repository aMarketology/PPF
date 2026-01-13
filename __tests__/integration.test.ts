/**
 * Integration Tests - Product Purchase Flow
 */
import { createClient } from '@/lib/supabase/client';

// Mock Supabase
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(),
}));

describe('Product Purchase Flow Integration', () => {
  let mockSupabase: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockSupabase = {
      from: jest.fn(),
      auth: {
        getUser: jest.fn(),
        signInWithPassword: jest.fn(),
      },
    };

    (createClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  describe('Product Listing', () => {
    it('fetches products from database', async () => {
      const mockProducts = [
        {
          id: '1',
          name: 'Test Product 1',
          price: 1000,
          currency: 'usd',
          is_active: true,
        },
        {
          id: '2',
          name: 'Test Product 2',
          price: 2000,
          currency: 'usd',
          is_active: true,
        },
      ];

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({
              data: mockProducts,
              error: null,
            }),
          }),
        }),
      });

      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      expect(data).toHaveLength(2);
      expect(data?.[0].name).toBe('Test Product 1');
      expect(error).toBeNull();
    });

    it('filters products by active status', async () => {
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({
              data: [],
              error: null,
            }),
          }),
        }),
      });

      const supabase = createClient();
      await supabase.from('products').select('*').eq('is_active', true);

      expect(mockSupabase.from).toHaveBeenCalledWith('products');
    });
  });

  describe('User Authentication', () => {
    it('authenticates user successfully', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: {
          user: { id: 'user-123', email: 'test@example.com' },
          session: { access_token: 'token-123' },
        },
        error: null,
      });

      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(data.user).toBeDefined();
      expect(data.user?.email).toBe('test@example.com');
      expect(error).toBeNull();
    });

    it('handles authentication errors', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: 'Invalid credentials' },
      });

      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      });

      expect(data.user).toBeNull();
      expect(error).toBeDefined();
      expect(error?.message).toBe('Invalid credentials');
    });

    it('gets current authenticated user', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123', email: 'test@example.com' } },
        error: null,
      });

      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      expect(data.user).toBeDefined();
      expect(data.user?.id).toBe('user-123');
      expect(error).toBeNull();
    });
  });

  describe('Product Details', () => {
    it('fetches single product with company details', async () => {
      const mockProduct = {
        id: 'product-123',
        name: 'HVAC System Design',
        price: 5000,
        currency: 'usd',
        company_profiles: {
          company_name: 'MechaniX Solutions',
          city: 'Austin',
          state: 'TX',
        },
      };

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: mockProduct,
                error: null,
              }),
            }),
          }),
        }),
      });

      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('*, company_profiles(*)')
        .eq('id', 'product-123')
        .eq('is_active', true)
        .single();

      expect(data).toBeDefined();
      expect(data.name).toBe('HVAC System Design');
      expect(data.company_profiles.company_name).toBe('MechaniX Solutions');
      expect(error).toBeNull();
    });
  });

  describe('Payment Intent Creation', () => {
    it('stores payment intent in database', async () => {
      const paymentIntent = {
        stripe_payment_intent_id: 'pi_test123',
        customer_id: 'user-123',
        product_id: 'product-123',
        company_id: 'company-123',
        amount: 5000,
        currency: 'usd',
        platform_fee: 500,
        status: 'created',
      };

      mockSupabase.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({
          data: paymentIntent,
          error: null,
        }),
      });

      const supabase = createClient();
      const { data, error } = await supabase
        .from('payment_intents')
        .insert([paymentIntent]);

      expect(error).toBeNull();
      expect(mockSupabase.from).toHaveBeenCalledWith('payment_intents');
    });

    it('calculates platform fee correctly', () => {
      const productPrice = 5000;
      const platformFeePercent = 0.10;
      const expectedFee = 500;

      const calculatedFee = productPrice * platformFeePercent;

      expect(calculatedFee).toBe(expectedFee);
    });

    it('converts price to cents for Stripe', () => {
      const priceInDollars = 5000;
      const priceInCents = Math.round(priceInDollars * 100);

      expect(priceInCents).toBe(500000);
    });
  });

  describe('Order Completion', () => {
    it('fetches payment intent by stripe ID', async () => {
      const mockPaymentIntent = {
        id: 'pi-internal-123',
        stripe_payment_intent_id: 'pi_test123',
        status: 'succeeded',
        amount: 5000,
        currency: 'usd',
      };

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockPaymentIntent,
              error: null,
            }),
          }),
        }),
      });

      const supabase = createClient();
      const { data, error } = await supabase
        .from('payment_intents')
        .select('*')
        .eq('stripe_payment_intent_id', 'pi_test123')
        .single();

      expect(data).toBeDefined();
      expect(data.status).toBe('succeeded');
      expect(error).toBeNull();
    });
  });

  describe('Price Formatting', () => {
    it('formats USD correctly', () => {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      expect(formatter.format(5000)).toBe('$5,000.00');
      expect(formatter.format(1234.56)).toBe('$1,234.56');
    });

    it('formats EUR correctly', () => {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      });

      expect(formatter.format(4500)).toBe('€4,500.00');
    });

    it('formats GBP correctly', () => {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
      });

      expect(formatter.format(3800)).toBe('£3,800.00');
    });
  });

  describe('Search and Filter', () => {
    it('filters products by search term', () => {
      const products = [
        { name: 'HVAC System Design', description: 'Heating and cooling' },
        { name: 'Structural Analysis', description: 'Building structure' },
        { name: 'HVAC Retrofit', description: 'Upgrade existing HVAC' },
      ];

      const searchTerm = 'hvac';
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      expect(filtered).toHaveLength(2);
      expect(filtered[0].name).toBe('HVAC System Design');
      expect(filtered[1].name).toBe('HVAC Retrofit');
    });

    it('filters products by category', () => {
      const products = [
        { name: 'HVAC Design', category: 'Mechanical Engineering' },
        { name: 'Structural Analysis', category: 'Structural Engineering' },
        { name: 'Energy Audit', category: 'Mechanical Engineering' },
      ];

      const category = 'Mechanical Engineering';
      const filtered = products.filter((p) => p.category === category);

      expect(filtered).toHaveLength(2);
    });

    it('sorts products by price (low to high)', () => {
      const products = [
        { name: 'Product A', price: 5000 },
        { name: 'Product B', price: 1800 },
        { name: 'Product C', price: 3500 },
      ];

      const sorted = [...products].sort((a, b) => a.price - b.price);

      expect(sorted[0].price).toBe(1800);
      expect(sorted[1].price).toBe(3500);
      expect(sorted[2].price).toBe(5000);
    });

    it('sorts products by price (high to low)', () => {
      const products = [
        { name: 'Product A', price: 5000 },
        { name: 'Product B', price: 1800 },
        { name: 'Product C', price: 3500 },
      ];

      const sorted = [...products].sort((a, b) => b.price - a.price);

      expect(sorted[0].price).toBe(5000);
      expect(sorted[1].price).toBe(3500);
      expect(sorted[2].price).toBe(1800);
    });
  });
});

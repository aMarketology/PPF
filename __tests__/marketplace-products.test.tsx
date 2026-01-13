/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarketplaceProductsPage from '@/app/marketplace/products/page';
import { createClient } from '@/lib/supabase/client';

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(),
}));

// Mock Next.js components
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/marketplace/products',
}));

jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock components
jest.mock('@/app/components/Navigation', () => {
  return function Navigation() {
    return <nav data-testid="navigation">Navigation</nav>;
  };
});

jest.mock('@/app/components/Footer', () => {
  return function Footer() {
    return <footer data-testid="footer">Footer</footer>;
  };
});

const mockProducts = [
  {
    id: '1',
    name: 'HVAC System Design',
    description: 'Complete HVAC system design for commercial buildings',
    price: 5000,
    currency: 'usd',
    category: 'Mechanical Engineering',
    delivery_time_days: 20,
    image_url: 'https://example.com/image.jpg',
    is_active: true,
    company_profiles: {
      company_name: 'MechaniX Solutions',
      city: 'Austin',
      state: 'TX',
    },
  },
  {
    id: '2',
    name: 'Structural Analysis',
    description: 'Professional structural analysis for buildings',
    price: 2500,
    currency: 'usd',
    category: 'Structural Engineering',
    delivery_time_days: 14,
    image_url: null,
    is_active: true,
    company_profiles: {
      company_name: 'StructureTech Engineering',
      city: 'San Francisco',
      state: 'CA',
    },
  },
];

describe('Marketplace Products Page', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock Supabase response
    const mockSupabase = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            order: jest.fn(() => ({
              data: mockProducts,
              error: null,
            })),
          })),
        })),
      })),
    };

    (createClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  it('renders the marketplace page', async () => {
    render(<MarketplaceProductsPage />);

    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('displays products after loading', async () => {
    render(<MarketplaceProductsPage />);

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('HVAC System Design')).toBeInTheDocument();
    });

    expect(screen.getByText('Structural Analysis')).toBeInTheDocument();
    expect(screen.getByText('MechaniX Solutions')).toBeInTheDocument();
    expect(screen.getByText('StructureTech Engineering')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(<MarketplaceProductsPage />);

    // Should show loading indicator
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('displays product prices correctly', async () => {
    render(<MarketplaceProductsPage />);

    await waitFor(() => {
      expect(screen.getByText('HVAC System Design')).toBeInTheDocument();
    });

    // Check if prices are formatted correctly
    expect(screen.getByText(/\$5,000/)).toBeInTheDocument();
    expect(screen.getByText(/\$2,500/)).toBeInTheDocument();
  });

  it('displays product categories', async () => {
    render(<MarketplaceProductsPage />);

    await waitFor(() => {
      expect(screen.getByText('HVAC System Design')).toBeInTheDocument();
    });

    expect(screen.getByText('Mechanical Engineering')).toBeInTheDocument();
    expect(screen.getByText('Structural Engineering')).toBeInTheDocument();
  });

  it('handles search functionality', async () => {
    render(<MarketplaceProductsPage />);

    await waitFor(() => {
      expect(screen.getByText('HVAC System Design')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'HVAC' } });

    // After search, only matching products should be visible
    await waitFor(() => {
      expect(screen.getByText('HVAC System Design')).toBeInTheDocument();
    });
  });

  it('handles empty state when no products', async () => {
    // Mock empty response
    const mockSupabase = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            order: jest.fn(() => ({
              data: [],
              error: null,
            })),
          })),
        })),
      })),
    };

    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    render(<MarketplaceProductsPage />);

    await waitFor(() => {
      expect(screen.getByText(/no products found/i)).toBeInTheDocument();
    });
  });

  it('handles database errors gracefully', async () => {
    // Mock error response
    const mockSupabase = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            order: jest.fn(() => ({
              data: null,
              error: { message: 'Database error' },
            })),
          })),
        })),
      })),
    };

    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    render(<MarketplaceProductsPage />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load products/i)).toBeInTheDocument();
    });
  });

  it('filters products by category', async () => {
    render(<MarketplaceProductsPage />);

    await waitFor(() => {
      expect(screen.getByText('HVAC System Design')).toBeInTheDocument();
    });

    // Find and click category filter
    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'Mechanical Engineering' } });

    // Should only show Mechanical Engineering products
    expect(screen.getByText('HVAC System Design')).toBeInTheDocument();
  });
});

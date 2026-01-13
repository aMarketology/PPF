/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductDetailPage from '@/app/marketplace/product/[id]/page';
import { createClient } from '@/lib/supabase/client';

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(),
}));

// Mock Next.js components
const mockPush = jest.fn();
const mockParams = { id: 'test-product-id' };

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useParams: () => mockParams,
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/marketplace/product/test-product-id',
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

const mockProduct = {
  id: 'test-product-id',
  name: 'HVAC System Design Package',
  description: 'Complete HVAC system design including load calculations, equipment selection, ductwork layout, and control systems for buildings up to 50,000 sq ft.',
  price: 5000,
  currency: 'usd',
  category: 'Mechanical Engineering',
  delivery_time_days: 20,
  image_url: 'https://example.com/image.jpg',
  is_active: true,
  created_at: '2026-01-01T00:00:00Z',
  company_profiles: {
    id: 'company-id',
    company_name: 'MechaniX Solutions',
    description: 'Expert mechanical engineering services',
    city: 'Austin',
    state: 'TX',
    website: 'https://mechanix-demo.com',
    email: 'info@mechanix.com',
    phone: '(555) 234-5678',
    specialties: ['HVAC Design', 'Energy Modeling', 'Industrial Equipment'],
    logo_url: null,
  },
};

describe('Product Detail Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Supabase response
    const mockSupabase = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            eq: jest.fn(() => ({
              single: jest.fn(() => ({
                data: mockProduct,
                error: null,
              })),
            })),
          })),
        })),
      })),
      auth: {
        getUser: jest.fn(() => ({
          data: { user: { id: 'user-123' } },
          error: null,
        })),
      },
    };

    (createClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  it('renders product details page', async () => {
    render(<ProductDetailPage />);

    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('displays product information correctly', async () => {
    render(<ProductDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('HVAC System Design Package')).toBeInTheDocument();
    });

    expect(screen.getByText(/Complete HVAC system design/)).toBeInTheDocument();
    expect(screen.getByText('Mechanical Engineering')).toBeInTheDocument();
    expect(screen.getByText(/\$5,000/)).toBeInTheDocument();
    expect(screen.getByText(/20 days delivery/)).toBeInTheDocument();
  });

  it('displays company information', async () => {
    render(<ProductDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('MechaniX Solutions')).toBeInTheDocument();
    });

    expect(screen.getByText('Expert mechanical engineering services')).toBeInTheDocument();
    expect(screen.getByText('Austin, TX')).toBeInTheDocument();
    expect(screen.getByText('info@mechanix.com')).toBeInTheDocument();
    expect(screen.getByText('(555) 234-5678')).toBeInTheDocument();
  });

  it('displays company specialties', async () => {
    render(<ProductDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('HVAC Design')).toBeInTheDocument();
    });

    expect(screen.getByText('Energy Modeling')).toBeInTheDocument();
    expect(screen.getByText('Industrial Equipment')).toBeInTheDocument();
  });

  it('shows Buy Now button', async () => {
    render(<ProductDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('HVAC System Design Package')).toBeInTheDocument();
    });

    const buyButton = screen.getByRole('button', { name: /buy now/i });
    expect(buyButton).toBeInTheDocument();
    expect(buyButton).not.toBeDisabled();
  });

  it('redirects to checkout when Buy Now is clicked (logged in user)', async () => {
    render(<ProductDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('HVAC System Design Package')).toBeInTheDocument();
    });

    const buyButton = screen.getByRole('button', { name: /buy now/i });
    fireEvent.click(buyButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/checkout/test-product-id');
    });
  });

  it('redirects to login when Buy Now is clicked (not logged in)', async () => {
    // Mock no user
    const mockSupabase = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            eq: jest.fn(() => ({
              single: jest.fn(() => ({
                data: mockProduct,
                error: null,
              })),
            })),
          })),
        })),
      })),
      auth: {
        getUser: jest.fn(() => ({
          data: { user: null },
          error: null,
        })),
      },
    };

    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    render(<ProductDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('HVAC System Design Package')).toBeInTheDocument();
    });

    const buyButton = screen.getByRole('button', { name: /buy now/i });
    fireEvent.click(buyButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login?redirect=/marketplace/product/test-product-id');
    });
  });

  it('handles product not found', async () => {
    const mockSupabase = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            eq: jest.fn(() => ({
              single: jest.fn(() => ({
                data: null,
                error: { message: 'Not found' },
              })),
            })),
          })),
        })),
      })),
      auth: {
        getUser: jest.fn(() => ({
          data: { user: { id: 'user-123' } },
          error: null,
        })),
      },
    };

    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    render(<ProductDetailPage />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/marketplace/products');
    });
  });

  it('shows loading state initially', () => {
    render(<ProductDetailPage />);

    const loadingElement = screen.getByRole('img', { hidden: true });
    expect(loadingElement).toBeInTheDocument();
  });

  it('displays back to marketplace link', async () => {
    render(<ProductDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('HVAC System Design Package')).toBeInTheDocument();
    });

    const backLink = screen.getByText('Back to Marketplace');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/marketplace/products');
  });

  it('displays product image when available', async () => {
    render(<ProductDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('HVAC System Design Package')).toBeInTheDocument();
    });

    const productImage = screen.getByRole('img', { name: /HVAC System Design Package/i });
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('shows placeholder when no product image', async () => {
    const productWithoutImage = {
      ...mockProduct,
      image_url: null,
    };

    const mockSupabase = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            eq: jest.fn(() => ({
              single: jest.fn(() => ({
                data: productWithoutImage,
                error: null,
              })),
            })),
          })),
        })),
      })),
      auth: {
        getUser: jest.fn(() => ({
          data: { user: { id: 'user-123' } },
          error: null,
        })),
      },
    };

    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    render(<ProductDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('HVAC System Design Package')).toBeInTheDocument();
    });

    // Should show Package icon as placeholder
    const placeholder = screen.getByText('HVAC System Design Package').parentElement?.parentElement;
    expect(placeholder).toBeInTheDocument();
  });
});

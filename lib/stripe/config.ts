/**
 * Stripe Configuration
 * Handles Stripe SDK initialization and configuration
 */

import Stripe from 'stripe';

// Lazy-load Stripe instance to avoid build-time errors
let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
    }
    
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    });
  }
  
  return stripeInstance;
}

// Export getter function
export const stripe = new Proxy({} as Stripe, {
  get: (target, prop) => {
    const stripeClient = getStripe();
    return stripeClient[prop as keyof Stripe];
  }
});

// Stripe publishable key for client-side
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

// Platform fee percentage (10% = 0.10)
export const PLATFORM_FEE_PERCENTAGE = 0.10;

// Minimum order amount in cents ($1.00 = 100)
export const MINIMUM_ORDER_AMOUNT = 100;

/**
 * Calculate platform fee from order amount
 * @param amount - Order amount in cents
 * @returns Platform fee in cents
 */
export function calculatePlatformFee(amount: number): number {
  return Math.round(amount * PLATFORM_FEE_PERCENTAGE);
}

/**
 * Calculate company payout after platform fee
 * @param amount - Order amount in cents
 * @returns Amount company receives in cents
 */
export function calculateCompanyPayout(amount: number): number {
  const platformFee = calculatePlatformFee(amount);
  return amount - platformFee;
}

/**
 * Format amount from cents to dollars
 * @param cents - Amount in cents
 * @returns Formatted dollar amount (e.g., "$10.50")
 */
export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

/**
 * Convert dollars to cents
 * @param dollars - Amount in dollars
 * @returns Amount in cents
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/**
 * Convert cents to dollars
 * @param cents - Amount in cents
 * @returns Amount in dollars
 */
export function centsToDollars(cents: number): number {
  return cents / 100;
}

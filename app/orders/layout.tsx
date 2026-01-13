// Force all routes under /orders to be dynamic
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

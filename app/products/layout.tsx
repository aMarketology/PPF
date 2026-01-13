// Force all routes under /products to be dynamic
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

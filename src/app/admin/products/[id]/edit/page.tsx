import { notFound } from "next/navigation";
import { products } from "@/lib/mock-data";
import { ProductFormView } from "@/components/admin-views";
import { mockState, type Search } from "@/lib/mock-data";
export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Search;
  params: Promise<{ id: string }>;
}) {
  const [query, { id }] = await Promise.all([searchParams, params]);
  if (!products.some((p) => p.id === id)) notFound();
  return (
    <ProductFormView state={mockState(query.state)} editing productId={id} />
  );
}

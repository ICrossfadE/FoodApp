import { CustomerOrderView } from "@/components/store-views";
import { mockState, type Search } from "@/lib/mock-data";
export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Search;
  params: Promise<{ id: string }>;
}) {
  const [query, { id }] = await Promise.all([searchParams, params]);
  return <CustomerOrderView state={mockState(query.state)} id={id} />;
}

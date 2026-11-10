import { AdminOrderView } from "@/components/admin-views";
import { mockState, type Search } from "@/lib/mock-data";
export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Search;
  params: Promise<{ id: string }>;
}) {
  const [query, { id }] = await Promise.all([searchParams, params]);
  return <AdminOrderView state={mockState(query.state)} id={id} />;
}

import { AccountView } from "@/components/store-views";
import { mockState, type Search } from "@/lib/mock-data";
export default async function Page({ searchParams }: { searchParams: Search }) {
  const query = await searchParams;
  return <AccountView state={mockState(query.state)} />;
}

import { MenuView } from "@/components/store-views";
import { mockState, type Search } from "@/lib/mock-data";
export default async function Page({ searchParams }: { searchParams: Search }) {
  const query = await searchParams;
  return <MenuView state={mockState(query.state)} category={query.category} />;
}

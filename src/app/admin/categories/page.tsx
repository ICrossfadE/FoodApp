import { CategoriesView } from "@/components/admin-views";
import { mockState, type Search } from "@/lib/mock-data";
export default async function Page({ searchParams }: { searchParams: Search }) {
  const query = await searchParams;
  return <CategoriesView state={mockState(query.state)} />;
}

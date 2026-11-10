import { SettingsView } from "@/components/admin-views";
import { mockState, type Search } from "@/lib/mock-data";
export default async function Page({ searchParams }: { searchParams: Search }) {
  const query = await searchParams;
  return <SettingsView state={mockState(query.state)} />;
}

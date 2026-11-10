import { BannerFormView } from "@/components/admin-views";
import { mockState, type Search } from "@/lib/mock-data";
export default async function Page({ searchParams }: { searchParams: Search }) {
  const query = await searchParams;
  return <BannerFormView state={mockState(query.state)} editing={false} />;
}

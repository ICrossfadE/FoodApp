import { notFound } from "next/navigation";
import { BannerFormView } from "@/components/admin-views";
import { mockState, type Search } from "@/lib/mock-data";
export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Search;
  params: Promise<{ id: string }>;
}) {
  const [query, { id }] = await Promise.all([searchParams, params]);
  if (!["01", "02"].includes(id)) notFound();
  return (
    <BannerFormView state={mockState(query.state)} editing bannerId={id} />
  );
}

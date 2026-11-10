import { notFound } from "next/navigation";
import { CategoryFormView } from "@/components/admin-views";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!["01", "02", "03", "04"].includes(id)) notFound();
  return <CategoryFormView editing categoryId={id} />;
}

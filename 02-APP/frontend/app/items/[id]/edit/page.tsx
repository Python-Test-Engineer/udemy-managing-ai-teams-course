import { notFound } from "next/navigation";
import ItemForm from "@/components/ItemForm";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function EditItemPage({ params }: { params: { id: string } }) {
  let item;
  try {
    item = await api.getItem(Number(params.id));
  } catch {
    notFound();
  }
  if (!item) notFound();

  return (
    <>
      <div className="page-header">
        <h1>Edit item</h1>
        <p>Updating: {item.title}</p>
      </div>
      <ItemForm item={item} />
    </>
  );
}

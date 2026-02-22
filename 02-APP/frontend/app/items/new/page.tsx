import ItemForm from "@/components/ItemForm";

export default function NewItemPage() {
  return (
    <>
      <div className="page-header">
        <h1>New item</h1>
        <p>Add a new record to the database.</p>
      </div>
      <ItemForm />
    </>
  );
}

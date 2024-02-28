import { ProductForm } from "@/components/productForm"


export default function EditPage({ params }) {
  return (
    <ProductForm id={params} />
    )
}
import connectMongoDb from "@/libs/mongodb";
import Products from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDb();
  const products = await Products.find();
  return NextResponse.json({ products }, { status: 200 })

}


export async function POST(request) {
  const { name, image, price, category } = await request.json();
  await connectMongoDb();
  await Products.create({ name, image, price, category });
  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id")
  await connectMongoDb();
  const deleteProduct = await Products.deleteOne({ _id: id });
  return NextResponse.json({ message: `${deleteProduct} has been deleted` }, { status: 200 })
}
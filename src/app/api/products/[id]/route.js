import connectMongoDb from "@/libs/mongodb";
import Products from "@/models/ProductModel";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  // console.log(params.id);
  await connectMongoDb();
  const product = await Products.findById({ _id: params.id })
  return NextResponse.json({ product }, { status: 200 })
}

export async function PUT(request, { params }) {
  const { name, image, price, category } = await request.json();
  // console.log(params);
  await connectMongoDb();
  const updateProduct = await Products.updateOne({ _id: params.id }, { name, image, price, category })
  return NextResponse.json({ message: "updated succesfully" }, { status: 200 })
}


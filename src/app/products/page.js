"use client"

import { ProductList } from "@/components/productList"
import { BASE_URL } from "@/libs/urls";
import React, { useEffect, useState } from "react";

export default function page() {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      // return res.json();
      const dataProducts = await res.json()
      setProducts(dataProducts.products)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      {!products ? (<div>...Loading</div>) : (
        <ProductList products={products} />
      )}
    </>
  )
}

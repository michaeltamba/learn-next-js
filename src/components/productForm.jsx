"use client";

import { BASE_URL } from "@/libs/urls";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const ProductForm = ({ id }) => {
  const router = useRouter()
  const [formInput, setFormInput] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
  });

  const editFormValue = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${id.id}`, {
        cache: "no-cache",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch product details");
      }
  
      const { product } = await res.json();
      console.log(product);
      setFormInput((prevFormInput) => ({ ...prevFormInput, ...product }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) {
      editFormValue();
    }
  }, [])


  const [submitError, setSubmitError] = useState(false)

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formInput.name || !formInput.image) {
      setSubmitError(true)
    }
    let res;
    let opt = {
      method: id ? 'PUT' : 'POST',
      headers: {
        "Content-tyoe": "application/json"
      },
      body: JSON.stringify(formInput)
    }
    try {
      // console.log(formInput);
      if (id) {
        res = await fetch(`${BASE_URL}/api/products/${id.id}`, opt)
      } else {
        res = await fetch(`${BASE_URL}/api/products`, opt);
      }
        if (res.ok) {
        router.push("/products")
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setSubmitError(false)
      }, '3000')
    }
  };


  return (
    <>
      <div className="flex flex-col gap-[5vh]">
        {id ?(<h1>Edit Product</h1>) :( <h1>Add New Product</h1>) }
        <form
          onSubmit={handleSubmit}
          className="flex flex-col self-center items-center rounded-xl gap-3 bg-slate-800 p-[3vh] w-[45vh]"
        >
          <input
            name="name"
            onChange={(e) => HandleChange(e)}
            defaultValue={formInput.name}
            placeholder="Product Name"
            type="text"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <input
            name="image"
            onChange={(e) => HandleChange(e)}
            placeholder="image url"
            defaultValue={formInput.image}
            type="text"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <input
            name="price"
            onChange={(e) => HandleChange(e)}
            defaultValue={formInput.price}
            placeholder="price"
            type="number"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <input
            name="category"
            onChange={(e) => HandleChange(e)}
            defaultValue={formInput.category}
            placeholder="Product Category"
            type="text"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <button className="btn btn-primary w-full max-w-xs">
            {id ? "Update" : "Create"}
          </button>
        </form>
      </div>
      {submitError ? (<>
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>name and image must required</span>
          </div>
        </>) : ''}
    </>
  );
}

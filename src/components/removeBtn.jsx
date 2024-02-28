"use client";

import { BASE_URL } from "@/libs/urls";
import { useRouter } from "next/navigation";
import React from "react";

export const RemoveBtn = ({ id }) => {
  const router = useRouter();
  const handleClick = async () => {
    const res = await fetch(`${BASE_URL}/api/products?id=${id}`, {
      method: "DELETE",
    });
    console.log(res);
    if (res.ok) {
      // router.refresh();
      location.reload() //native js
    }
  };

  return (
    <button onClick={handleClick} className="btn btn-error">
      Delete
    </button>
  );
};

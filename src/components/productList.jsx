import Link from "next/link";
import react from "react";
import { RemoveBtn } from "./removeBtn";
export const ProductList = ({products}) => {
  
  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-w">Product List</h1>
        </div>
        <div className="text-right">
          <Link className="btn btn-primary" href={"/addProduct"}>
            Add Product
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                  {products.map((el, index) => (
              <tr key={el._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={el.image} className="rounded-lg"/>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{el.name}</div>
                        </div>
                      </div>
                      </td>
                      <td>
                        ${el.price}
                      </td>
                      <td>{el.category }</td>
                      <th className="flex flex-row gap-[1vh]">
                        <Link href={`/editProduct/${el._id}`}>
                          <button className="btn btn-primary">Edit</button>
                        </Link>
                          <RemoveBtn id={el._id}/>
                      </th>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
    );
};

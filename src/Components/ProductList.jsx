import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  console.warn("run ");

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10); // You can make this dynamic as well

  // const [open, setOpen] = useState(false);

  useEffect(() => {
    getProducts(page);
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const token = JSON.parse(localStorage.getItem("token"));

  const getProducts = async (page) => {
    try {
      let result = await fetch(
        `http://localhost:3006/api/product/get-all-products?page=${page}&limit=${limit}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      result = await result.json();
      console.warn("result ", result);

      setProducts(result.products);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.warn("error: ", error.message);
    }
  };

  const deleteProduct = async (id) => {
    console.warn("id:", id);
    let result = await fetch(
      `http://localhost:3006/api/product/delete/${id}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    if (result) {
        getProducts();
        alert("Product deleted")
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:3006/search/${key}`);
      result = await result.json();
      // console.warn(result)
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <input
        onChange={searchHandle}
        className="searchBox"
        type="text"
        placeholder="Search Product"
      ></input>
      <ul>
        <li>
          <b>S. No</b>
        </li>
        <li>
          <b>Name</b>
        </li>
        <li>
          <b>Price</b>
        </li>
        <li>
          <b>Company</b>
        </li>
        <li>
          <b>Category</b>
        </li>
        <li>
          <b>Operation</b>
        </li>
      </ul>
      {products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.company}</li>
          <li>{item.category}</li>
          <li>
            {/* <button onClick={ ()=> deleteProduct(item._id)} className="delete-button">Delete</button> */}
            <Link
              to={"/update/" + item._id}
              style={{ color: "green", padding: "10px" }}
            >
              Update
            </Link>
            <Link
              to="#"
              onClick={() => deleteProduct(item._id)}
              style={{ color: "red", padding: "10px" }}
            >
              Delete
            </Link>
          </li>
        </ul>
      ))}
      {/* Pagination */}
      <div className="pagination">
        <button className="previous" onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>
        <button className="next" onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;

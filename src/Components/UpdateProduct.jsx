import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const UpdateProduct = () =>{
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    //ER
    useEffect(()=>{
        getProductDetails();
        // console.warn(params)
    },[])

    const token = JSON.parse(localStorage.getItem('token'))

    const getProductDetails = async ()=>{
        console.warn(params)
        let result = await fetch(`http://localhost:3006/api/product/one-product/${params.id}`,{
            method:'get',
            headers:{
                'Authorization': `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        });
        result = await result.json();
        console.warn(result)
        setName(result.product.name)
        setPrice(result.product.price)
        setCompany(result.product.company)
        setCategory(result.product.category)
    }

    const userId = JSON.parse(localStorage.getItem('user_id'))

    const updateProduct = async ()=>{
        // console.warn(name ,price, company, category)
        let result = await fetch(`http://localhost:3006/api/product/update/${params.id}`,{
            method:'put',
            body: JSON.stringify({name ,price, company, category, userId}),
            headers:{
                'Authorization': `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        })
        result = await result.json();
        // console.warn(result)
        if(result){
            alert("Product Updated")
            navigate('/');
        }
    }
    
    return (
        <div className="Update-page">
            <h1>Update Product</h1>
            <input type="text"  className="inputBox" placeholder="Enter Name"
            value={name} onChange={(e)=>setName(e.target.value)}></input>

            <input type="text" className="inputBox" placeholder="Enter Price"
            value={price} onChange={(e)=>setPrice(e.target.value)}></input>

            <input type="text" className="inputBox" placeholder="Enter Company"
           value={company} onChange={(e)=>setCompany(e.target.value)} ></input>

            <input type="text" className="inputBox" placeholder="Enter Category"
            value={category} onChange={(e)=>setCategory(e.target.value)}></input>

            <button onClick={updateProduct} className="appButton">Update</button>
        </div>
    )
}

export default UpdateProduct
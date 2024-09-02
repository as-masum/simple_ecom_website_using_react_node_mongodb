import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'


const AddProduct = ()=>{
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleAddButton = async ()=>{

        try {
            if( !name || !price || !company || !category ){
                setError(true);
                return false
            }
    
            const userId = JSON.parse(localStorage.getItem('user_id'))
            console.warn('userId :', userId);
            const token = JSON.parse(localStorage.getItem('token'))
    
            console.warn('data :',name, price,company,category,userId )
            let result = await fetch('http://localhost:3006/api/product/add-product',{
                method:'put',
                body:JSON.stringify({name, price, company, category, userId}),
                headers:{
                    'Authorization': `Bearer ${token}`,
                    "Content-Type":"application/json"
                }
            }) 
            console.warn("result",result)
            result = await result.json();
    
    
            if(result.newProduct._id){
                navigate('/')
                alert(`New Product ${result.newProduct.name} Added`)
            }
            
        } catch (error) {
            console.log('error:',error.message );
            alert(`New Product not Added`,error.message)
            
        }
        


    }


    return(
        <div className="addProduct">
            <h1>Add Product</h1>

            <input className="inputBox" id="name" 
    name="name"  type="text" placeholder="Product Name"
           value={name} onChange={(e)=>setName(e.target.value)}></input>
           { error && !name && <span className="invalid-input" >Enter valid name</span> }

            <input className="inputBox" type="text" placeholder="Product Price"
            value={price} onChange={(e)=>setPrice(e.target.value)}></input>
            { error && !price && <span className="invalid-input" >Enter valid price</span> }

            <input className="inputBox" type="text" placeholder="Product Company"
            value={company} onChange={(e)=>setCompany(e.target.value)}></input>
            { error && !company && <span className="invalid-input" >Enter valid company</span> }

            <input className="inputBox" type="text" placeholder="Product Category"
            value={category} onChange={(e)=>setCategory(e.target.value)}></input>
            { error && !category && <span className="invalid-input" >Enter valid category</span> }

            <button onClick={handleAddButton} className='appButton' type="button">Add Product</button>
        </div>
    )
}


export default AddProduct
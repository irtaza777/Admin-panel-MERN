import React, { useState, useEffect } from "react";
import { Params, useParams,useNavigate } from "react-router-dom";
const Updateproduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
const params= useParams();
    const navigate = useNavigate();

useEffect(()=>{

    getproductdetails();
},[])
    const getproductdetails = async () => {

        let result = await fetch(`http://localhost:4500/product/${params.id}`,{

            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);

    }
    const updateProduct = async () => {
        console.warn(name, price, category, company)
        let result = await fetch(`http://localhost:4500/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'Application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
             
        });
        result = await result.json();
        if (result) {
            navigate('/')
        }

    }
    return (
        <div class="signup">
            <br></br>
            <h3>Add product</h3>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input type="text" placeholder='Enter product price' className='inputBox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />

            <input type="text" placeholder='Enter product category' className='inputBox'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />

            <input type="text" placeholder='Enter product company' className='inputBox'
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />


            <button onClick={updateProduct} className='appButton'>Update Product</button>
        </div>
    )

}
export default Updateproduct;
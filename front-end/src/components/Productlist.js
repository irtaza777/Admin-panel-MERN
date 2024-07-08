import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Productlist = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getproducts();

    }, [])


    const getproducts = async () => {

        let result = await fetch("http://localhost:4500/products",{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }
    const Deleteproduct = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:4500/product/${id}`, {
            method: "Delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
            
        });
        result = await result.json();
        if (result) {
            getproducts();
        }
    }
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:4500/search/${key}`,{
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }

            });
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        } else {
            getproducts();
        }

    }
    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="" className='search-product-box' placeholder='Search Product' onChange={searchHandle}
></input>


            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>

                <li>Operations</li>

            </ul>
            {products.length>0 ?products.map((item, index) =>
                <ul>
                    <li>{index + 1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>

                    <li>{item.company}</li>
                    <li>
                        <button class="deleteb" onClick={() => Deleteproduct(item._id)}>Delete</button>
                        <Link to={"/update/" + item._id} ><span className="updateb">Update</span> </Link>
                    </li>
                </ul>

            ) : <h1>No Result found</h1> }
        </div>
    )
}
export default Productlist;
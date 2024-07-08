import { useNavigate } from "react-router-dom";
import React from "react";

const Addproduct = () => {

    

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {

        if (!name || !price || !company || !category) {
            setError(true);
            return false
        }

        console.warn(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let data = await fetch('http://localhost:4500/add-products', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'content-type': 'application/JSON',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        });

        data = await data.json();
if(data){
    navigate("/")
}   
    }
    return (
        <div class="signup">
            <br></br>
            <h3>Add product</h3>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" placeholder='Enter product price' className='inputBox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type="text" placeholder='Enter product category' className='inputBox'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input type="text" placeholder='Enter product company' className='inputBox'
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}


            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )

}
export default Addproduct;
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';


const Jsondata = () => {
    const [posts, setposts] = useState([]);

    useEffect(() => {
        getdata();

    }, [])

    const getdata = async () => {

        let result = await fetch("https://jsonplaceholder.typicode.com/posts", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setposts(result);
    }
    return(
        <div className="container">
            <br></br>
            <h3>User data</h3>
            <Table responsive striped bordered hover>            
                <thead>
                    <tr>
                        <th>User id</th>
                        <th>id</th>
                            <th>title</th>
                                <th>body</th>


                       </tr>
                </thead>


            <tbody>

            
              {
        posts.map((item, index) =>
            <tr> 
                <td>{item.userId} </td>
                <td>{item.id}</td>
                <td>{item.title}</td>

                <td>{item.body}</td>
                <td>  
                    <Link to={"/Singledata/" + item.userId} ><span className="updateb">open</span> </Link>
                </td>
                
            </tr>

        ) 
                    }</tbody>
            </Table>  </div >
    )
}
export default Jsondata;
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom";

const Singledata = () => {
    const [userId, setUserid] = useState("");
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const params = useParams();
    useEffect(() => {

        getdetails();
    })
    const getdetails = async () => {

        let result = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.userId}`, {

            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setUserid(result.userId);
        setId(result.id);
        setTitle(result.title);
        setBody(result.body);
    }

    return (
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



                    <tr>
                        <td>{userId} </td>
                        <td>{id}</td>
                        <td>{title}</td>

                        <td>{body}</td>

                    </tr>

                </tbody>
            </Table> 
            
             </div >
    )
}
export default Singledata;

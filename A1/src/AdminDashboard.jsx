import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'
import './assets/AdminDashboard.css';
import { toast } from 'react-toastify';
import { AdminAdd } from './AdminAdd';

function AdminDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userdata, setdata] = useState([]);
    const [addadmin, setAdminAdd] = useState(false);

    useEffect(() => {
        if (!location.state) {
            toast.error("you're not Authorized to access this page");
            navigate('/Login');
        }
        else {
            fetch("http://localhost:8000/SignupData")
                .then((response) => response.json())
                .then((data) => {
                    setdata(data);
                }

                ).
                catch((error) => {
                    toast.error("data not found");
                })
        }

    }, [location]);

    const handleUpdate = (id) => {
        if (confirm("Are you Sure!") == true) {
            navigate('/Edit/' + id);
        }

    }

    const handleDelete = (id) => {
        if (confirm("Are you sure to delete") == true) {
            fetch(`http://localhost:8000/SignupData/${id}`, {
                method: 'DELETE',
            }).then(res => res.json())
                .then(() => {
                    setdata(prevData => prevData.filter(item => item.id !== id));
                    toast.success("data deleted successfully");

                })
                .catch((error) => {
                    toast.error("failed to delete")
                });
        }
        else {
            return null;
        }
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Image</th>
                        <th>Action1</th>
                        <th>Action2</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userdata.map((e) => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.UserName}</td>
                                <td>{e.Mobile}</td>
                                <td>{e.Email}</td>
                                <td>{e.Password}</td>
                                <td><img src={e.image} alt="" /></td>
                                <td><button onClick={() => handleUpdate(e.id)}>Edit</button></td>
                                <td><button onClick={() => handleDelete(e.id)}>Delete</button></td>

                            </tr>
                        ))
                    }
                </tbody>


            </table>
            <button onClick={() => setAdminAdd(true)} id='Adduser'>Add User</button>
            {addadmin && <AdminAdd onClose={() => setAdminAdd(false)} />}        </>
    )
}

export default AdminDashboard
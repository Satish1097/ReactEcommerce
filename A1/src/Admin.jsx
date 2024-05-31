import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './assets/Admin.css';
import { Link } from 'react-router-dom';

function Admin() {
    const [AdminId, setAdminId] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!AdminId || !Password) {
            toast.error("Enter Credential")
        }
        else {
            try {
                const data = await fetch("http://localhost:8000/AdminData/");
                const data1 = await data.json();
                const data2 = data1.find((e) => e.AdminId === AdminId && e.AdminPassword === Password);

                const signupdata = await fetch("http://localhost:8000/SignupData");
                const datax = await signupdata.json();
                if (data2 && datax) {
                    navigate('/AdminDashboard', { state: datax })
                }
                else {
                    toast.error("Invalid Credential");
                }
            }
            catch (error) {
                toast.error("something went wrong");
            }

        }
    }
    return (
        <>
            <div className="admin-Login">
                <Link to='/ '>Home</Link>
                <form onSubmit={handleSubmit}>
                <h1>Admin Login</h1>
                    <input type="text" placeholder='Enter UseName' value={AdminId} onChange={(e) => setAdminId(e.target.value)} />
                    <input type="text" placeholder='Enter Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="Login" />
                </form>
            </div>
        </>
    )
}

export default Admin
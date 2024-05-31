import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './assets/AdminAdd.css';

export const AdminAdd = ({ onClose }) => {
    const [UserName, setUserName] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();
    const modelRef = useRef();

    const closeModel = (e) => {
        if (modelRef.current === e.target) {
            onClose();
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const data = { UserName, Mobile, Email, Password };
        try {
            const response = await fetch("http://localhost:8000/SignupData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            onClose();
            toast.success("Data saved successfully", "success");
            navigate("/AdminDashboard", { state: { data: data } });

        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    return (
        <div className="overlay" ref={modelRef} onClick={closeModel}>
            <div>
                <button className="close-btn-crt" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="popup">
                    <div className="popup__content">
                        <h2>Add a new Data</h2>
                        <form action="" onSubmit={handleAdd} className="create-form">
                                <input
                                    className="create-input1"
                                    type="text"
                                    placeholder="UserName"
                                    value={UserName}
                                    onChange={e => setUserName(e.target.value)}
                                />
                                <input
                                    className="create-input1"
                                    type="text"
                                    placeholder="Mobile Number"
                                    value={Mobile}
                                    onChange={e => setMobile(e.target.value)}
                                />
                                <input
                                    className="create-input1"
                                    type="text"
                                    placeholder="Email"
                                    value={Email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <input
                                    className="create-input1"
                                    type="text"
                                    placeholder="Password"
                                    value={Password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            <input className="create-btn" type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

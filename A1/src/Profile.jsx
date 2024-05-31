import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './assets/Profile.css';

function Profile({ onClose }) {
    const mynav = useNavigate();
    const [id, setid] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [image, setImage] = useState('');

    const modelRef = useRef();

    const closeModel = (e) => {
        if (modelRef.current === e.target) {
            onClose();
        }
    };


    useEffect(() => {
        const storedId = localStorage.getItem('id');
        const storedName = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('email');
        const storedMobile = localStorage.getItem('mobile');
        const storedImage = localStorage.getItem('image');




        if (!storedName || !storedEmail) {
            mynav("/Login");
        } else {
            setid(storedId);
            setName(storedName);
            setEmail(storedEmail);
            setMobile(storedMobile);
            setImage(storedImage);
        }
    }, [mynav]);

    const logout = () => {
        localStorage.clear();
        window.location.reload();
        mynav("/");
    };
    const handleEditdata = (id) => {
        if (confirm("Are you Sure!") == true) {
            mynav('/EditProfile/' + id);
            closeModel();
        }
    }

    return (
        <>
            <div className="overlay" ref={modelRef} onClick={closeModel}>
                <button className="close-btn-crt" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="popup">
                    <div className="popup__content">
                        <h2>Add a new Data</h2>
                        {name && email ? (
                            <div className="Profile">
                                <div className="image">
                                    <img src={image} alt="img" />
                                </div>
                                Name: {name}
                                <br />
                                Id: {id}
                                <br />
                                Email: {email}
                                <br />
                                Mobile No: {mobile}
                                <br />
                                <button className="create_btn" onClick={logout}>Logout</button>
                                <button className="create_btn" ref={modelRef} onClick={() => handleEditdata(id)}>Edit</button>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}; export default Profile;


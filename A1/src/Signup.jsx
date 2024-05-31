import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./assets/Signup.css";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [UserName, setusername] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [CPassword, setCPassword] = useState('');
    const [image, setImage] = useState('');
    const navigate=useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const mobilePattern = /^[0-9]{10}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        try {
            if (!UserName || !Mobile || !Email || !Password || !CPassword) {
                toast.error("Kindly Fill all the field");
            }
            else if (!mobilePattern.test(Mobile)) {
                toast.error('Enter Valid Mobile No.')
            }
            else if (!emailPattern.test(Email)) {
                toast.error("Enter Valid email");
            }
            else if (emailPattern.test(Email)) {
                const data = await fetch("http://localhost:8000/SignupData");
                const data1 = await data.json();
                const userdata = data1.find(e => e.Email === Email);
                if (userdata) {
                    toast.error("Email Already Exist");
                }
                else if (Password.length < 8) {
                    toast.error("password must be 8 digit long");
                }
                else if (Password !== CPassword) {
                    toast.error("password & confirm password doesn't match");
                }
                else {
                    const SignupData = {UserName, Mobile, Email, Password};
                    fetch("  http://localhost:8000/SignupData", {
                        method: 'POST',
                        headers: {
                            'content-type': "application/json",
                        },
                        body: JSON.stringify(SignupData)
                    }).then(response => response.json)
                        .then(data => {
                            toast.success("Register Successfully");
                            navigate('/')
                        }
                        )
    
                }
            }

        }
        catch (error) {
            toast.error("something went wrong");
        }
    }


    return (
        <>
            <div className="signup">
                    <form action="" onSubmit={handleSubmit}>
                        <h1>Signup Here</h1>
                        <input type="text" name='UserName' placeholder='Enter UserName' value={UserName} onChange={(e) => setusername(e.target.value)} />
                        <input type="text" name="Mobile" id="Mobile" placeholder='Enter Mobie No.' value={Mobile} onChange={(e) => setMobile(e.target.value)} />
                        <input type="text" name="Email" id="Email" placeholder='Enter Email' value={Email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" name="Password" id="Password" placeholder='Enter Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" name="CPassword" id="CPassword" placeholder='Confirm Password' value={CPassword} onChange={(e) => setCPassword(e.target.value)} />
                        <input type="file" name="image"  onChange={(e) => setImage(e.target.files[0])} />
                        <input type="submit" /><br />
                        <p className='Sign'>Already have an account?<Link className='AC' to='/Login'>Login</Link></p>
                    </form>
            </div>

        </>
    )
}

export default Signup
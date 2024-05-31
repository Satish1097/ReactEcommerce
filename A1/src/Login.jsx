import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './assets/Login.css';

function Login() {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!UserName || !Password) {
      toast.error("Enter credentials");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/SignupData");
      const users = await response.json();
      const user = users.find(u => u.UserName === UserName && u.Password === Password);

      if (user) {
        toast.success("Login Successfully");
        localStorage.setItem('userToken', JSON.stringify(user));// Store user data in localStorage
        localStorage.setItem('id',user.id);
        localStorage.setItem('username', user.UserName);
        localStorage.setItem('email', user.Email);
        localStorage.setItem('mobile',user.Mobile);
        localStorage.setItem('image',user.image);

        navigate('/');
        window.location.reload();// Reload to trigger useEffect in Nav component
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="login">
                <div className="login-left">
                </div>
                <div className="login-right">
                    <form action="" onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <input type="text" name='UserName' placeholder='Enter UserName' value={UserName} onChange={(e) => setUserName(e.target.value)} />
                        <input type="password" name="Password" id="Password" placeholder='Enter Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="submit" /><br />
                        <p className='Login'>New User?<Link className='AC' to='/Signup'>Create Account</Link></p>
                        <p className='forgot'><Link id='f' >Forgot Password?</Link></p>
                    </form>
                </div>
            </div>
    </>
  )
}

export default Login
import  { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './assets/EditProfile.css';

function EditProfile() {
    const { userid } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/SignupData/${userid}`)
            .then((res) => res.json())
            .then((data) => {
                setUserName(data.UserName);
                setMobile(data.Mobile);
                setEmail(data.Email);
                setPassword(data.Password);
                setimage(data.image);

            
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const[UserName,setUserName]=useState('');
    const[Mobile,setMobile]=useState('');
    const[Email,setEmail]=useState('');
    const[Password,setPassword]=useState('');
    const[image,setimage]=useState('');
    const navigate=useNavigate();
    const userdata={UserName,Mobile,Email,Password,image};

    const HandleEdit =async(e)=>{
        e.preventDefault();
        fetch("http://localhost:8000/SignupData/"+userid,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(userdata)
        }).then(response=>{
            response.json();
            toast.success("Updated Successfully");
            navigate('/');
        })

        const dt=await fetch(`http://localhost:8000/SignupData/${userid}`);
        const user=await dt.json();
        console.log(user);
        localStorage.setItem('userToken', JSON.stringify(user));// Store user data in localStorage
        localStorage.setItem('id',user.id);
        localStorage.setItem('username',UserName);
        localStorage.setItem('email',Email);
        localStorage.setItem('mobile',Mobile);
        localStorage.setItem('image',image);

    }

    return (
        <>
        <form action="" onSubmit={HandleEdit} className='EditProfile'>
            <h1>Edit Profile detail</h1>
            <input type="text"  value={UserName} onChange={(e)=>setUserName(e.target.value)}/>
            <input type="text" value={Mobile} onChange={(e)=>setMobile(e.target.value) }/>
            <input type="text" value={Email} onChange={(e)=>setEmail(e.target.value) }/>
            <input type="text"value={Password} onChange={(e)=>setPassword(e.target.value) } />
            <input type="file" />

            <input type="submit" />

        </form>
        
        </>
    );
}

export default EditProfile;

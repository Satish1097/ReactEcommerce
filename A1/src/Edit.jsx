import  { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Edit() {
    const { userid } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/SignupData/${userid}`)
            .then((res) => res.json())
            .then((data) => {
                setUserName(data.UserName);
                setMobile(data.Mobile);
                setEmail(data.Email);
                setPassword(data.Password);
            
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

    const HandleEdit =(e)=>{
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
            navigate('/AdminDashboard',{state: userid});
        })
        
        
    }

    return (
        <>
        <form action="" onSubmit={HandleEdit}>
            <input type="text"  value={UserName} onChange={(e)=>setUserName(e.target.value)}/>
            <input type="text" value={Mobile} onChange={(e)=>setMobile(e.target.value) }/>
            <input type="text" value={Email} onChange={(e)=>setEmail(e.target.value) }/>
            <input type="text"value={Password} onChange={(e)=>setPassword(e.target.value) } />
            <input type="file"value={image} onChange={(e)=>setimage(e.target.value) } />

            <input type="submit" />

        </form>
        
        </>
    );
}

export default Edit;

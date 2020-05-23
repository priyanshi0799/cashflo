import React,{useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
    const usehistory = useHistory();
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [image,setImage] = useState('');
    const [url,setUrl] = useState(undefined);
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic = () => {
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","insta-clone");
        data.append("cloud_name","priyanshi");
        //Images are being uploaded to cloudinary
        fetch("https://api.cloudinary.com/v1_1/priyanshi/image/upload",{
            method: 'post',
            body: data
        })
        .then((res)=>res.json())
        .then(data=>{
            setUrl(data.url);
        })
        .catch((err)=>{
            console.log(err)
        }) 
    }

    const uploadFields = () => {
        //validation
        if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)){
            return M.toast({html: 'Invalid email',classes:"red darken-1"})
        }

        if(name.length < 4){
            return M.toast({html: 'Username should be ateast 4 characters long',classes:"red darken-1"})
        }

        if(!(/^(?=.*\d).{4,8}$/).test(password)){
            return M.toast({html: 'Password must be between 4 and 8 digits long and include at least one numeric digit.',classes:"red darken-1"}) 
        }


        //network request
        fetch('/signup',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:name,
                password: password,
                email: email,
                pic: url
            })
        }).then(res=>res.json())
        .then((data)=>{
            if(data.error){
                M.toast({html: data.error,classes:"red darken-1"})
            }
            else{
                M.toast({html: data.message,classes:"green lighten"})
                usehistory.push('/signin');
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    const postData = () => {
        if(image){
            uploadPic();
        }else{
            uploadFields();
        }
        
    }

    //rendering
    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2 className="brand-logo">SignUp</h2>
                <input type="text" 
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)} 
                />
                <input type="text" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)} 
                />
                <input type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                />
                <div className='file-field input-field'>
                    <div className='btn #f06292'>
                        <span>Upload Picture</span>
                        <input 
                        type='file'
                        onChange={(e)=>setImage(e.target.files[0])}
                        />
                    </div>
                    <div className='file-path-wrapper'>
                        <input className='file-path validate' type='text'/>
                    </div>
                </div>
                <button className="btn waves-effect waves-light #f06292" 
                    type="submit" name="action" onClick={()=>postData()}>SignUp</button>
                <h6><Link to="/signin">Already have an account?</Link></h6>
            </div>
        </div>
    )
}

export default Signup;
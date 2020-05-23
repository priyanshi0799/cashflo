import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signin = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const checkData = () => {

        fetch('/signin',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"red darken-1"})
            }
            else{
                localStorage.setItem('jwt',data.token)
                localStorage.setItem('user',JSON.stringify(data.user))
                M.toast({html:'Signed in Successfully',classes:"green lighten"})
                history.push(`/home/${data.user._id}`)
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2 className="brand-logo">SignIn</h2>
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
                <button className="btn waves-effect waves-light #f06292" type="submit" name="action" onClick={()=>checkData()}>SignIn</button>
                <h6><Link to="/signup">Don't have an account?</Link></h6>
            </div>
        </div>
    )
}

export default Signin;
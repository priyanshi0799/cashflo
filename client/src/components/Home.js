//It is the Home Component(Protected Route), where the user can view the data i.e, the name, email and the image uploaded by him,in 50*50

import React from 'react';
import {useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Home = () => {    
    const history = useHistory()

    const data = JSON.parse(localStorage.getItem('user'));

    if(data==null){
            M.toast({html: 'You must be logged In',classes:"red darken-1"})
            history.push('/signin')
            return <div></div>
    }

    fetch('/home/:id')
    
    return(
    <div>
        <button className="btn waves-effect waves-light #f06292" style={{marginTop:'10px'}} type="submit" name="action" onClick={()=>{
                                                                                                                                        localStorage.clear() 
                                                                                                                                        history.push('/signin')}}>Logout</button>

        <div  style={{maxWidth:'550px',margin:'0px auto'}}>
            <div style={{display:'flex',justifyContent:'space-around',margin:'18px 0px'}}>
                <div>
                    <img style={{width:'50px', height:'50px'}} src={data.pic}/>
                    <h5>{data.name}</h5>
                    <h6>{data.email}</h6>
                </div>
            </div>
        </div>
    </div>      
    )
}

export default Home;
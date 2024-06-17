
import { useNavigate } from 'react-router-dom';
import LoginButton from '../loginAuht0/LoginButton/loginButton.jsx'
import LogOutButton from '../loginAuht0/Logout/Logout.jsx'
import Profile from '../loginAuht0/Profile.jsx'
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from 'react';
import {login} from '../../Redux/action/action.js';
import { useDispatch } from 'react-redux';


const LandingPage = () => {
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useAuth0();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
             //const email = user.email
        if (user.name === user.email){
          dispatch(login(user.email,user.nickname))
    }else{
        dispatch(login(user.email, user.name));
        //console.log("distintos")
    }   
           
          
            }
    }, [isAuthenticated, user, dispatch]);

   
  

    useEffect(()=> {
        if(isAuthenticated){
            navigate('/home');
        }
    },[isAuthenticated, navigate])
    

    return (
        <div className="landing-page">
            {isAuthenticated ? (
                    <> 
                    <Profile/>
                   
                    <LogOutButton/>
                    </>) : 
                    (<LoginButton/>)
            }
          

        </div>
    );
};

export default LandingPage;







import { useNavigate } from 'react-router-dom';
import LoginButton from '../loginAuht0/LoginButton/loginButton.jsx'
import LogOutButton from '../loginAuht0/Logout/Logout.jsx'
import Profile from '../loginAuht0/Profile.jsx'
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from 'react';

const LandingPage = () => {


    
    const {isAuthenticated} = useAuth0()
    const navigate = useNavigate();

    useEffect(()=> {
        if(isAuthenticated){
            navigate('/home');
        }
    },[isAuthenticated, navigate])



    return (
        <div className="landing-page-container">
            <div className="landing-page">
                {isAuthenticated ? (
                    <> 
                    <Profile/>
                    <div > <LogOutButton/> </div>
                    </>) : 
                    (
                    
                    <div className="auth-buttons"><LoginButton/></div>)
                }
            </div>
            <div className='Landingspace'></div>
            <div className='Landing2'></div>
            <div className='Landing3'></div>

        </div>
    );
};

export default LandingPage;






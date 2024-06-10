
import { useNavigate } from 'react-router-dom';
import FooterBottom from '../footer/FooterBottom/FooterBottom.jsx'
import LoginButton from '../loginAuht0/LoginButton/loginButton.jsx'
import LogOutButton from '../loginAuht0/Logout/Logout.jsx'
import Profile from '../loginAuht0/Profile.jsx'
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from 'react';

const LandingPage = () => {

       const handleLogin = () => {
        navigate('/home');
    };

    
    const {isAuthenticated} = useAuth0()
    const navigate = useNavigate();

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
            <FooterBottom/>  
            <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LandingPage;






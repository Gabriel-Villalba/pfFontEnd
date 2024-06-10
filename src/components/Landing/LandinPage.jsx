import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/home');
    };

    return (
        <div className="landing-page">
            <button className="login-button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default LandingPage;

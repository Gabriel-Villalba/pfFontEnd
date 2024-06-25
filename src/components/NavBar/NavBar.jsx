import { Link } from 'react-router-dom';
import LogoutButton from '../loginAuht0/Logout/Logout';
export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FF6F61' }}>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">HOME</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">PRODUCTS</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/form">ADMIN</Link>
                    </li>
                    <div className='botonLogOut'> <LogoutButton/></div>
                
            
                </ul>
            </div>
        </nav>
    );
}
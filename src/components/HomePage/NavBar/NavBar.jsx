//import { Link , NavLink} from 'react-router-dom';
import { Link } from 'react-router-dom';

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
                </ul>
            </div>
            {/* <button className="nav-itemCreate">
                        <NavLink className="nav-linkCreate" to="/form">CREATE PRODUCT</NavLink>
            </button> */}
        </nav>
    );
}

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { useState } from 'react';
import LogoutButton from '../loginAuht0/Logout/Logout';


import  { useState } from 'react';

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const isAdmin = useSelector(state => state.userAdmin); 
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FF6F61' }}>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleMenu}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav" id="menuItems">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">HOME</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">PRODUCTS</Link>
                    </li>
                    {isAdmin && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin">ADMIN</Link>
                    </li>

                    )}
                    <div className='botonLogOut'>  <LogoutButton/></div>
                
            
                </ul>
            </div>
        </nav>
    );
}



//     return (
//         <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FF6F61' }}>
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={toggleMenu}>
//                 <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
//                 <ul className="navbar-nav" id="menuItems">
//                 <li className="nav-item">
//                         <Link className="nav-link" to="/home">HOME</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/products">PRODUCTS</Link>
//                     </li>
//                     {/* <li className="nav-item">
//                         <Link className="nav-link" to="/form">ADMIN</Link>
//                     </li> */}
//                     <div className='Logout'>  <LogoutButton/></div>
//                 </ul>
//             </div>
//         </nav>
//     );
// }









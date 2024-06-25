import homeImage from "../../assets/diseño/Home.jpg";
import { useNavigate} from "react-router-dom";
//import AdminDashboard from "../AdminDashboard/AdminDashboard"; //"./components/AdminDashboard/AdminDashboard.jsx";
import { useAuth0 } from "@auth0/auth0-react";


const HomePage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth0();
    const email = isAuthenticated ? user.email : null;

    return (
        <div className="homePage">
            {email === 'gabrielwaltervillalba@gmail.com' && (
                navigate('/admin') 
               
            )}
            <img src={homeImage} alt="Background" className="backgroundImage" />
        </div>
    );
};

export default HomePage;



// const HomePage = () => {
//     const { isAuthenticated, user } = useAuth0();
//     let email = ""
//     isAuthenticated? email = user.email: email = null;
 
//   return (
//     <div className="homePage">
//       {email === "gabrielwaltervillalba@gmail.com" && ( // Corrige la condición
//         <Routes>
//           <Route path="/admin" element={<AdminDashboard />} />
//         </Routes>
//       )}
//       <img src={homeImage} alt="Background" className="backgroundImage" />
//     </div>
//   );
// };

// export default HomePage;

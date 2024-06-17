import { useAuth0 } from "@auth0/auth0-react"
import { useSelector } from 'react-redux';





const Profile = () => {
  const { user, isAuthenticated,  } = useAuth0();
  const users = useSelector((state) => state.users)
  //const cart = useSelector((state) => state.cart)
  
  //console.log(cart)
  //const cart = useSelector((state) => state.cart)
  //onsole.log(users)
  return (
    isAuthenticated && (
      <>
        <div>
          <p>{user.name}</p>
        </div>
        <div>
         <p>{users}</p>
        </div>
      </>
    
    )
  );
};
export default Profile;
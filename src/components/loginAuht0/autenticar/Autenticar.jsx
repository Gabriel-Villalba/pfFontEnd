import { useAuth0 } from "@auth0/auth0-react"





const Autenticate = () => {
    const {  isAuthenticated } = useAuth0();

    if (isAuthenticated) {
       // const name = user.name
        //const email = user.email
        //console.log(user)
    }
  return (
    <div>autenticate</div>
  )
}

export default Autenticate
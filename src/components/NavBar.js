import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { auth } from '../Firebase';
import {  signOut } from "firebase/auth";

function NavBar() {
    const [isAuth, setIsAuth] = useState(false);
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              setIsAuth(true);
              // ...
              console.log("uid", uid)
            } else {
              // User is signed out
              // ...
              setIsAuth(false);
              console.log("user is logged out")
            }
          });
    }, [])

    return (
        <div className="NavBar">
            <h3 id="Muro">Muro Interactivo</h3>
                {!isAuth ? (
                    <div className="NavButtons">
                        <Link to="/login">
                            <button className="Button" id="Login" type="button">Iniciar Sesión</button>
                        </Link>
                        <Link to="/register">
                            <button className="Button" id="SignUp" type="button">Registrarse</button>
                        </Link>
                    </div>
                ) : (
                    <div className="NavButtons">
                        <Link to="/login">
                            <button className="Button" id="SignOut" type="button" onClick={handleLogout}>Cerrar Sesion</button>
                        </Link>
                    </div> 
                )}
        </div>
    )
}

export default NavBar;
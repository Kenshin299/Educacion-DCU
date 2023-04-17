import { Link } from 'react-router-dom';
import { auth } from '../Firebase';
import { signOut } from "firebase/auth";

function NavBar(props) {
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="NavBar">
            <h3 className="title is-1">Educación</h3>
                {!props.auth ? (
                    <div className="NavButtons">
                        <Link to="/login">
                            <button className="Button" id="Login" type="button">Iniciar Sesión</button>
                        </Link>
                        <Link to="/signup">
                            <button className="Button" id="SignUp" type="button">Registrarse</button>
                        </Link>
                    </div>
                ) : (
                    <div className="NavButtons">
                        <Link to="/">
                            <button className="Button" id="SignOut" type="button" onClick={handleLogout}>Cerrar Sesion</button>
                        </Link>
                    </div> 
                )}
        </div>
    )
}

export default NavBar;
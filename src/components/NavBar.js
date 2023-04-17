import 'bulma/css/bulma.min.css';
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
            <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
            {!props.auth ? (
                <>
                    <div className="navbar-brand">
                        <div className="navbar-item">
                            <Link to="/">
                                <h3 className="title is-1">Educación</h3>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-menu is-active" id="navbarContainer">
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <Link to="/login" className="button is-light">
                                        <strong>Iniciar Sesión</strong>
                                    </Link>

                                    <Link to="/signup" className="button is-primary">
                                        <strong>Registrarse</strong>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="navbar-brand">
                        <div className="navbar-item">
                            <Link to="/main">
                                <h3 className="title is-1">Educación</h3>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-menu is-active" id="navbarContainer">
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div>
                                    <Link to="/">
                                        <button className="button is-primary" id="SignOut" type="button" onClick={handleLogout}>Cerrar Sesion</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </nav>
    )
}

export default NavBar;
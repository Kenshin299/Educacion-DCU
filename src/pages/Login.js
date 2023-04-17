import 'bulma/css/bulma.min.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/main");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert("Correo electronico o contraseña incorrecta");
        });
    }

    return (
        <>
            <div className="container box">
                <h1 className="title is-2">Inicia Sesión</h1>                                                                                              
                <form>
                    <div className="field">
                        <label className="label" htmlFor="email-address">
                            Dirección de Correo Electronico
                        </label>
                        <div className="control has-icons-left">
                            <input
                            className="input"
                            type="email"
                            id="email-address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  
                            required                                    
                            placeholder="Correo Electronico"                                
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="password">
                            Contraseña
                        </label>
                        <div className='control has-icons-left'>
                            <input
                            className="input" 
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required                                 
                            placeholder="Contraseña"              
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-key"></i>
                            </span>      
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input
                            className="button is-success"
                            type="submit" 
                            onClick={onLogin}
                            value="Iniciar Sesión"                        
                            />
                        </div>
                    </div>                                                                                                                          
                </form>
                <p>
                    No tienes una cuenta?{' '}
                    <Link to="/signup" >
                        Registrate
                    </Link>
                </p>                   
            </div>
        </>
    )
}

export default Login;
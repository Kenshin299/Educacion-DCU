import { useNavigate ,Link } from "react-router-dom";
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';


function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
       
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              navigate('/login')
              // ...
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
              // ..
          });
    }

    return (
        <div className="SignUp-Container">
            <h1>Registrate</h1>                                                                                              
            <form>                                                                                            
                <label htmlFor="email-address">
                    Dirección de Correo Electronico
                </label>
                <input
                    type="email"
                    id="email-address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  
                    required                                    
                    placeholder="Correo Electronico"                                
                />

                <label htmlFor="password">
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required                                 
                    placeholder="Contraseña"              
                />                                            
                
                <input
                    type="submit" 
                    onClick={onSubmit}
                    value="Registrarse"                        
                />                                
            </form>
            <p>
                Ya tienes una cuenta?{' '}
                <Link to="/login" >
                    Inicia Sesión
                </Link>
            </p>                   
        </div>
    )
}

export default Register;
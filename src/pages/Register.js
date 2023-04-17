import { useNavigate ,Link } from "react-router-dom";
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../Firebase';


function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
       
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              updateProfile(user, {
                displayName: `${name} ${lastName}`
              }).then(() => {
                //
              }).catch((error) => {
                console.log(error);
              });

              navigate('/login')
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
              alert("No se pudo crear su nueva cuenta: " + errorMessage);
          });
    }

    return (
        <>
            <div className="container box">
                <h1 className="title is-2">Registrate</h1>                                                                                              
                <form>
                    <div className="field">
                        <label className="label" htmlFor="name">
                            Nombre
                        </label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}  
                                required                                    
                                placeholder="Nombre"                                
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                
                    <div className="field">
                        <label className="label" htmlFor="lastName">
                            Apellidos
                        </label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}  
                                required                                    
                                placeholder="Apellido"                                
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                
                    <div className="field">
                        <label htmlFor="email-address">
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
                                onClick={onSubmit}
                                value="Registrarse"                        
                                />
                            </div>
                        </div>                                
                </form>
                <p>
                    Ya tienes una cuenta?{' '}
                    <Link to="/login" >
                        Inicia Sesión
                    </Link>
                </p>                   
            </div>
        </>
    )
}

export default Register;
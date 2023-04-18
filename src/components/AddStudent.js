import StudentList from "./StudentList";
import React, {useState} from "react";
import { collection, addDoc } from "firebase/firestore";
import {db} from '../Firebase';

function AddStudent() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [regisNum, setRegisNum] = useState("");
    const [foto, setFoto] = useState("");
    const [fotoName, setFotoName] = useState("");
    const [isSent, setIsSent] = useState(false);
    
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    let date = new Date().toLocaleDateString('es-ES', options);

    // const handleTitleChange = (e) => {
    //     setPostTitle(e.target.value);
    // };

    const addNewStudent = async (e) => {
        e.preventDefault();
        const sendPost = await addDoc(collection(db, 'estudiantes'), {
            name: name,
            lastName: lastName,
            email: email,
            tel: tel,
            regisNum: regisNum,
            created: date,
        }).then(() => {
            document.querySelector("#Form").reset();
            setIsSent(prevCheck => !prevCheck);
        })
    };

    const handleFoto = (e) => {
        setFoto(e.target.value);
        let fileName = "";
        const fileInput = document.getElementById('foto');
        if (fileInput.files.length > 0) {
            fileName = fileInput.files[0].name;
        }
        document.getElementById('file-name').textContent = fileName;
    }
    
    return (
        <>
            <div className="container box">
                <h2 className="title is-2">Agregar Estudiante</h2>
                <form id="Form" onSubmit={addNewStudent}>
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
                                placeholder="Apellidos"                                
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>

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
                        <label className="label" htmlFor="tel">
                            Telefono
                        </label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="tel"
                                id="tel"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}  
                                required                                    
                                placeholder="Telefono"                                
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-phone"></i>
                            </span>
                        </div>
                    </div>

                    <div id="file-foto" className="field">
                        <label className="label" htmlFor="regisNum">
                            Matricula
                        </label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="text"
                                id="regisNum"
                                value={regisNum}
                                onChange={(e) => setRegisNum(e.target.value)}  
                                required                                    
                                placeholder="Matricula"                                
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-graduation-cap"></i>
                            </span>
                        </div>
                    </div>
                    
                    <div className="file has-name">
                        <label className="file-label" htmlFor="foto">
                            <input
                                className="file-input"
                                type="file"
                                id="foto"
                                onChange={handleFoto}
                                accept="image/png, image/jpeg"  
                                required                                                                  
                            />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label">
                                    Selecciona la foto...
                                </span>
                            </span>
                            <span id="file-name" className="file-name">
                                Vacio
                            </span>
                        </label>                            
                    </div>

                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <input
                            className="button is-success"
                            type="submit" 
                            value="Publicar"
                            />
                        </div>
                    </div>
                </form>
            </div>
            <StudentList isSent={isSent} />
        </>
    )
}

export default AddStudent;
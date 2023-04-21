import StudentList from "./StudentList";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from '../Firebase';
import { ref, uploadBytesResumable } from "firebase/storage";
import { ToastContainer } from "react-toastify";
import { success, failure } from "./ToastFunctions";
import 'react-toastify/dist/ReactToastify.css';
import { FormatPhoneNumber, FormatRegisNumber } from "./GenericFunctions";

function AddStudent() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [regisNum, setRegisNum] = useState("");
    const [foto, setFoto] = useState([]);
    const [percent, setPercent] = useState(0);
    const [isSent, setIsSent] = useState(false);
    
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    let date = new Date().toLocaleDateString('es-ES', options);

    const storageRef = ref(storage, `/images/${foto.name}`);

    const handleFoto = (e) => {
        setFoto(e.target.files[0]);
        let fileName = "";
        const fileInput = document.getElementById('foto');
        try {
            if (fileInput.files.length > 0) {
                fileName = fileInput.files[0].name;
            } else {
                failure("Debe seleccionar una imagen");
            }
            document.getElementById('file-name').textContent = fileName;
        } catch (e) {
            failure("Debe seleccionar una imagen");
        }
       
    };

    const handlePhotoUpload = async () => {
        const uploadTask = uploadBytesResumable(storageRef, foto);
        uploadTask.on('state_changed',  
            (snapshot) => {
                setPercent((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
                failure(error);
            }
        );
        console.log(foto.name + ' uploaded');
    };

    const resetBar = () => {
        document.getElementById('file-name').textContent = "Vacio";
        setPercent(0);
    }

    const addNewStudent = async (e) => {
        e.preventDefault();
        const sendPost = await addDoc(collection(db, 'estudiantes'), {
            name: name,
            lastName: lastName,
            email: email,
            tel: tel,
            regisNum: regisNum,
            created: date,
            photo: foto.name
        }).then(() => {
            handlePhotoUpload();
            setName("");
            setLastName("");
            setEmail("");
            setTel("");
            setRegisNum("");
            console.log(foto);
            setIsSent(prevCheck => !prevCheck);
            setTimeout(resetBar, 1000);
        }).then(() => {
            setTimeout(success("Enviado con exito"), 500);
        }).catch((error) => failure(error));
    };
    
    return (
        <>
            <div className="container box">
                <h2 className="title is-2">Agregar Estudiante</h2>
                <form id="AddStudentForm" onSubmit={addNewStudent}>
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
                                onChange={(e) => {
                                    e.target.value = FormatPhoneNumber(e.target.value);
                                    setTel(e.target.value);
                                }}
                                maxLength={14}
                                pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}"
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
                                onChange={(e) => {
                                    e.target.value = FormatRegisNumber(e.target.value);
                                    setRegisNum(e.target.value);
                                }}
                                maxLength={9}
                                pattern="[0-9]{4}-[0-9]{4}"
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
                                    Selecciona la foto
                                </span>
                            </span>
                            <span id="file-name" className="file-name">
                                Vacio
                            </span>
                        </label>                            
                    </div>

                    {
                        percent > 0 ? (
                            <div className="container">
                                <progress className="progress is-info" value={percent} max="100">{percent}</progress>
                            </div>
                        ) : (
                            <>
                            </>
                        )
                    }
                
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
            <ToastContainer limit={1}/>
            <StudentList isSent={isSent} />
        </>
    )
}

export default AddStudent;
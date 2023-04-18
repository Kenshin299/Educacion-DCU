import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from '../Firebase';
import { useState, useEffect } from 'react';
import logo from "../img/Default.png"


function StudentList(props) {
    const [students, setStudents] = useState([]);
    const [fotoUrl, setFotoUrl] = useState(logo);
    let i = 0;

    const fetchStudents = () => {
        getDocs(query(collection(db, "estudiantes"), orderBy("created", "asc")))
            .then((querySnapshot) => {               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setStudents(newData);                
                console.log(newData);
            }).then(() => {
                students.map((student) => {
                    fetchPhotos(student.photo);
                })
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    const fetchPhotos = (photoName) => {
        let gsReference = ref(storage, `images/${photoName}`);
        // gs://educacion-dcu.appspot.com/images/
        getDownloadURL(gsReference)
            .then((url) => {
                setFotoUrl(url);
                console.log(url);
            });
    }

    useEffect(() => {
        fetchStudents();
    // eslint-disable-next-line
    }, [props.isSent]);

    return (
        <div className="container box">
            <table className="table is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>Matricula</th>
                        <th>Fecha de Registro</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            students.map((student) => (
                                <tr key={student.id}>
                                    <th>{i = i + 1}</th>
                                    <td>
                                        <div className="card">
                                            <div className="card-image">
                                                <figure className="image is-4by3">
                                                    <img src={fotoUrl} alt="Portrait"/>
                                                </figure>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{student.name}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.tel}</td>
                                    <td>{student.regisNum}</td>
                                    <td>{student.created}</td>
                                </tr>
                            ))
                        }
                </tbody>
            </table>
        </div>
    )
}

export default StudentList;
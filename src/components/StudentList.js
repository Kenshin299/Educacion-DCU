import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from '../Firebase';
import { useState, useEffect } from 'react';
import Photo from "./Photo";
import SearchStudent from "./SearchStudent";

function StudentList(props) {
    const [students, setStudents] = useState([]);
    let i = 0;

     const fetchStudents = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault(); 
        }
        await getDocs(query(collection(db, "estudiantes"), orderBy("created", "asc")))
            .then((querySnapshot) => {               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setStudents(newData);                
                console.log(newData);
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    useEffect(() => {
        fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isSent]);

    return (
        <div className="container box">
            <SearchStudent students={students}/>
            <div className="table-container">
                <table className="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>No.</th>
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
                                                    <Photo url={student.photo} />
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
        </div> 
    )
}

export default StudentList;
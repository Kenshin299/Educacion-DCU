import { useState, useEffect } from 'react';
import Photo from './Photo';

function Searchstudent(props) {

    const [isActive, setIsActive] = useState(false);
    const [studentsList, setStudentsList] = useState(props.students);
    const [student, setStudent] = useState([]);

    const resultStudent = () => {
        const result = studentsList.filter(res => res.regisNum == props.search);
        setStudent(result);
    }

    const handleClik = () => {
        setIsActive(false);
        document.getElementById("html").classList.remove("is-clipped");
    };

    useEffect(() => {
        setStudentsList(props.students);
        resultStudent();
    }, [props.students, props.search]);

    useEffect(() => {
        if (props.search === "") {
            setIsActive(false);
        } else {
            setIsActive(true);
            document.getElementById("html").classList.add("is-clipped");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.show]);

    return (
        <>
        <div id="studentModal" className={`modal ${isActive ? "is-active " : ""}`}>
            <div className="modal-background" onClick={handleClik}></div>
                <div className="modal-content">
                {
                    student.map((student) => (
                        <div className="card" key={student.id}>
                            <div className="card-image">
                                <figure className="image">
                                    <Photo url={student.photo} />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <figure className="image is-48x48">
                                            <Photo url={student.photo} />
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4">{student.name} {student.lastName}</p>
                                        <p className="subtitle is-6">Matricula: {student.regisNum}</p>
                                    </div>
                                </div>
                                <div className="content">
                                    <p><strong>Correo Electronico:</strong> {student.email}</p>
                                    <p><strong>Numero de Telefono:</strong> {student.tel}</p>
                                    <p><strong>Fecha de Registro:</strong> {student.created}</p>
                                </div>
                            </div>
                        </div>    
                    ))
                }
                </div>
            <button className="modal-close is-large" aria-label="close" onClick={handleClik}></button>
        </div>
        </>
    )
}

export default Searchstudent;
import { useState } from "react";
import { FormatRegisNumber } from "./GenericFunctions";
import { ToastContainer } from "react-toastify";
import { failure } from "./ToastFunctions";
import SearchResult from "./SearchResult";

function SearchStudent(props) {
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(false);
    const [student, setStudent] = useState([]);

    const mapRegis = () => {
        props.students.map((student) => {
            setStudent(student.regisNum);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        mapRegis();
        if (student.includes(search)) {
            setShow(true);
        } else {
            failure(`No existe estudiante con la matricula: ${search}`)
        }
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field has-addons has-addons-right">
                    <div className="control">
                        <input 
                            className="input"
                            type="text"
                            id="regisNum"
                            value={search}
                            onChange={(e) => {
                                e.target.value = FormatRegisNumber(e.target.value);
                                setSearch(e.target.value);
                            }}
                            maxLength={9}
                            pattern="[0-9+-]+"
                            required                                    
                            placeholder="Matricula"
                            />
                    </div>
                    <div className="control">
                        <button type="submit" className="js-modal-trigger button is-primary" data-target="studentModal">
                            Buscar
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer limit={1} />
            <SearchResult show={show} search={search}/>
        </>
    )
}

export default SearchStudent;
import { useState, useEffect } from "react";
import { FormatRegisNumber } from "./GenericFunctions";
import { ToastContainer } from "react-toastify";
import { failure } from "./ToastFunctions";
import SearchResult from "./SearchResult";

function SearchStudent(props) {
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(false);
    const [students, setStudent] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (students.map((res) => res.regisNum).includes(search)) {
            setShow(prevCheck => !prevCheck);
        } else {
            failure(`No existe estudiante con la matricula: ${search}`);
        }
    };

    useEffect(() => {
        setStudent(props.students);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.students]);


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
                            pattern="[0-9]{4}-[0-9]{4}"
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
            <SearchResult show={show} search={search} students={students}/>
        </>
    )
}

export default SearchStudent;
import { useState, useEffect } from 'react';

function SearchResult(props) {

    const [isActive, setIsActive] = useState(false);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (props.search === "") {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    // eslint-disable-next-line
    }, [props.show]);

    return (
        <>
        <div id="studentModal" className={`modal ${isActive ? "is-active " : ""}`}>
            <div className="modal-background" onClick={() => setIsActive(false)}></div>
            <div className="modal-content">

                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder"/>
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">John Smith</p>
                            <p className="subtitle is-6">@johnsmith</p>
                        </div>
                        </div>

                        <div className="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Phasellus nec iaculis mauris.
                            <br/>
                            <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                        </div>
                    </div>
                </div>
            </div>

            <button className="modal-close is-large" aria-label="close" onClick={() => setIsActive(false)}></button>
        </div>
        </>
    )
}

export default SearchResult;
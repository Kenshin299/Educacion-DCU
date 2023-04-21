import { useState, useEffect } from 'react';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../Firebase';

function Photo(props) {

    const [foto, setFotoUrl] = useState("");

    const fetchPhotos = () => {
        let gsReference = ref(storage, `images/${props.url}`);
        getDownloadURL(gsReference)
            .then((url) => {
                setFotoUrl(url);
                console.log(url);
            }
        );
    }

    useEffect(() => {
        fetchPhotos();
    // eslint-disable-next-line
    }, [props.isSent]);
 
    return (
        <>
        <img src={foto} alt="Portrait"/>
        </>
        
    )
}

export default Photo;
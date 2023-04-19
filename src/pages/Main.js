import AddStudent from "../components/AddStudent";
import { ToastContainer, toast } from "react-toastify";

function MainPage() {
    const toasty = () => {
        toast.success('Enviado con exito', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <>
            <AddStudent />
            {/* <ToastContainer /> */}
        </>
    )
}

export default MainPage;
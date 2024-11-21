import Spinner from "react-bootstrap/Spinner";

export default function Carregando(props) {

    return (
        <>
            {
                !props.carregando ? props.children :
                    <div className="d-flex align-items-center m-5">
                        <strong role="status" style={{color : "white"}}>Carregando...</strong>
                        <Spinner animation="border" size="sm" variant="primary" />
                        <Spinner animation="border" variant="primary" />
                    </div>
            }
        </>
    )
}
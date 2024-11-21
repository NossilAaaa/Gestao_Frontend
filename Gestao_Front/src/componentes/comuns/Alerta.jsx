import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const Alerta = ({ alerta }) => {
    const [exibir, setExibir] = useState(false);

    useEffect(() => {
        if (alerta?.message) {
            setExibir(true);
            const timer = setTimeout(() => {
                setExibir(false);
            }, 2000);

            return () => clearTimeout(timer); // Limpa o timer se o alerta mudar ou o componente desmontar
        }
    }, [alerta]);

    return (
        <>
            {exibir && alerta?.message && (
                <Alert variant={alerta.status === "error" ? "danger" : "primary"}>
                    {alerta.message}
                </Alert>
            )}
        </>
    );
};

export default Alerta;
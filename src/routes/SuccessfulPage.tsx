import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./SuccessfulPage.module.css";

const SuccessfulPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirecionar para a página inicial após 5 segundos
        const redirectTimeout = setTimeout(() => {
            navigate("/");
        }, 5000);

        // Limpar o timeout quando o componente for desmontado
        return () => {
            clearTimeout(redirectTimeout);
        };
    }, [navigate]);

    return (
        <div className={classes.successful_page}>
            <h2>Empresa deletada com sucesso!</h2>
            <p>Você será redirecionado.</p>
        </div>
    );
};

export default SuccessfulPage;
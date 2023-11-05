import React from "react";

import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
    return (
        <div className={classes.page_not_found}>
            <p>Erro 404 - Página não encontrada!</p>
        </div>
    )
}

export default ErrorPage;
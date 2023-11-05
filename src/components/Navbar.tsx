import { Link } from "react-router-dom";

import classes from "./Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={classes.navbar}>
            <Link to="/">Home</Link>
            <Link to="/consulta">Consulta</Link>
            <Link to="/cadastro">Cadastro</Link>
        </nav>
    )
}

export default Navbar
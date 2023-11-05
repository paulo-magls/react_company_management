import RegistrationForm from "../components/RegistrationForm";
import Error from "../components/Error";

import { useState } from "react";

import { useNavigate } from 'react-router-dom';

import { CompanyProps } from "../types/company";

const Register = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const createCompany = async(empresa: CompanyProps) => {
        setError(false);

        try {
            const response = await fetch('http://localhost:1337/empresas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empresa),
            });

            if (response.status === 200) {
                console.log('Empresa cadastrada com sucesso');
                return navigate("/");
            } else {
                setError(true);
                console.error('Erro ao cadastrar empresa');
            }
        } catch (error) {
            setError(true);
            console.error('Erro ao cadastrar empresa', error);
        }
    }

    return (
        <div>
            <h2>Página de Cadastro</h2>
            <RegistrationForm createCompany={ createCompany }/>
            {error && <Error message="Houve um ao cadastrar a empresa!" />}
        </div>
    )
}

export default Register;
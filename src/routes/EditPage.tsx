import EditForm from "../components/EditForm";
import Error from "../components/Error";

import { useParams, useNavigate } from 'react-router-dom';

import { useState, useEffect } from "react";

import { CompanyProps } from "../types/company";

const EditPage = () => {
    const { cnpj } = useParams();
    const navigate = useNavigate();

    const [company, setCompany] = useState<CompanyProps | null>(null);
    const [error, setError] = useState(false);

    const loadCompany = async(Cnpj: number) => {
        setError(false);
        setCompany(null);

        const res = await fetch(`http://localhost:1337/empresas/${Cnpj}`);

        const data = await res.json();

        if(data.result.length === 0) {
            setError(true);
            return;
        }
        
        const { nome_cliente, nome_empresa, cnpj, cep, endereco, numero, telefone, email } = data.result[0];

        const companyData: CompanyProps = {
            nome_cliente,
            nome_empresa,
            cnpj,
            cep,
            endereco,
            numero,
            telefone,
            email
        }

        setCompany(companyData);
    }

    useEffect(() => {
        loadCompany(Number(cnpj));
    }, []);

    const editCompany = async(cnpj: number, empresa: CompanyProps) => {
        setError(false);

        try {
            const response = await fetch(`http://localhost:1337/empresas/${cnpj}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empresa)
            });

            if (response.status === 200) {
                console.log('Empresa atualizada com sucesso');
                return navigate("/");
            } else {
                setError(true);
                console.error('Erro ao atualizar empresa');
            }
        } catch (error) {
            setError(true);
            console.error('Erro ao atualizar empresa', error);
        }
    }

    return (
        <div>
            <h2>Página de Edição</h2>
            { company && <EditForm company={company} editCompany={ editCompany }/> }
            {error && <Error message="Houve um erro ao atualizar a empresa!" />}
        </div>
    )
}

export default EditPage;
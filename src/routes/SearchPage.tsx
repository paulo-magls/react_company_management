import { CompanyProps } from '../types/company';

import Search from '../components/Search';
import Company from '../components/Company';
import Error from '../components/Error';

import { useState } from "react";

const SearchPage = () => {
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

    return (
        <div>
            <Search loadCompany={ loadCompany } />
            {company && <Company {...company} />}
            {error && <Error message='Nenhuma empresa foi encontrada!' />}
        </div>
    )
}

export default SearchPage;
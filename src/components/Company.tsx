import { CompanyProps } from '../types/company';

import { Link, useNavigate } from 'react-router-dom';

import classes from './Company.module.css';

import { formatCNPJ } from '../utils/FormatCnpj';
import { formatCEP } from '../utils/FormatCep';
import { formatPhoneNumber } from '../utils/FormatPhoneNumber';

const Company = ({ nome_cliente, nome_empresa, cnpj, cep, endereco, numero, telefone, email }: CompanyProps) => {
    const navigate = useNavigate();

    const deleteCompany = async(cnpj: string) => {
        try {
          const response = await fetch(`http://localhost:1337/empresas/${cnpj}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          });
      
          if (response.status === 200) {
            console.log('Empresa deletada com sucesso');
            return navigate("/pagina_de_sucesso");
          } else {
            console.error('Erro ao deletar empresa');
          }
        } catch (error) {
            console.error('Erro ao deletar empresa', error);
        }
    };

    return (
        <div className={classes.company}>
            <h2>Cliente: { nome_cliente }</h2>
            <div className={classes.details}>
                <div>
                    <h3>Dados da Empresa</h3>
                    <p>Razão Social: { nome_empresa }</p>
                    <p>CNPJ: { formatCNPJ(String(cnpj)) }</p>
                </div>
                <div>
                    <h3>Localização</h3>
                    <p>CEP: { formatCEP(String(cep)) }</p>
                    <p>Endereço: { endereco }</p>
                    <p>Número: { numero }</p>
                </div>
                <div>
                    <h3>Meios de Contato</h3>
                    <p>Telefone: { formatPhoneNumber(String(telefone)) }</p>
                    <p>E-mail: { email }</p>
                </div>
            </div>
            <div className={classes.operations}>
                <Link to={`/detalhes/${cnpj}`}>Editar Informações</Link>
                <button onClick={() => deleteCompany(String(cnpj))}>Deletar</button>
            </div>
        </div>
    )
}

export default Company;
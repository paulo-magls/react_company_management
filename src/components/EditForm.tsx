interface EditFormProps {
    company: CompanyProps;
    editCompany: (cnpj: number, empresa: CompanyProps) => Promise<void>;
}

import { useState, ChangeEvent } from 'react';

import { formatCEP } from '../utils/FormatCep';
import { formatPhoneNumber } from '../utils/FormatPhoneNumber';

import { CompanyProps } from '../types/company';

import classes from './EditForm.module.css';
import { validateEmail } from '../utils/ValidateEmail';

const EditForm = ({ company, editCompany }: EditFormProps) => {
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        nome_cliente: String(company.nome_cliente),
        nome_empresa: String(company.nome_empresa),
        cep: formatCEP(String(company.cep)),
        endereco: String(company.endereco),
        numero: String(company.numero),
        telefone: formatPhoneNumber(String(company.telefone)),
        email: String(company.email),
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let formattedValue: string = value;

        if (name === 'cep') {
            formattedValue = String(maskCep(value));
        } else if (name === 'telefone') {
            formattedValue = String(maskTelefone(value));
        }

        setFormData({ ...formData, [name]: formattedValue });
    };

    const maskCep = (cep: string) => {  
        // Remove todos os caracteres não numéricos
        const cleanedCep = cep.replace(/\D/g, '');
        
        // Limita o CEP a 8 caracteres
        if (cleanedCep.length <= 8) {
            // Formata o CEP
            let formattedCep = '';
            for (let i = 0; i < cleanedCep.length; i++) {
                if (i === 5) {
                    formattedCep += '-';
                }
                formattedCep += cleanedCep[i];
            }
            return formattedCep;
        }
        return formatCEP(cleanedCep);
    };

    const maskTelefone = (telefone: string) => {  
        // Remove todos os caracteres não numéricos
        const cleanedTelefone = telefone.replace(/\D/g, '');
    
        // Limita o número de caracteres do telefone
        if (cleanedTelefone.length <= 13) {
            // Formata o telefone
            let formattedTelefone = '+55';
    
            if (cleanedTelefone.length > 2) {
                formattedTelefone += ` (${cleanedTelefone.slice(2, 4)}`;
            }
    
            if (cleanedTelefone.length > 4) {
                formattedTelefone += `) ${cleanedTelefone.slice(4, 9)}`;
            }
    
            if (cleanedTelefone.length > 9) {
                formattedTelefone += `-${cleanedTelefone.slice(9, 13)}`;
            }
    
            return formattedTelefone;
        }
        return formatPhoneNumber(cleanedTelefone);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if(validateEmail(formData.email)){
            const empresa: CompanyProps = {
                nome_cliente: formData.nome_cliente,
                nome_empresa: formData.nome_empresa,
                cnpj: company.cnpj,
                cep: Number(formData.cep.replace(/\D/g, '')),
                endereco: formData.endereco,
                numero: Number(formData.numero),
                telefone: Number(formData.telefone.replace(/\D/g, '')),
                email: formData.email,
            };
    
            editCompany(empresa.cnpj, empresa);
        } else {
            setMessage("E-mail inválido!");
            return;
        }
    };

    return (
        <form className={classes.edit_form} onSubmit={handleSubmit}>
            <h2>Cadastro de empresa</h2>
            <p>Realize o cadastro de uma nova empresa</p>
            <div className={classes.edit_form_container}>
                {Object.entries(formData).map(([key, value]) => (
                    <p key={key}>
                        <label htmlFor={key}>{key === 'endereco'? "endereço" : (key === 'numero' ? "número" : key.replace('_', ' '))}:</label>
                        <input
                            name={key}
                            type={
                                key === 'senha' ? 'password' : (key === 'numero' ? 'number' : 'text')
                            }                                
                            placeholder={`Entre com ${ key === 'endereco' ? "endereço" : (key === 'numero' ? "número" : key.replace('_', ' do/a ').toLowerCase())}`}
                            required
                            value={value}
                            onChange={handleChange}
                        />
                    </p>
                ))}
                <button type="submit">Atualizar</button>
            </div>
            <p>{ message }</p>
        </form>
    );
};

export default EditForm;
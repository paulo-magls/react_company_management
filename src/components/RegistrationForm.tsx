type CreateProps = {
    createCompany: (empresa: CompanyProps) => Promise<void>;
}

import { useState, ChangeEvent } from 'react';

import { formatCNPJ } from '../utils/FormatCnpj';
import { formatCEP } from '../utils/FormatCep';
import { formatPhoneNumber } from '../utils/FormatPhoneNumber';
import { validateCNPJ } from '../utils/ValidateCNPJ';
import { validateEmail } from '../utils/ValidateEmail';

import { CompanyProps } from '../types/company';

import classes from './RegistrationForm.module.css';

const RegistrationForm = ({ createCompany }: CreateProps) => {
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        nome_cliente: "",
        senha: "",
        nome_empresa: "",
        cnpj: "",
        cep: "",
        endereco: "",
        numero: "",
        telefone: "",
        email: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let formattedValue: string = value;

        if (name === 'cnpj') {
            formattedValue = String(maskCnpj(value));
        } else if (name === 'cep') {
            formattedValue = String(maskCep(value));
        } else if (name === 'telefone') {
            formattedValue = String(maskTelefone(value));
        }

        setFormData({ ...formData, [name]: formattedValue });
    };

    const maskCnpj = (cnpj: string) => {
        // Remove todos os caracteres não numéricos
        const cleanedCnpj = cnpj.replace(/\D/g, '');
            
        // Limita o CNPJ a 14 caracteres
        if (cleanedCnpj.length <= 14) {
            // Formata o CNPJ
            let formattedCnpj = '';
            for (let i = 0; i < cleanedCnpj.length; i++) {
                if (i === 2 || i === 5) {
                    formattedCnpj += '.';
                } else if (i === 8) {
                    formattedCnpj += '/';
                } else if (i === 12) {
                    formattedCnpj += '-';
                }
                formattedCnpj += cleanedCnpj[i];
            }
            return formattedCnpj;
        }
  
        return formatCNPJ(cleanedCnpj);
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
                formattedTelefone += `)${cleanedTelefone.slice(4, 9)}`;
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

        if(validateCNPJ(formData.cnpj)){
            if(validateEmail(formData.email)){
                const empresa: CompanyProps = {
                    nome_cliente: formData.nome_cliente,
                    senha: formData.senha,
                    nome_empresa: formData.nome_empresa,
                    cnpj: Number(formData.cnpj.replace(/\D/g, '')),
                    cep: Number(formData.cep.replace(/\D/g, '')),
                    endereco: formData.endereco,
                    numero: Number(formData.numero),
                    telefone: Number(formData.telefone.replace(/\D/g, '')),
                    email: formData.email,
                };
                
                createCompany(empresa);
            } else {
                setMessage("E-mail inválido!");
                return;
            }
        } else {
            setMessage("CNPJ Inválido!");
            return;
        }
    };

    return (
        <form className={classes.registration_form} onSubmit={handleSubmit}>
            <h2>Cadastro de empresa</h2>
            <p>Realize o cadastro de uma nova empresa</p>
            <div className={classes.registration_form_container}>
                {Object.entries(formData).map(([key, value]) => (
                    <p key={key}>
                        <label htmlFor={key}>{key === 'endereco'? "endereço" : (key === 'numero' ? "número" : key.replace('_', ' '))}:</label>
                        <input
                            name={key}
                            type={key === 'senha' ? 'password' : 'text'}
                            placeholder={`Entre com ${ key === 'endereco' ? "endereço" : (key === 'numero' ? "número" : key.replace('_', ' do/a ').toLowerCase())}`}
                            required
                            value={value}
                            onChange={handleChange}
                        />
                    </p>
                ))}
                <button type="submit">Cadastrar</button>
            </div>
            <p>{ message }</p>
        </form>
    );
};

export default RegistrationForm;
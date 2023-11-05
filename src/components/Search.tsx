type SearchProps = {
    loadCompany: (cnpj: number) => Promise<void>;
}

import { useState, KeyboardEvent, ChangeEvent } from 'react';

import { BsSearch } from 'react-icons/bs';

import classes from './Search.module.css';

const Search = ({ loadCompany }: SearchProps) => {
    const [cnpj, setCnpj] = useState("");
    
    const handleCnpjChange = (event: ChangeEvent<HTMLInputElement | null>) => {
        const { value } = event.target;
        
        // Remove todos os caracteres não numéricos
        const cleanedCnpj = value.replace(/\D/g, '');
        
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
            setCnpj(formattedCnpj);
        }
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.key === "Enter") {
            loadCompany(Number(cnpj.replace(/\D/g, '')));
        }
    }

    return (
        <div className={classes.search}>
            <h2>Busque por uma empresa:</h2>
            <p>Recupere as informações de uma empresa</p>
            <div className={classes.search_container}>
                <input 
                    type="text" 
                    placeholder='Digite o CNPJ da empresa'
                    value={cnpj}
                    onChange={handleCnpjChange}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={() => loadCompany(Number(cnpj.replace(/\D/g, '')))}>
                    <BsSearch />
                </button>
            </div>
        </div>
    )
}

export default Search;
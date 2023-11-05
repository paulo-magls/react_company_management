import { CompanyProps } from '../types/company';

import Company from '../components/Company';
import Error from '../components/Error';

import { useState, useEffect } from 'react';

const Home = () => {
    const [companies, setCompanies] = useState<CompanyProps[] | null>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        setError(false);
        setCompanies([]);
      
        const res = await fetch(`http://localhost:1337/empresas/`, { method: 'GET' });
        const data = await res.json();
      
        if (data.results.length === 0) {
          setError(true);
          return;
        }
      
        const companyDataArray: CompanyProps[] = data.results;

        setCompanies(companyDataArray);
    }

    return (
        <div>
          {
            companies?.map((company: CompanyProps, index: number) => (
              <Company key={index} {...company}/>
            ))
          }
          {error && <Error message='Nenhuma empresa foi cadastrada.' />}
        </div>
    );
}

export default Home;
import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import api from '../../services/api';

import { Container } from './styles';

interface IAdress {
    data: {
        data: {
            showAddress: {
                street: string;
            }
        }
        errors?: []
    }
}

const Address: React.FC = () => {

    const router = useRouter();

    const fetcher = (query: string) => api.post('/', {
        query
    });

    const { data, error } = useSWR<IAdress>(`
        query {
            showAddress {
                street
            }
        }
    `, fetcher);

    if(error || (data && data.data.errors)) {

        console.log('error: ', error);
        console.log('errors: ', data.data.errors);
        alert('Erro ao busca endereço');
        router.back();

    } else if(!data){

        return <Container>Loading</Container>

    } else if(data) {

        const address = data.data.data.showAddress;
       
        return (
            <Container>
                <h1>{(address && address.street) ? address.street : ''}</h1>
            </Container>
        );
    }
};

export default Address;

import React from 'react';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

import { Container } from './styles';
import { useSwrGraphQl } from '../../services/swrGraphQl';

interface IAdress {
    data: {
        showAddress: {
            street: string;
        }
    }
    errors?: []
}

const Address: React.FC = () => {

    const router = useRouter();

    const { data, error } = useSwrGraphQl<IAdress>(`
        query {
            showAddress {
                street
            }
        }
    `);

    if (error || (data && data.errors)) {

        console.log('error: ', error);
        console.log('errors: ', data.errors);
        alert('Erro ao busca endereço');
        router.back();

    } else if (!data) {

        return (
            <Container>
                <Loader
                    type="TailSpin"
                    color="#f2a365"
                    height={150}
                    width={150}
                />
            </Container>
        );

    } else if (data) {

        const address = data.data.showAddress;

        return (
            <Container>
                <h1>{(address && address.street) ? address.street : ''}</h1>
            </Container>
        );
    }
};

export default Address;

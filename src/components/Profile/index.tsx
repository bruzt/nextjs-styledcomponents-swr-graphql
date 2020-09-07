import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import api from '../../services/api';

import { Container } from './styles';

interface IUser {
    data: {
        data: {
            showUser: {
                id: number;
                name: string;
                email: string;
            }
        }
        errors?: []
    }
}

const Profile: React.FC = () => {

    const router = useRouter();

    const fetcher = (query: string) => api.post('/', {
        query
    });

    const { error, data } = useSWR<IUser>(`
        query {
            showUser {
                id
                name
                email
            }
        }
    `, fetcher);

    if(error || (data && data.data.errors)){

        console.log('error: ', error);
        console.log('errors: ', data.data.errors);
        alert('Erro ao busca usuário');
        router.back();

    } else if(!data) {

        return <Container>Loading</Container>

    } else {

        const user = data.data.data.showUser;

        return (
            <Container>
                
                <div className="user">
                    <span className='id'>ID: {user.id}</span>
                    <span className='name'>Nome: {user.name}</span>
                    <span className='email'>e-mail: {user.email}</span>
                </div>

                <Link href='/address'>
                    <a>
                        Endereço
                    </a>
                </Link>
    
            </Container>
        );
    }
};

export default Profile;

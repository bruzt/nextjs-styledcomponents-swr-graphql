import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

import { useSwrGraphQl } from '../../services/swrGraphQl';

import { Container } from './styles';

interface IUser {
    data: {
        showUser: {
            id: number;
            name: string;
            email: string;
        }
    }
    errors?: []
}

const Profile: React.FC = () => {

    const router = useRouter();

    const { data, error } = useSwrGraphQl<IUser>(`
        query {
            showUser {
                id
                name
                email
            }
        }
    `);

    if (error || (data && data.errors)) {

        console.error('error: ', error);
        console.log('errors: ', data.errors);
        alert('Erro ao busca usuário');
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

    } else {

        const user = data.data.showUser;

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

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

import api from '../../services/api';

import { Container } from './styles';

import Input from '../Input';
import Button from '../Button';

const Login: React.FC = () => {

    const [getNewAccount, setNewAccount] = useState(false);
    const [getLostPassword, setLostPassword] = useState(false);

    const [getName, setName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getConfirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

    async function handleSubmit(event: FormEvent){
        
        event.preventDefault();

        if(getNewAccount) {

            if(
                getName.length > 2 &&
                getEmail.length > 7 &&
                getPassword.length > 5 &&
                getPassword === getConfirmPassword
            ) {

                handleCreateNewAccount();

            } else {

                if(getName.length < 3) alert('Nome muito curto');
                if(getEmail.length < 8) alert('email invalido');
                if(getPassword.length < 6) alert('Senha precisa ter no minímo 6 caracteres');
                if(getPassword !== getConfirmPassword) alert('Senhas precisam ser iguais');
            }

        } else if(!getNewAccount) {

            handleLogin();
        }
    }

    async function handleCreateNewAccount(){

        try {

            const response = await api.post('/graphql', {
                query: `
                    mutation {
                        storeUser(
                            name: "${getName}"
                            email: "${getEmail}"
                            password: "${getPassword}"
                        ) {
                            id
                        }

                        session(
                            email: "${getEmail}"
                            password: "${getPassword}"
                        ){
                            token
                        }
                    }
                `
            }).then(res => res.data);

            alert('Conta criada com sucesso');

            session(response.data.session.token);
            
        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar usuário');
        }
    }

    async function handleLogin(){

        try {

            const response = await api.post('/graphql', {
                query: `
                    mutation {
                        session(
                            email: "${getEmail}"
                            password: "${getPassword}"
                        ){
                            token
                        }
                    }
                `
            }).then(res => res.data);

            if(response.errors && response.errors.length > 0){

                alert('Usuário e/ou senha incorretos');
                setPassword('');
                return;
            }

            session(response.data.session.token);
            
        } catch (error) {
            console.log(error);
            alert('Erro ao logar');
        }
    }

    function session(token: string){

        if(process.browser) sessionStorage.setItem('token', token);

        api.defaults.headers.authorization = `Bearer ${token}`;

        router.push('/profile');
    }

    return (
        <Container>
            
            <form onSubmit={handleSubmit}>
                <header>
                    <span>
                        {(getNewAccount)
                            ? 'Cadastrar'
                            : 'Login'
                        }
                    </span>
                    <hr></hr>
                </header>
                <main>
                    {(getNewAccount) && (
                        <div className="input-group">
                            <label htmlFor="name">Nome</label>
                            <Input 
                                type='text'
                                id='name'
                                value={getName}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <label htmlFor="email">e-mail</label>
                        <Input 
                            type='text'
                            id='email'
                            value={getEmail}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <Input 
                            type='password'
                            id='password'
                            value={getPassword}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    {(getNewAccount) && (
                        <div className="input-group">
                            <label htmlFor="confirm-password">Confirmar senha</label>
                            <Input 
                                type='password'
                                id='confirm-password'
                                value={getConfirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                    )}

                    <Button
                        type='submit'
                    >
                        <span>{
                            (getNewAccount)
                                ? 'Cadastrar'
                                : 'Entrar'
                        }</span>
                    </Button>

                </main>
                <footer>
                    <span
                        onClick={() => setNewAccount(!getNewAccount)}
                    >
                        {(getNewAccount)
                            ? 'Já tenho conta'
                            : 'Cadastrar nova conta'
                        }
                    </span>

                    <span
                        onClick={() => setLostPassword(!getLostPassword)}
                    >
                        {/*(getLostPassword)
                            ? 'Já tenho conta'
                            : 'Esqueci a senha'
                        */}
                    </span>
                </footer>
            </form>

        </Container>
    );
};

export default Login;

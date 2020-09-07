import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    form {
        width: 400px;
        
        background: ${props => props.theme.primary};
        border-radius: 5px;
        padding: 10px 10px 20px 10px;
    }

    header span {
        font-size: 20px;
        font-weight: bold;
    }

    header hr {
        margin-top: 10px;
    }

    main {
        padding: 10px;
    }

    main .input-group {
        
        margin: 10px auto 0 auto;
    }

    .input-group label {
        font-size: 20px;
    }

    main button {
        margin-top: 30px;
        font-size: 20px;
    }

    form footer {
        margin: 10px 0 0 0;
        padding: 10px;

        display: flex;
        justify-content: space-between;
    }

    footer span {
        cursor: pointer;
    }
`;

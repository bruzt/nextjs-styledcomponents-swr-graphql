import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div.user {
        display: flex;
        flex-direction: column;

        span {
            font-size: 20px;
        }
    }

    a {
        text-decoration: none;
        color: inherit;
        font-size: 20px;
        margin-top: 20px;
    }
`;

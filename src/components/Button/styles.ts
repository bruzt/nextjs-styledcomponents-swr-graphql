import styled from 'styled-components';

export const StyledButton = styled.button`
    width: 100%;
    height: 40px;
    border: 0;
    border-radius: 2px;
    background: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.color};
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`;

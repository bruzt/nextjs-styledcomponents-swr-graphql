import React, { ButtonHTMLAttributes } from 'react';

import { StyledButton } from './styles';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {

    return (
        <StyledButton {...rest}>
            {children}
        </StyledButton>
    );
};

export default Button;

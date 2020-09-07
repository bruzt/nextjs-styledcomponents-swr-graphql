import React, { InputHTMLAttributes } from 'react';

import { StyledInput } from './styles';

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {

    return (
        <StyledInput {...props} />
    );
};

export default Input;

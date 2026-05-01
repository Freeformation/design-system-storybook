import React from 'react';
import MuiButton from '@mui/material/Button';

export interface ButtonProps extends React.ComponentProps<typeof MuiButton> {
  primary?: boolean;
}

export const Button = ({ primary, children, ...props }: ButtonProps) => {
  return (
    <MuiButton variant={primary ? 'contained' : 'outlined'} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;

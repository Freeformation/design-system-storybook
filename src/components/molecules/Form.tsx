import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export default function Form({ children, onSubmit, ...props }: FormProps) {
  return (
    <Box component="form" {...props} onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {children}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

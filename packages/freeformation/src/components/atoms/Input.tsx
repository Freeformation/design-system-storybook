import React from 'react';
import TextField from '@mui/material/TextField';

export interface InputProps extends React.ComponentProps<typeof TextField> {}

export default function Input(props: InputProps) {
  return <TextField variant="outlined" fullWidth {...props} />;
}

import React from 'react';
import TextField from '@mui/material/TextField';

export interface FileInputProps extends React.ComponentProps<typeof TextField> {}

export default function FileInput(props: FileInputProps) {
  return <TextField type="file" InputLabelProps={{ shrink: true }} fullWidth {...props} />;
}

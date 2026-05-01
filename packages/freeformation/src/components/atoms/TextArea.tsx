import React from 'react';
import TextField from '@mui/material/TextField';

export interface TextAreaProps extends React.ComponentProps<typeof TextField> {}

export default function TextArea(props: TextAreaProps) {
  return <TextField multiline minRows={4} variant="outlined" fullWidth {...props} />;
}

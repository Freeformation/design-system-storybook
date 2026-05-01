import React from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export interface CheckboxProps extends React.ComponentProps<typeof MuiCheckbox> {
  label?: React.ReactNode;
}

export default function Checkbox({ label, ...props }: CheckboxProps) {
  if (label) return <FormControlLabel control={<MuiCheckbox {...props} />} label={label} />;
  return <MuiCheckbox {...props} />;
}

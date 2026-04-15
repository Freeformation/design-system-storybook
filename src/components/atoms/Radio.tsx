import React from 'react';
import MuiRadio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  options?: RadioOption[];
  label?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Radio({ label, options = [], value, defaultValue, ...props }: RadioProps) {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup {...props} value={value} defaultValue={defaultValue}>
        {options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<MuiRadio />} label={option.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { SelectProps as MuiSelectProps } from '@mui/material/Select';

export interface Option {
  value: string | number;
  label: string;
}

export interface SelectProps extends Omit<MuiSelectProps, 'children'> {
  label?: string;
  options?: Option[];
}

export default function Select({ label, options = [], value, ...props }: SelectProps) {
  const id = props.id ?? 'mui-select';
  return (
    <FormControl fullWidth>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <MuiSelect label={label} value={value ?? ''} id={id} {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

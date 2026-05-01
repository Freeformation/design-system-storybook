import React from 'react';
import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';

export interface HeadingProps extends Omit<TypographyProps<'div'>, 'component'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export default function Heading({ level = 2, children, ...props }: HeadingProps) {
  const variant = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  return (
    <Typography variant={variant} gutterBottom {...props} component="div">
      {children}
    </Typography>
  );
}

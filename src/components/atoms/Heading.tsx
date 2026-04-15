import React from 'react';
import Typography from '@mui/material/Typography';

export interface HeadingProps extends React.ComponentProps<typeof Typography> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export default function Heading({ level = 2, children, ...props }: HeadingProps) {
  return (
    <Typography component={`h${level}`} variant={`h${level}`} gutterBottom {...props}>
      {children}
    </Typography>
  );
}

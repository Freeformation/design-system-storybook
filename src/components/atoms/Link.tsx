import React from 'react';
import MuiLink from '@mui/material/Link';

export interface LinkProps extends React.ComponentProps<typeof MuiLink> {}

export default function Link(props: LinkProps) {
  return <MuiLink {...props} />;
}

import React from 'react';
import Box from '@mui/material/Box';

export interface ImageProps extends React.ComponentProps<typeof Box> {
  src: string;
  alt?: string;
}

export default function Image({ src, alt = 'Image', ...props }: ImageProps) {
  return <Box component="img" src={src} alt={alt} sx={{ maxWidth: '100%', height: 'auto' }} {...props} />;
}

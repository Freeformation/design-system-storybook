import React from 'react';
import Typography from '@mui/material/Typography';

export interface ParagraphProps extends React.ComponentProps<typeof Typography> {}

export default function Paragraph(props: ParagraphProps) {
  return <Typography paragraph {...props} />;
}

import React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

export interface AccordionProps {
  title?: string;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
}

export default function Accordion({ title = 'Accordion', children, defaultExpanded = false }: AccordionProps) {
  return (
    <MuiAccordion defaultExpanded={defaultExpanded}>
      <MuiAccordionSummary>
        <Typography>{title}</Typography>
      </MuiAccordionSummary>
      <MuiAccordionDetails>{children}</MuiAccordionDetails>
    </MuiAccordion>
  );
}

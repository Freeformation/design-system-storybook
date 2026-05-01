import React from 'react';
import MuiList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export interface ListProps {
  items?: Array<string | React.ReactNode>;
}

export default function List({ items = [] }: ListProps) {
  return (
    <MuiList>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </MuiList>
  );
}

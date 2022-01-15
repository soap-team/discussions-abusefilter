import * as React from 'react';
import {
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormContext from '../contexts/FormContext';

export default function FilterCodeEditor() {
  const { filter, modifyFilter } = React.useContext(FormContext);

  const handleNewRule = () => {
    console.log(filter, modifyFilter);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleNewRule} startIcon={<AddIcon/>} size="small">
        Add rule
      </Button>
    </>
  );
}

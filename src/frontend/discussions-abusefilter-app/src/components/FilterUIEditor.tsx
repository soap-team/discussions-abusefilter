import * as React from 'react';
import {
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import type {
  SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormContext from '../contexts/FormContext';
import FilterRule from './FilterRule';

export default function FilterCodeEditor() {
  const { filter, modifyFilter } = React.useContext(FormContext);
  const [rules, setRules] = React.useState<string[]>([]);
  const [elseRule, setElseRule] = React.useState('no-actions');

  const handleNewRule = () => {
    console.log(filter, modifyFilter);
    const newRules = [...rules, ''];
    setRules(newRules);
  };

  const handleElseRuleChange = (event: SelectChangeEvent) => {
    setElseRule(event.target.value);
  };

  return (
    <>
      {rules.map((rule, i) => <FilterRule key={i} index={i} />)}

      <Stack direction="row" spacing={2}>
        <Button variant="outlined" color="primary" onClick={handleNewRule} startIcon={<AddIcon/>} size="small">
          Add a rule
        </Button>
      </Stack>
      <Grid container spacing={1} alignItems="center" sx={{ p: 1 }}>
        <Grid item xs={1}>
          <Typography component="p" variant="subtitle2" sx={{ textAlign: 'center' }}>DEFAULT</Typography>
        </Grid>
        <Grid item xs>
          <Select
            value={elseRule}
            color="primary"
            size="small"
            autoWidth
            onChange={handleElseRuleChange}
          >
            <MenuItem value='actions'>perform actions</MenuItem>
            <MenuItem value='no-actions'>don't perform actions</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </>
  );
}

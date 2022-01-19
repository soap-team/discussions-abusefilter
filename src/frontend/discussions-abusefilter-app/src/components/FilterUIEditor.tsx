import * as React from 'react';
import {
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  Paper,
  Stack,
} from '@mui/material';
import type {
  SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormContext from '../contexts/FormContext';
import FilterRule from './FilterRule';

export default function FilterCodeEditor() {
  const { filter, modifyFilter } = React.useContext(FormContext);
  const [rules, setRules] = React.useState(['']);
  const [elseRule, setElseRule] = React.useState('actions');

  const handleNewRule = () => {
    console.log(filter, modifyFilter);
    const newRules = [...rules, ''];
    setRules(newRules);
  };

  const handleElseRuleChange = (event: SelectChangeEvent) => {
    setElseRule(event.target.value);
  };

  return (
    <Paper variant="outlined" component={Stack} spacing={2} sx={{ p: 2 }}>
      {rules.map((rule, i) => <FilterRule key={i} index={i} />)}
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" color="primary" onClick={handleNewRule} startIcon={<AddIcon/>} size="small">
          OR Block
        </Button>
        <Button variant="outlined" color="primary" onClick={handleNewRule} startIcon={<AddIcon/>} size="small">
          AND Block
        </Button>
      </Stack>
      <Paper variant="outlined">
        <Grid container spacing={1} alignItems="center" sx={{ p: 1 }}>
          <Grid item xs={1}>
            <Typography component="p" variant="subtitle2" sx={{ textAlign: 'center' }}>ELSE</Typography>
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
      </Paper>
    </Paper>
  );
}

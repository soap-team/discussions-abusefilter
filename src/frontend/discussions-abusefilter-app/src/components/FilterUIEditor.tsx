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

const FilterCodeEditor = React.memo(() => {
  const [elseRule, setElseRule] = React.useState('no-actions');
  const { rules, modifyRules } = React.useContext(FormContext);

  const handleNewRule = () => {
    rules.ruleGroups.push({ rules: [{ attr: 'text', operator: 'isOneOf', value: [] }], then: false, type: 'and' });
    modifyRules({ ...rules });
  };

  const handleElseRuleChange = (event: SelectChangeEvent) => {
    setElseRule(event.target.value);
  };

  return (
    <>
      {rules.ruleGroups.map((rule, i) => <FilterRule key={i} index={i} />)}

      <Stack direction="row" spacing={2}>
        <Button variant="outlined" color="primary" onClick={handleNewRule} startIcon={<AddIcon />} size="small">
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
});

export default FilterCodeEditor;

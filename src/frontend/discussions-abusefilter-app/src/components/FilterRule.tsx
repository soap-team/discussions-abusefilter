import React from 'react';
import {
  Typography,
  Grid,
  Paper,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import type {
  SelectChangeEvent } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterRuleInputRow from './FilterRuleInputRow';

export default function FilterRule({ index }: { index: number }) {
  const [ruleOperator, setRuleOperator] = React.useState('OR');
  const [conditions, setConditions] = React.useState(['']);
  const [then, setThen] = React.useState('perform actions');

  const handleRuleOperatorChange = () => {
    setRuleOperator((ruleOperator) => ruleOperator === 'OR' ? 'AND' : 'OR');
  };

  const handleNewCondition = () => {
    const newConditions = [...conditions, ''];
    setConditions(newConditions);
  };

  const handleDeleteRule = () => {
    console.log('delete index', index);
  };

  const handleThenChange = (event: SelectChangeEvent) => {
    setThen(event.target.value);
  };

  return (
    <Paper variant="outlined" sx={{ pl: 1, pb: 4 }}>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title="Toggle Rule Operator">
          <IconButton onClick={handleRuleOperatorChange} size="small">
            <LoopIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Rule">
          <IconButton size="small" onClick={handleDeleteRule}>
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Grid container spacing={2} sx={{ pr: 2 }}>
        <Grid container item spacing={1} alignItems="center">
          <Grid item xs={1}>
            <Typography component="p" variant="subtitle2" sx={{ textAlign: 'center' }}>IF</Typography>
          </Grid>
          <FilterRuleInputRow />
          <Grid item xs="auto">
            <Tooltip title="Add Condition">
              <IconButton size="small" onClick={handleNewCondition}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        {conditions.map(() =>
          <>
            <Grid container item spacing={1} alignItems="center">
              <Grid item xs={1}>
                <Typography component="p" variant="subtitle2" sx={{ textAlign: 'center' }}>{ruleOperator}</Typography>
              </Grid>
              <FilterRuleInputRow />
            </Grid>
          </>,
        )}
        <Grid container item spacing={1} alignItems="center">
          <Grid item xs={1}>
            <Typography component="p" variant="subtitle2" sx={{ textAlign: 'center' }}>THEN</Typography>
          </Grid>
          <Grid item xs>
            <FormControl>
              <Select
                value={then}
                color="primary"
                size="small"
                autoWidth
                onChange={handleThenChange}
              >
                <MenuItem value={'perform actions'}>perform actions</MenuItem>
                <MenuItem value={'don\'t perform actions'}>don't perform actions</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

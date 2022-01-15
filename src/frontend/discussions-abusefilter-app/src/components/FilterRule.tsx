import React from 'react';
import {
  Typography,
  Grid,
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  ListSubheader,
  IconButton,
  Stack,
  InputAdornment,
} from '@mui/material';
import TransformIcon from '@mui/icons-material/Transform';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';

import type {
  SelectChangeEvent } from '@mui/material';

const postAttributes: Record<string, string> = {
  'creation-date': 'post creation date',
  'text': 'post text',
  'links': 'post links',
  'title': 'post title',
  'forum': 'post forum name',
  'type': 'post type',
};

const userAttributes: Record<string, string> = {
  'groups': 'user groups',
  'registration-date': 'user registration date',
  'name': 'user name',
};

const dateOperators: Record<string, string> = {
  'before': 'is before',
  'after': 'is after',
  'within': 'is within the last',
  'not-within': 'is not within the last',
};

const stringOperators: Record<string, string> = {
  'one': 'is one of',
  'not-one': 'is not one of',
  'starts': 'starts with',
  'contains': 'contains',
  'matches': 'matches regex',
};

const stringArrayOperators: Record<string, string> = {
  'exact': 'exactly matches',
  'contains-all': 'contains all of',
  'contains-any': 'contains any of',
  'contains-none': 'contains none of',
};

export default function FilterRule({ index }: { index: number }) {
  const [attribute, setAttribute] = React.useState('creation-date');
  const [operator, setOperator] = React.useState('before');
  const [value, setValue] = React.useState('');

  const [ruleOperator, setRuleOperator] = React.useState('OR');
  const [dataType, setDataType] = React.useState('date');

  const [then, setThen] = React.useState('perform actions');

  const handleAttributeChange = (event: SelectChangeEvent) => {
    setAttribute(event.target.value);
    if (['creation-date', 'registration-date'].includes(event.target.value)) {
      setDataType('date');
      setOperator('before');
    } else if (['links', 'groups'].includes(event.target.value)) {
      setDataType('stringArray');
      setOperator('exact');
    } else {
      setDataType('string');
      setOperator('one');
    }
  };

  const handleRuleOperatorChange = () => {
    setRuleOperator((ruleOperator) => ruleOperator === 'OR' ? 'AND' : 'OR');
  };

  const handleOperatorChange = (event: SelectChangeEvent) => {
    setOperator(event.target.value);
  };

  const handleValueChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  const handleThenChange = (event: SelectChangeEvent) => {
    setThen(event.target.value);
  };

  const handleDeleteRule = () => {
    console.log('delete index', index);
  };

  return (
    <Paper variant="outlined" sx={{ pl: 1, pb: 4 }}>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton aria-label="Toggle Rule Operator" onClick={handleRuleOperatorChange} size="small">
          <TransformIcon />
        </IconButton>
        <IconButton aria-label="Clear" size="small" onClick={handleDeleteRule}>
          <ClearIcon />
        </IconButton>
      </Stack>
      <Grid container spacing={2} sx={{ pr: 2 }}>
        <Grid container item spacing={1} alignItems="center">
          <Grid item xs={1}>
            <Typography component="p" variant="subtitle2" sx={{ textAlign: 'center' }}>IF</Typography>
          </Grid>
          <Grid item xs="auto">
            <FormControl>
              <Select
                value={attribute}
                color="primary"
                size="small"
                onChange={handleAttributeChange}
                autoWidth
              >
                <ListSubheader>Post</ListSubheader>
                {Object.entries(postAttributes).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
                <ListSubheader>User</ListSubheader>
                {Object.entries(userAttributes).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs="auto">
            <FormControl>
              <Select
                value={operator}
                color="primary"
                size="small"
                onChange={handleOperatorChange}
              >
                {dataType === 'string' && Object.entries(stringOperators).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
                {dataType === 'date' && Object.entries(dateOperators).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
                {dataType === 'stringArray' && Object.entries(stringArrayOperators).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <TextField
              defaultValue={value}
              onBlur={handleValueChange}
              size="small"
              InputProps={{
                endAdornment:
                <InputAdornment position="end">
                  <IconButton aria-label="Clear" size="small">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>,
              }} fullWidth/>
          </Grid>
          <Grid item xs="auto">
            <IconButton aria-label="Remove" size="small">
              <RemoveIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container item spacing={1} alignItems="center">
          <Grid item xs={1}>
            <Typography component="p" variant="subtitle2" sx={{ textAlign: 'center' }}>{ruleOperator}</Typography>
          </Grid>
        </Grid>
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

import * as React from 'react';
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  ListSubheader,
  TextField,
  IconButton,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import type {
  SelectChangeEvent } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';

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

export default function FilterCodeEditor() {
  const [attribute, setAttribute] = React.useState('creation-date');
  const [operator, setOperator] = React.useState('before');
  const [value, setValue] = React.useState('');

  const [dataType, setDataType] = React.useState('date');

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

  const handleOperatorChange = (event: SelectChangeEvent) => {
    setOperator(event.target.value);
  };

  const handleValueChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  return (
    <>
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
        <Tooltip title="Remove Condition">
          <IconButton size="small">
            <RemoveIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  );
}


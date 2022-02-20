import * as React from 'react';
import {
  Grid,
  Select,
  MenuItem,
  ListSubheader,
  TextField,
  IconButton,
  Tooltip,
  Autocomplete,
  Typography,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import type { Rule } from '@shared/rules/rules';
import type { Attribute, AttributeType } from '@shared/rules/attributes';
import type { DateOperator, StringOperator, StringArrayOperator } from '@shared/rules/operators';

const postAttributes: Partial<Record<Attribute, string>> = {
  creationDate: 'post creation date',
  text: 'post text',
  links: 'post links',
  title: 'post title',
  forumName: 'post forum name',
  type: 'post type',
};

const userAttributes: Partial<Record<Attribute, string>> = {
  userGroups: 'user groups',
  userRegistrationDate: 'user registration date',
  userName: 'user name',
};

const dateOperators: Record<DateOperator, string> = {
  isBefore: 'is before',
  isAfter: 'is after',
  isWithin: 'is within the last',
  isNotWithin: 'is not within the last',
};

const stringOperators: Record<StringOperator, string> = {
  isOneOf: 'is one of',
  isNotOneOf: 'is not one of',
  startsWith: 'starts with',
  contains: 'contains',
  matchesRegex: 'matches regex',
};

const stringArrayOperators: Record<StringArrayOperator, string> = {
  exactlyMatches: 'exactly matches',
  containsAll: 'contains all of',
  containsAny: 'contains any of',
  containsNone: 'contains none of',
};

export const getAttributeType = (attrName: Attribute): AttributeType => {
  switch (attrName) {
  case 'text':
  case 'title':
  case 'forumName':
  case 'userName':
    return 'string';
  case 'links':
  case 'userGroups':
  case 'mentions':
  case 'imageHashes':
    return 'stringArray';
  case 'type':
    return 'select';
  case 'creationDate':
  case 'userRegistrationDate':
    return 'date';
  case 'position':
    return 'number';
  case 'hasImages':
  case 'hasMentions':
    return 'boolean';
  default:
    throw new Error('Unknown attribute');
  }
};

const getOperators = (attr: Attribute) => {
  switch (getAttributeType(attr)) {
  case 'date':
    return dateOperators;
  case 'string':
    return stringOperators;
  case 'stringArray':
    return stringArrayOperators;
  default:
    throw new Error('Attribute does not have known operators');
  }
};

const FilterRuleInputRow = React.memo(<T extends Rule>({
  rule,
  rulePrefix,
  isLast,
  setAttr,
  setOperator,
  setValue,
  addRule,
  removeRule,
}: {
  rule: T,
  rulePrefix: 'if' | 'and' | 'or',
  isLast?: boolean,
  setAttr(attr: Attribute): void,
  setOperator(operator: T['operator']): void,
  setValue(value: T['value']): void,
  addRule?(): void,
  removeRule(): void,
}) => {
  return (
    <Grid container item spacing={1} alignItems="center">
      <Grid item xs={2} md={1}>
        <Typography component="p" variant="subtitle2" sx={{ textAlign: 'center', textTransform: 'uppercase' }}>
          {rulePrefix}
        </Typography>
      </Grid>
      <Grid item xs={4} md={2}>
        <Select<Attribute>
          fullWidth
          value={rule.attr}
          color="primary"
          size="small"
          onChange={(e) => setAttr(e.target.value as Attribute)}
          autoWidth
        >
          <ListSubheader>Post</ListSubheader>
          {Object.entries(postAttributes).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
          <ListSubheader>User</ListSubheader>
          {Object.entries(userAttributes).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
        </Select>
      </Grid>
      <Grid item xs={4} md={2}>
        <Select<T['operator']>
          fullWidth
          value={rule.operator}
          color="primary"
          size="small"
          onChange={(e) => setOperator(e.target.value as T['operator'])}
        >
          {Object.entries(getOperators(rule.attr)).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
        </Select>
      </Grid>
      <Grid item xs={10} md={6}>
        {(getAttributeType(rule.attr) === 'string' || getAttributeType(rule.attr) === 'stringArray') && (
          <Autocomplete<T['value'], true, false, true>
            multiple
            freeSolo
            size="small"
            options={[]}
            onChange={(e, values) => setValue(values as string[])}
            renderInput={(params) => (
              <TextField {...params} placeholder="values" />
            )}
          />
        )}
      </Grid>
      <Grid item xs={2} md={1}>
        <Tooltip title="Remove rule">
          <IconButton size="small" onClick={removeRule}>
            <RemoveIcon />
          </IconButton>
        </Tooltip>
        {isLast && (
          <Tooltip title="Add rule">
            <IconButton size="small" onClick={addRule}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
});

export default FilterRuleInputRow;

import React from 'react';
import type {
  SelectChangeEvent } from '@mui/material';
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
import LoopIcon from '@mui/icons-material/Loop';
import ClearIcon from '@mui/icons-material/Clear';
import FilterRuleInputRow, { getAttributeType } from './FilterRuleInputRow';
import FormContext from 'contexts/FormContext';
import type { Attribute } from '@shared/rules/attributes';
import type { Rule, StringArrayRule, StringRule } from '@shared/rules/rules';

export const FilterRule = React.memo(({ index }: { index: number }) => {
  const [ruleOperator, setRuleOperator] = React.useState('OR');
  const [then, setThen] = React.useState('perform actions');
  const { rules, modifyRules } = React.useContext(FormContext);

  const handleRuleOperatorChange = () => {
    setRuleOperator((ruleOperator) => ruleOperator === 'or' ? 'or' : 'and');
    rules.ruleGroups[index].type = ruleOperator === 'or' ? 'or' : 'and';
    modifyRules({ ...rules });
  };

  const addRule = () => {
    rules.ruleGroups[index].rules.push({ attr: 'text', operator: 'isOneOf', value: [] });
    modifyRules({ ...rules });
  };

  const removeRule = (i: number) => {
    rules.ruleGroups[index].rules.splice(i, 1);
    modifyRules({ ...rules });
  };

  const removeRuleGroup = () => {
    rules.ruleGroups.splice(index, 1);
    modifyRules({ ...rules });
  };

  const handleThenChange = (event: SelectChangeEvent) => {
    setThen(event.target.value);
    rules.ruleGroups[index].then = then === 'perform actions' ? true : false;
    modifyRules({ ...rules });
  };

  const setAttr = (i: number, attr: Attribute) => {
    const currentAttrType = getAttributeType(rules.ruleGroups[index].rules[i].attr);
    switch (getAttributeType(attr)) {
    case currentAttrType:
      break;
    case 'string':
      rules.ruleGroups[index].rules[i] = { attr, operator: 'isOneOf', value: [] } as StringRule;
      break;
    case 'stringArray':
      rules.ruleGroups[index].rules[i] = { attr, operator: 'containsAny', value: [] } as StringArrayRule;
      break;
    default:
      throw new Error(`Unsupported setAttr for attribute '${attr}'`);
    }
    modifyRules({ ...rules });
  };

  const setOperator = <T extends Rule>(i: number, operator: T['operator']) => {
    rules.ruleGroups[index].rules[i].operator = operator;
    modifyRules({ ...rules });
  };

  const setValue = <T extends Rule>(i: number, value: T['value']) => {
    rules.ruleGroups[index].rules[i].value = value;
    modifyRules({ ...rules });
  };

  return (
    <Paper variant="outlined" sx={{ pl: 1, pb: 4 }}>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title="Toggle rule operator">
          <IconButton onClick={handleRuleOperatorChange} size="small">
            <LoopIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete rule group">
          <IconButton size="small" onClick={removeRuleGroup}>
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Grid container spacing={2} sx={{ pr: 2 }}>
        {rules.ruleGroups[index].rules.map((rule, i) =>
          <Grid container item spacing={1} key={i}>
            <FilterRuleInputRow
              rule={rule}
              rulePrefix={i === 0 ? 'if' : rules.ruleGroups[index].type}
              setAttr={(v) => setAttr(i, v)}
              setOperator={(v) => setOperator(i, v)}
              setValue={(v) => setValue(i, v)}
              removeRule={() => removeRule(i)}
              isLast={i === rules.ruleGroups[index].rules.length - 1}
              addRule={addRule}
            />
          </Grid>,
        )}
        <Grid container item spacing={1} alignItems="center">
          <Grid item xs={1}>
            <Typography component="p" variant="subtitle2" sx={{ textAlign: 'center' }}>THEN</Typography>
          </Grid>
          <Grid item xs>
            <FormControl>
              <Select
                value={rules.catchAll ? 'perform actions' : 'don\'t perform actions'}
                color="primary"
                size="small"
                autoWidth
                onChange={handleThenChange}
              >
                <MenuItem value="perform actions">perform actions</MenuItem>
                <MenuItem value="don't perform actions">don't perform actions</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
});

export default FilterRule;

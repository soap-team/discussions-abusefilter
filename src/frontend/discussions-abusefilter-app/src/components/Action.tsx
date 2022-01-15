import React from 'react';
import type {
  SelectChangeEvent } from '@mui/material';
import {
  Typography,
  Stack,
  MenuItem,
  Select,
  Paper,
  Grid,
  //   FormHelperText,
  FormControl,
} from '@mui/material';
import FormContext from '../contexts/FormContext';
// import type { Action } from '../../../../shared/actions';
import ActionLog from './ActionLog';
import ActionReply from './ActionReply';
import ActionMove from './ActionMove';
// import ActionMove from './ActionMove';

const types = [
  'Log to Discord',
  'Delete',
  'Lock (thread only)',
  'Reply',
  'Move to category',
];

export default function Action({ index }: { index: number }) {
  const { actions, modifyActions } = React.useContext(FormContext);
  const [action, setAction] = React.useState(types[0]);

  const handleActionChange = (event: SelectChangeEvent) => {
    setAction(event.target.value);
  };

  React.useEffect(() => {
    const newActions = [...actions];
    switch (action) {
    case types[0]:
      newActions[index] = {
        type: 'log',
        webhook: '',
        content: '',
      };
      break;
    case types[1]:
      newActions[index] = {
        type: 'delete',
      };
      break;
    case types[2]:
      newActions[index] = {
        type: 'lock',
      };
      break;
    case types[3]:
      newActions[index] = {
        type: 'reply',
        message: '',
      };
      break;
    case types[4]:
      newActions[index] = {
        type: 'move',
        category: '',
      };
      break;
    }
    modifyActions(newActions);
  }, [action]);

  return (
    <Paper variant="outlined" sx={{ my: 2, p: 2 }}>
      <Stack direction="column" spacing={2}>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <Typography component="label" htmlFor="action-type" variant="subtitle2">Type</Typography>
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <Select id="action-type" color="primary" size="small" variant="outlined" value={action} onChange={handleActionChange}>
                {types.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
              </Select>
              {/* <FormHelperText>{moveError ? "You cannot use 'Move to Category' with more than one wiki." : ""}</FormHelperText> */}
            </FormControl>
          </Grid>
        </Grid>
        {actions[index].type === 'log' && <ActionLog index={index} />}
        {actions[index].type === 'reply' && <ActionReply index={index} />}
        {actions[index].type === 'move' && <ActionMove index={index} />}
      </Stack>
    </Paper>
  );
}

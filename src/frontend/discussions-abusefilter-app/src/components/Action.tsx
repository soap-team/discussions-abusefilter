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
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import FormContext from '../contexts/FormContext';
// import type { Action } from '../../../../shared/actions';
import ActionLog from './ActionLog';
import ActionReply from './ActionReply';
import ActionMove from './ActionMove';

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
    const newActions = [...actions];
    switch (event.target.value) {
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
  };

  const handleDelete = () => {
    const newActions = [...actions];
    newActions.splice(index, 1);
    modifyActions(newActions);
  };

  return (
    <Paper variant="outlined" sx={{ pl: 2, pb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title="Delete Action">
          <IconButton size="small" onClick={handleDelete}>
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Stack direction="column" spacing={2} sx={{ pr: 2 }}>
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

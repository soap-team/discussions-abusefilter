import * as React from 'react';
import {
  useParams,
  Link,
} from 'react-router-dom';
import {
  Typography,
  Button,
  TextField,
  Box,
  Stack,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Trigger from '../components/Trigger';
import FilterEditor from '../components/FilterEditor';
import FormContext from '../contexts/FormContext';
import type { Trigger as TriggerType } from '@shared/filters';
import type { Action as FilterAction } from '../../../../shared/actions';
import Action from '../components/Action';

export default function Filter() {
  const { filterId } = useParams();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const { filter, triggers, modifyTriggers, actions, modifyActions } = React.useContext(FormContext);
  const [errors] = React.useState(0);

  const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDescription(event.target.value);
  };

  const handleNewTrigger = () => {
    const newTriggers: TriggerType[] = [...triggers, {
      action: 'create',
      platform: 'article-comment',
      postType: 'thread',
      wiki: '',
    }];
    modifyTriggers(newTriggers);
  };

  const handleNewAction = () => {
    const newActions: FilterAction[] = [...actions, {
      type: 'log',
      webhook: '',
      content: '',
    }];
    modifyActions(newActions);
  };

  const handleSave = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(name, description, filter, triggers, actions);
    console.log(errors);
    if (errors === 0) {
      console.log('firebase updated');
    } else {
      console.log('there are errors');
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">Filter #{filterId}: {'name'}</Typography>
      <Typography variant="caption">{`Last Modified: ${'Noreplyz'}, ${'7 January, 00:30 UTC'}`}</Typography>
      <Stack component="form" autoComplete="off" onSubmit={handleSave} spacing={1} sx={{ mt: 2 }}>
        <Stack direction="column">
          <Typography component="label" htmlFor="filter-name" variant="subtitle2">Name</Typography>
          <TextField
            id="filter-name"
            variant="outlined"
            size="small"
            color="primary"
            defaultValue={name}
            onBlur={handleNameChange}
            fullWidth
          />
        </Stack>
        <Stack direction="column">
          <Typography component="label" htmlFor="filter-description" variant="subtitle2">Description</Typography>
          <TextField
            id="filter-description"
            multiline
            minRows={1}
            maxRows={5}
            variant="outlined"
            size="small"
            color="primary"
            defaultValue={description}
            onBlur={handleDescriptionChange}
            fullWidth
          />
        </Stack>
        <Box>
          <Typography component="h2" variant="subtitle2">Triggers</Typography>
          <Paper variant="outlined" sx={{ p: 2 }} component={Stack} spacing={2}>
            <Typography variant="body2">The filter will only trigger on the following events:</Typography>
            {triggers.map((trigger, i) => <Trigger key={i} index={i} />)}
            <Button variant="outlined" color="primary" onClick={handleNewTrigger} startIcon={<AddIcon/>} size="small" sx={{ width: 'fit-content' }}>
            Add a trigger
            </Button>
          </Paper>
        </Box>
        <Box>
          <Typography component="h2" variant="subtitle2">Filter</Typography>
          <FilterEditor />
        </Box>
        <Box>
          <Typography component="h2" variant="subtitle2">Actions</Typography>
          <Paper variant="outlined" sx={{ p: 2 }} component={Stack} spacing={2}>
            {actions.map((action, i) => <Action key={i} index={i} />)}
            <Button variant="outlined" color="primary" onClick={handleNewAction} startIcon={<AddIcon/>} size="small" sx={{ width: 'fit-content' }}>
            Add an action
            </Button>
          </Paper>
        </Box>
        <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" component={Link} color="secondary" to="/" disableElevation>Cancel</Button>
          <Button variant="contained" color="primary" type="submit" disableElevation>Save</Button>
        </Stack>
      </Stack>
    </>
  );
}

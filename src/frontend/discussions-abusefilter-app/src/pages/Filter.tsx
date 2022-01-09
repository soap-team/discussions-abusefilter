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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Trigger from '../components/Trigger';
import FilterEditor from '../components/FilterEditor';
import FormContext from '../contexts/FormContext';
import type { Trigger as TriggerType } from '../contexts/FormContext';

export default function Filter() {
  const { filterId } = useParams();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const { filter, triggers, modifyTriggers } = React.useContext(FormContext);
  const [errors] = React.useState(0);

  const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDescription(event.target.value);
  };

  const handleNewTrigger = () => {
    const newTriggers = [...triggers, [{
      action: 'creates',
      platform: 'article comment',
      type: 'post',
      wiki: '',
    }] as unknown as TriggerType];
    modifyTriggers(newTriggers);
  };

  const handleSave = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(name, description, filter, triggers);
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
      <Typography variant="caption">{'Last Modified: Noreplyz, 7 January, 00:30 UTC'}</Typography>
      <Box component="form" autoComplete="off" onSubmit={handleSave} mt={2}>
        <Box mb={2}>
          <Typography component="label" htmlFor="filter-name" variant="subtitle2">Name</Typography>
          <TextField
            id="filter-name"
            variant="outlined"
            size="small"
            color="secondary"
            defaultValue={name}
            onBlur={handleNameChange}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <Typography component="label" htmlFor="filter-description" variant="subtitle2">Description</Typography>
          <TextField
            // style={theme === 'light' ? { backgroundColor: '#fff' } : { backgroundColor: '#424242' }}
            id="filter-description"
            multiline
            minRows={1}
            maxRows={5}
            variant="outlined"
            size="small"
            color="secondary"
            defaultValue={description}
            onBlur={handleDescriptionChange}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <Typography component="label" variant="subtitle2">Filter</Typography>
          <FilterEditor />
        </Box>
        <Box>
          <Typography component="h2" variant="subtitle2">Triggers</Typography>
          <Typography variant="body2">The filter will only trigger on the following events:</Typography>
          {triggers.map((trigger, i) => <Trigger key={i} index={i} />)}
          <Button variant="outlined" color="warning" onClick={handleNewTrigger}>
            <AddIcon fontSize="small" />
            Add a trigger</Button>
        </Box>
        <Box>
          <Typography component="h2" variant="subtitle2">Actions</Typography>

          <Button variant="outlined" color="warning" onClick={handleNewTrigger}>
            <AddIcon fontSize="small" />
            Add an action</Button>
        </Box>
        <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" component={Link} color="secondary" to="/" disableElevation>Cancel</Button>
          <Button variant="contained" color="secondary" type="submit" disableElevation>Save</Button>
        </Stack>
      </Box>
    </>
  );
}

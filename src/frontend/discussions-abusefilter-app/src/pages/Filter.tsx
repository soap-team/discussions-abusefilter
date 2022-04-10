import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Typography,
  Button,
  TextField,
  Box,
  Stack,
  FormControlLabel,
  FormGroup,
  Switch,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Trigger from '../components/Trigger';
import FilterEditor from '../components/FilterEditor';
import FormContext from '../contexts/FormContext';
import TriggersContext from '../contexts/TriggersContext';
import Action from '../components/Action';
import ActionsContext from '../contexts/ActionsContext';
import RulesContext from '../contexts/RulesContext';
import { LocalBackendInterface } from 'interfaces/LocalBackendInterface';

export default function Filter() {
  const { filterId } = useParams();

  const [filterEnabled, setFilterEnabled] = React.useState(true);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const { filter } = React.useContext(FormContext);
  const { triggers, modifyTriggers } = React.useContext(TriggersContext);
  const { actions, modifyActions } = React.useContext(ActionsContext);
  const { rules } = React.useContext(RulesContext);
  const [errors] = React.useState(0);

  const handleFilterEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterEnabled(event.target.checked);
  };

  const handleDuplicateFilter = () => {
    console.log('filter duplicated');
  };

  const handleNameChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setDescription(event.target.value);
  };

  const handleNewTrigger = () => {
    modifyTriggers([...triggers,
      {
        action: 'create',
        platform: 'article-comment',
        postType: 'thread',
        wikis: [],
      },
    ]);
  };

  const handleNewAction = () => {
    modifyActions([...actions,
      {
        type: 'log',
        webhook: '',
        content: '',
      },
    ]);
  };

  const handleSave = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(name, description, filter, triggers, actions, rules);
    console.log(errors);
    if (errors === 0) {
      if (filterId === 'new') {
        LocalBackendInterface.getInstance().createFilter({
          id: '0',
          triggers: triggers,
          filter: filter,
          actions: actions,
        }, {
          id: '0',
          title: name,
          description: description,
          wikis: [],
          editedBy: '',
        });
      }
      console.log('firebase updated');
    } else {
      console.log('there are errors');
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack>
          <Typography component="h1" variant="h4">
            Filter #{filterId}: {name}
          </Typography>
          <Typography variant="subtitle1">{`Last modified: ${'Noreplyz'}, ${'7 January, 00:30 UTC'}`}</Typography>
        </Stack>
        <Stack direction="row">
          <FormGroup sx={{ justifyContent: 'center' }}>
            <FormControlLabel
              control={<Switch checked={filterEnabled} onChange={handleFilterEnabledChange} />}
              label="Filter enabled"
            />
          </FormGroup>
          <Tooltip title="Duplicate filter">
            <IconButton color="primary" size="small" onClick={handleDuplicateFilter}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Stack component="form" autoComplete="off" onSubmit={handleSave} spacing={2} sx={{ mt: 2 }}>
        <Typography component="h2" variant="h5">
          Details
        </Typography>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'auto 1fr' }} gap={2}>
          <Box>
            <Typography component="label" htmlFor="filter-name" variant="subtitle1">
              Name
            </Typography>
          </Box>
          <Box>
            <TextField
              id="filter-name"
              variant="outlined"
              size="small"
              color="primary"
              defaultValue={name}
              onBlur={handleNameChange}
              placeholder="Delete posts with emails"
              fullWidth
            />
          </Box>
          <Box>
            <Typography component="label" htmlFor="filter-description" variant="subtitle1">
              Description
            </Typography>
          </Box>
          <Box>
            <TextField
              id="filter-description"
              multiline
              minRows={2}
              maxRows={5}
              variant="outlined"
              size="small"
              color="primary"
              defaultValue={description}
              onBlur={handleDescriptionChange}
              placeholder="Some details, or a link to Slack or Discord"
              fullWidth
            />
          </Box>
        </Box>

        <Divider />

        <Stack spacing={2}>
          <Typography component="h2" variant="h5">
            Triggers
          </Typography>
          <Typography component="p" variant="body2">
            Set the initial conditions that are checked first. The filter will trigger on the following events:
          </Typography>
          {triggers.length === 0 && (
            <Typography component="p" variant="body2">
                (No triggers set - you must have at least one trigger)
            </Typography>
          )}
          {triggers.map((trigger, i) => (
            <Trigger key={i} index={i} />
          ))}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleNewTrigger}
            startIcon={<AddIcon />}
            size="small"
            sx={{ width: 'fit-content' }}
          >
            Add a trigger
          </Button>
        </Stack>

        <Divider />

        <Stack spacing={2}>
          <Typography component="h2" variant="h5">
            Filter
          </Typography>
          <Typography component="p" variant="body2">
            Set the rules that determine if actions are taken or not.
          </Typography>
          <FilterEditor />
        </Stack>

        <Divider />

        <Stack spacing={2}>
          <Typography component="h2" variant="h5">
            Actions
          </Typography>
          <Typography component="p" variant="body2">
            If the filter is true, the following actions will occur:
          </Typography>
          {actions.length === 0 && (
            <Typography component="p" variant="body2">
              (No actions set)
            </Typography>
          )}
          {actions.map((action, i) => (
            <Action key={i} index={i} />
          ))}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleNewAction}
            startIcon={<AddIcon />}
            size="small"
            sx={{ width: 'fit-content' }}
          >
            Add an action
          </Button>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" component={Link} color="secondary" to="/" disableElevation>
            Cancel
          </Button>

          <Button variant="contained" color="primary" type="submit" disableElevation>
                  Save
          </Button>

        </Stack>
      </Stack>
    </>
  );
}

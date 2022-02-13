import * as React from 'react';
import type {
  SelectChangeEvent } from '@mui/material';
import {
  Select,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  IconButton,
  Typography,
  Autocomplete,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import FormContext from '../contexts/FormContext';
import type { TriggerAction, TriggerPlatform, TriggerPostType } from '@shared/filters';

const actions: Record<TriggerAction, string> = {
  'create': 'creates',
  'modify': 'modifies',
  'create-modify': 'creates, modifies',
  'delete': 'deletes',
  'move': 'moves',
  'report': 'reports',
};

const platforms: Record<TriggerPlatform, string> = {
  'article-comment': 'article comment',
  'discussion': 'discussion',
  'message-wall': 'message wall',
  'any': 'any',
};

const types: Record<TriggerPostType, string> = {
  'thread': 'post',
  'reply': 'reply',
  'any': 'post or reply',
};

export default function Trigger({ index }: { index: number }) {
  const { triggers, modifyTriggers } = React.useContext(FormContext);
  const [action, setAction] = React.useState('create' as TriggerAction);
  const [platform, setPlatform] = React.useState('article-comment' as TriggerPlatform);
  const [type, setType] = React.useState('thread' as TriggerPostType);
  const [wikis, setWikis] = React.useState(['']);

  const handleActionChange = (event: SelectChangeEvent) => {
    setAction(event.target.value as TriggerAction);
    if (event.target.value === 'report') {
      setPlatform('any');
      setType('any');
    }
  };

  const handlePlatformChange = (event: SelectChangeEvent) => {
    setPlatform(event.target.value as TriggerPlatform);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as TriggerPostType);
  };

  const handleDelete = () => {
    const newTriggers = [...triggers];
    newTriggers.splice(index, 1);
    modifyTriggers(newTriggers);
  };

  React.useEffect(() => {
    const newTriggers = [...triggers];
    newTriggers[index] = {
      action: action,
      platform: platform,
      postType: type,
      wikis: wikis,
    };
    modifyTriggers(newTriggers);
  }, [action, platform, type, wikis]);

  return (
    <Grid container spacing={1} sx={{ alignItems: 'center' }}>
      <Grid item>
        <Typography variant="body2">A user</Typography>
      </Grid>
      <Grid item>
        <FormControl>
          <Select
            value={action}
            color="primary"
            size="small"
            onChange={handleActionChange}
          >
            {Object.entries(actions).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        {platform !== 'any' && <Typography variant="body2">a/an</Typography>}
      </Grid>
      <Grid item>
        <FormControl>
          <Select
            value={platform}
            color="primary"
            size="small"
            onChange={handlePlatformChange}
            disabled={action === 'report'}
          >
            {Object.entries(platforms).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <Select
            value={type}
            color="primary"
            size="small"
            onChange={handleTypeChange}
            disabled={action === 'report'}
          >
            {Object.entries(types).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Typography variant="body2">on the wiki(s)</Typography>
      </Grid>
      <Grid item lg md={11} sm={11} xs={7}>
        <Autocomplete
          multiple
          freeSolo
          size="small"
          options={[]}
          onChange={(e, values) => setWikis(values)}
          renderInput={(params) => (
            <TextField {...params} placeholder="wiki(s)" />
          )}
        />
      </Grid>
      <Grid item>
        <IconButton size="small" aria-label="delete" onClick={handleDelete}>
          <RemoveIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

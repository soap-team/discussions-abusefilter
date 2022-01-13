import * as React from 'react';
import type {
  SelectChangeEvent } from '@mui/material';
import {
  Select,
  TextField,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  IconButton,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
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
  'report': 'report',
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
  const [wiki, setWiki] = React.useState('');

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

  const handleWikiChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setWiki(event.target.value);
  };

  React.useEffect(() => {
    const newTriggers = [...triggers];
    newTriggers[index] = {
      action: action,
      platform: platform,
      postType: type,
      wiki: wiki,
    };
    modifyTriggers(newTriggers);
  }, [action, platform, type, wiki]);

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', my: 2 }}>
      <Typography variant="body2">A user</Typography>
      <FormControl>
        <InputLabel id="demo-simple-select-label" color="secondary">Action Options</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={action}
          label="Action Options"
          color="secondary"
          size="small"
          onChange={handleActionChange}
        >
          {Object.entries(actions).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
        </Select>
      </FormControl>
      {platform !== 'any' && <Typography variant="body2">a/an</Typography>}
      <FormControl>
        <Select
          value={platform}
          color="secondary"
          size="small"
          onChange={handlePlatformChange}
          disabled={action === 'report'}
        >
          {Object.entries(platforms).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="2" color="secondary">Types</InputLabel>
        <Select
          labelId="2"
          id="21"
          value={type}
          label="Types"
          color="secondary"
          size="small"
          onChange={handleTypeChange}
          disabled={action === 'report'}
        >
          {Object.entries(types).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)}
        </Select>
      </FormControl>
      <Typography variant="body2">on the wiki</Typography>
      <TextField size="small" color="secondary" defaultValue={wiki} onBlur={handleWikiChange}/>
      <IconButton size="small" aria-label="delete">
        <ClearIcon />
      </IconButton>
    </Stack>
  );
}

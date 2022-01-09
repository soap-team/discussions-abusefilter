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

const actionOptions = [
  'creates',
  'modifies',
  'creates, modifies',
  'deletes',
  'moves',
];

const platforms = [
  'article comment',
  'discussion',
  'message wall',
  'any platform',
];

const types = [
  'post',
  'reply',
  'post or reply',
];

export default function Trigger({ index }: { index: number }) {
  const { triggers, modifyTriggers } = React.useContext(FormContext);
  const [action, setAction] = React.useState(actionOptions[0]);
  const [platform, setPlatform] = React.useState(platforms[0]);
  const [type, setType] = React.useState(types[0]);
  const [wiki, setWiki] = React.useState('');
  const trigger = {
    action: action,
    platform: platform,
    type: type,
    wiki: wiki,
  };

  const handleActionChange = (event: SelectChangeEvent) => {
    setAction(event.target.value);
  };

  const handlePlatformChange = (event: SelectChangeEvent) => {
    setPlatform(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleWikiChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setWiki(event.target.value);
  };

  const newTriggers = [...triggers];
  React.useEffect(() => {
    newTriggers[index] = trigger;
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
          autoWidth
        >
          {actionOptions.map((action) => <MenuItem key={action} value={action}>{action}</MenuItem>)}
        </Select>
      </FormControl>
      <Typography variant="body2">a/an</Typography>
      <FormControl>
        <Select
          value={platform}
          color="secondary"
          size="small"
          onChange={handlePlatformChange}
          autoWidth
        >
          {platforms.map((platform) => <MenuItem key={platform} value={platform}>{platform}</MenuItem>)}
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
          autoWidth
        >
          {types.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
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

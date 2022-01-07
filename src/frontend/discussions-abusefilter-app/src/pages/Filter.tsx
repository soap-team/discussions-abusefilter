import * as React from 'react';
import {
    useParams,
    Link,
  } from 'react-router-dom';
  import { 
    Typography,
    Button,
    TextField,
    Tooltip,
    Paper,
    Box,
    Stack,
  } from '@mui/material';
  import AddIcon from '@mui/icons-material/Add';
  import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
  import {UnControlled as CodeMirror} from 'react-codemirror2';
  //import Trigger from '../components/Trigger';
  import 'codemirror/addon/selection/active-line';
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/theme/zenburn.css';
  
export default function Filter() {
  const { filterId } = useParams();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [triggers, setTriggers] = React.useState([{
    wikis: [],
    triggers: {
      discThread: false,
      discReply: false,
      artCommThread: false,
      artCommReply: false,
      messWallThread: false,
      messWallReply: false,
      repPost: false,
    },
    actions: [{
      type: 1,
      text: "",
      url: "",
    }],
  }]);
  const [focus, setFocus] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDescription(event.target.value);
  };

  const handleFilterChange = (editor: any, data: any, value: React.SetStateAction<string>) => {
    setFilter(value);
  };

  const handleFocusChange = () => {
    setFocus(true);
  };

  const handleBlurChange = () => {
    setFocus(false);
  };

  const handleNewTrigger = () => {
    const newTriggers = [...triggers, {
      wikis: [],
      triggers: {
        discThread: false,
        discReply: false,
        artCommThread: false,
        artCommReply: false,
        messWallThread: false,
        messWallReply: false,
        repPost: false,
      },
      actions: [{
        type: 1,
        text: "",
        url: "",
      }],
    }];
    setTriggers(newTriggers);
    console.log(newTriggers);
  }

  const handleSave = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(name, description, filter, triggers);
    console.log(error);
    if (!error) {
      console.log("firebase updated");
    } else {
      console.log("there are errors");
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">Filter #{filterId}: {'name'}</Typography>
      <Typography variant="caption">{"Last Modified: Noreplyz, 7 January, 00:30 UTC"}</Typography>
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
          <Paper variant="outlined" sx={[
            !focus && {
              '&:hover': {
              borderColor: '#000' ,
              },
              borderColor: '#c4c4c4',
            },
            focus && {
              borderColor: '#FEC600',
            },
          ]}>
            <CodeMirror
              // className={theme === 'light' ? undefined : "codemirror-dark"}
              options={{
                mode: 'xml',
                lineNumbers: true,
                // theme: theme === 'light' ? 'default' : "zenburn",
                styleActiveLine: true,
                screenReaderLabel: "filter",
              }}
              onChange={handleFilterChange}
              onFocus={handleFocusChange}
              onBlur={handleBlurChange}
            />
          </Paper>
        </Box>
        <Box>
          <Typography component="h2" variant="subtitle2">Triggers</Typography>
          <Typography variant="body2">The filter will only trigger on the following events:</Typography>
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
        <Stack direction="row" spacing={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" component={Link} color="secondary" to="/" disableElevation>Cancel</Button>
            <Button variant="contained" color="secondary" type="submit" disableElevation>Save</Button>
        </Stack>
      </Box>
    </>
  );
}

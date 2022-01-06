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
      <Typography component="h1" variant="h5">Filter #{filterId}</Typography>
      <Box component="form" autoComplete="off" onSubmit={handleSave} mt={2}>
        <Box mb={2}>
          <Typography component="label" htmlFor="filter-name" variant="subtitle1">Name</Typography>
          <TextField

            id="filter-name"
            variant="outlined"
            size="small"
            defaultValue={name}
            onBlur={handleNameChange}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <Typography component="label" htmlFor="filter-description" variant="subtitle1">Description</Typography>
          <TextField
            // style={theme === 'light' ? { backgroundColor: '#fff' } : { backgroundColor: '#424242' }}
            id="filter-description"
            multiline rows={5}
            variant="outlined"
            defaultValue={description}
            onBlur={handleDescriptionChange}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <Typography component="label" variant="subtitle1">Filter</Typography>
          <Paper variant="outlined">
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
            />
          </Paper>
        </Box>
        <Box>
          <Typography component="h2" variant="h5" width="auto">
            Triggers and Actions
            <Tooltip title="info">
              <InfoOutlinedIcon fontSize="small" />
            </Tooltip>
          </Typography>
          {/* {triggers.map((o, i) => <Trigger key={i} id={i} triggers={triggers} setTriggers={setTriggers} error={error} setError={setError} />)} */}
        </Box>
        <Box>
          <Button variant="contained" type="button" onClick={handleNewTrigger}><AddIcon fontSize="small" /> Add new trigger</Button>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" type="button" component={Link} to="/">Cancel</Button>
          <Box ml={1}>
            <Button variant="contained" color="primary" type="submit">Save</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

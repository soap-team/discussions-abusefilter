import React from 'react';
import {
  Typography,
  Grid,
  TextField,
} from '@mui/material';
import ActionsContext from '../contexts/ActionsContext';

const ActionReply = React.memo(({ index }: { index: number }) => {
  const { actions, modifyActions } = React.useContext(ActionsContext);
  const [message, setMessage] = React.useState('');

  const handleMessageChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setMessage(event.target.value);
  };

  React.useEffect(() => {
    const newActions = [...actions];
    newActions[index] = {
      type: 'reply',
      message: message,
    };
    modifyActions(newActions);
  }, [message]);

  return (
    <Grid container alignItems="center">
      <Grid item xs={3}>
        <Typography component="label" htmlFor="message" variant="subtitle2">Message</Typography>
      </Grid>
      <Grid item xs>
        <TextField
          id="message"
          size="small"
          variant="outlined"
          defaultValue={message}
          onBlur={handleMessageChange}
          fullWidth />
      </Grid>
    </Grid>
  );
});

export default ActionReply;

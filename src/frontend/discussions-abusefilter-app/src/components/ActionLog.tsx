import React from 'react';
import {
  Typography,
  Grid,
  TextField,
} from '@mui/material';
import FormContext from '../contexts/FormContext';

export default function ActionLog({ index }: { index: number }) {
  const { actions, modifyActions } = React.useContext(FormContext);
  const [text, setText] = React.useState('');
  const [webhook, setWebhook] = React.useState('');

  const handleTextChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(event.target.value);
  };

  const handleWebhookChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setWebhook(event.target.value);
  };

  React.useEffect(() => {
    const newActions = [...actions];
    newActions[index] = {
      type: 'log',
      webhook: webhook,
      content: text,
    };
    modifyActions(newActions);
  }, [text, webhook]);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Typography component="label" htmlFor="log-text" variant="subtitle2">Text</Typography>
        </Grid>
        <Grid item xs>
          <TextField
            id="log-text"
            size="small"
            variant="outlined"
            defaultValue={text}
            onBlur={handleTextChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Typography component="label" htmlFor="log-webhook" variant="subtitle2">Webhook URL</Typography>
        </Grid>
        <Grid item xs>
          <TextField
            id="log-webhook"
            size="small"
            variant="outlined"
            defaultValue={webhook}
            onBlur={handleWebhookChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}

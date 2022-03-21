import React from 'react';
import {
  Typography,
  Grid,
  TextField,
} from '@mui/material';
import ActionsContext from '../contexts/ActionsContext';

const ActionMove = React.memo(({ index }: { index: number }) => {
  const { actions, modifyActions } = React.useContext(ActionsContext);
  const [category, setCategory] = React.useState('');

  const handleCategoryChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setCategory(event.target.value);
  };

  React.useEffect(() => {
    const newActions = [...actions];
    newActions[index] = {
      type: 'move',
      category: category,
    };
    modifyActions(newActions);
  }, [category]);

  return (
    <Grid item>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Typography component="label" htmlFor="move" variant="subtitle1">Category ID</Typography>
        </Grid>
        <Grid item xs>
          <TextField
            id="move"
            size="small"
            variant="outlined"
            defaultValue={category}
            onBlur={handleCategoryChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </Grid>
  );
});

export default ActionMove;

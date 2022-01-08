import * as React from 'react';
import {
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  Javascript,
  PanToolAlt,
} from '@mui/icons-material';
import FilterCodeEditor from './FilterCodeEditor';

export default function FilterEditor() {
  const [alignment, setAlignment] = React.useState<string | null>('code');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <>
      {alignment === 'gui' ? <div>gui editor</div> : <FilterCodeEditor /> }
      <ToggleButtonGroup
        value={alignment}
        exclusive
        size="small"
        color="warning"
        onChange={handleAlignment}
        aria-label="Filter Editor Toggle"
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <ToggleButton value="code" aria-label="code">
          <Javascript />
          Javascript Editor
        </ToggleButton>
        <ToggleButton value="gui" aria-label="gui">
          <PanToolAlt />
          UI Editor
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

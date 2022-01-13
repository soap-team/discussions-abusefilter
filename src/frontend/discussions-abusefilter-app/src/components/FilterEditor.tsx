import * as React from 'react';
import {
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  Javascript,
  PanToolAlt,
} from '@mui/icons-material';
import FilterUIEditor from './FilterUIEditor';
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
      {alignment === 'ui' ? <FilterUIEditor /> : <FilterCodeEditor /> }
      <ToggleButtonGroup
        value={alignment}
        exclusive
        size="small"
        color="secondary"
        onChange={handleAlignment}
        aria-label="Filter Editor Toggle"
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <ToggleButton value="code" aria-label="Javascript editor toggle">
          <Javascript />
          Javascript Editor
        </ToggleButton>
        <ToggleButton value="ui" aria-label="UI editor toggle">
          <PanToolAlt />
          UI Editor
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

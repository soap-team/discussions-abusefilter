import * as React from 'react';
import {
  Paper,
} from '@mui/material';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/addon/selection/active-line';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/zenburn.css';
import 'codemirror/mode/javascript/javascript';

export default function FilterCodeEditor() {
  const [filter, setFilter] = React.useState('');
  const [focus, setFocus] = React.useState(false);

  const handleFilterChange = (editor: unknown, data: unknown, value: React.SetStateAction<string>) => {
    setFilter(value);
  };

  const handleFocusChange = () => {
    setFocus(true);
  };

  const handleBlurChange = () => {
    setFocus(false);
  };

  return (
    <Paper variant="outlined" sx={[
      !focus && {
        '&:hover': {
          borderColor: '#000',
        },
        borderColor: '#c4c4c4',
      },
      focus && {
        borderColor: '#FEC600',
      },
    ]}>
      <CodeMirror
        // className={theme === 'light' ? undefined : "codemirror-dark"}
        value={filter}
        options={{
          mode: 'xml',
          lineNumbers: true,
          // theme: theme === 'light' ? 'default' : "zenburn",
          styleActiveLine: true,
          screenReaderLabel: 'filter',
        }}
        onChange={handleFilterChange}
        onFocus={handleFocusChange}
        onBlur={handleBlurChange}
      />
    </Paper>
  );
}

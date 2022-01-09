import * as React from 'react';
import {
  Paper,
} from '@mui/material';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/addon/selection/active-line';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/zenburn.css';
import 'codemirror/mode/javascript/javascript';
import FormContext from '../contexts/FormContext';

export default function FilterCodeEditor() {
  const [focus, setFocus] = React.useState(false);
  const { filter, modifyFilter } = React.useContext(FormContext);

  const handleFocusChange = () => {
    setFocus(true);
  };

  const handleBlurChange = (editor: {valueOf(): {getValue(): string}}) => {
    setFocus(false);
    modifyFilter(editor.valueOf().getValue());
  };

  return (
    <>
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
            mode: 'javascript',
            lineNumbers: true,
            // theme: theme === 'light' ? 'default' : "zenburn",
            styleActiveLine: true,
            screenReaderLabel: 'filter',
          }}
          onFocus={handleFocusChange}
          onBlur={handleBlurChange}
        />
      </Paper>
    </>
  );
}

import * as React from 'react';
import {
  Paper,
} from '@mui/material';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/addon/selection/active-line';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/zenburn.css';
import 'codemirror/mode/javascript/javascript';
import FormContext from '../contexts/FormContext';

export default function FilterCodeEditor() {
  const [focus, setFocus] = React.useState(false);
  const { filter, modifyFilter } = React.useContext(FormContext);
  const [code, setCode] = React.useState(filter);

  const handleFilterChange = (editor: unknown, event: unknown, value: string) => {
    setCode(value);
    console.log(value);
  };

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
          value={code}
          options={{
            mode: 'xml',
            lineNumbers: true,
            // theme: theme === 'light' ? 'default' : "zenburn",
            styleActiveLine: true,
            screenReaderLabel: 'filter',
          }}
          onBeforeChange={handleFilterChange}
          onFocus={handleFocusChange}
          onBlur={handleBlurChange}
        />
      </Paper>
    </>
  );
}

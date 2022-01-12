import * as React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/addon/selection/active-line';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/zenburn.css';
import 'codemirror/mode/javascript/javascript';
import FormContext from '../contexts/FormContext';

export default function FilterCodeEditor() {
  // const [focus, setFocus] = React.useState(false);
  const { filter, modifyFilter } = React.useContext(FormContext);

  // const handleFocusChange = () => {
  //   setFocus(true);
  // };

  const handleBlurChange = (editor: {valueOf(): {getValue(): string}}) => {
    // setFocus(false);
    modifyFilter(editor.valueOf().getValue());
  };

  return (
    <>
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
        onBlur={handleBlurChange}
      />
    </>
  );
}

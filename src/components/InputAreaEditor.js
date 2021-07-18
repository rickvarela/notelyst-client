import styled from 'styled-components';
import { useEffect, useMemo } from 'react';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { createEditor, Transforms } from 'slate';

const StyledInputAreaEdior = styled.div`
  padding: 40px;
  flex: 1;
  overflow-y: auto;
`;

const StyledEditorWrapper = styled.div`
  cursor: text;
  height: 100%;
`;

export const InputAreaEditor = ({ editorState, setEditorState }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    if (editorState.isNewNote) {
      if (editorState.selection)
        Transforms.select(editor, editorState.selection);
      ReactEditor.focus(editor);
    }
  }, [editorState]);

  const handelEditorChange = (newEditorState) => {
    setEditorState({
      editorState: newEditorState,
    });
  };

  const handelBlur = () => {
    setEditorState({
      selection: editor.selection,
    });
  };

  return (
    <StyledInputAreaEdior>
      <StyledEditorWrapper>
        <Slate
          editor={editor}
          value={editorState.editorState}
          onChange={handelEditorChange}
        >
          <Editable
            placeholder='Enter some text...'
            autoFocus
            onBlur={handelBlur}
          />
        </Slate>
      </StyledEditorWrapper>
    </StyledInputAreaEdior>
  );
};

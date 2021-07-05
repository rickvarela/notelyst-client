import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNoteState } from '../util/NoteState';
import { useAuth } from '../util/AuthContext';

import { InputArea } from './InputArea';
import { NotesMenu } from './NotesMenu';

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const NoteLystApp = () => {
  const [editorState, setEditorState, noteState, noteActions] = useNoteState();
  const [screenState, setScreenState] = useState({
    isMobile: window.innerWidth < 800,
    expandMenu: false,
  });
  const { isLoaded, actions } = useAuth();

  useEffect(() => {
    actions.checkToken();
    const updateWindow = () => {
      setScreenState((prevState) => ({
        ...prevState,
        isMobile: window.innerWidth < 800,
      }));
    };

    window.addEventListener('resize', updateWindow);
    return () => window.removeEventListener('resize', updateWindow);
  }, []);

  const handelExpand = () => {
    setScreenState((prevState) => ({
      ...prevState,
      expandMenu: !prevState.expandMenu,
    }));
  };

  return isLoaded ? (
    <StyledApp>
      <NotesMenu
        noteState={noteState}
        noteActions={noteActions}
        handelExpand={handelExpand}
        screenState={screenState}
      />
      <InputArea
        editorState={editorState}
        setEditorState={setEditorState}
        handelExpand={handelExpand}
        screenState={screenState}
      />
    </StyledApp>
  ) : null;
};

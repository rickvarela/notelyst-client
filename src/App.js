import styled from 'styled-components'
import { useEffect } from 'react'
import { useNoteState } from './util/NoteState'

import { InputArea } from './sections/InputArea'
import { NotesMenu } from './sections/NotesMenu'

const StyledApp = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Nunito', sans-serif;
`

function App() {
  const [editorState, setEditorState, noteState, noteActions] = useNoteState()

  useEffect(() => {
  }, [noteState, editorState])

  return (
    <StyledApp>
      <NotesMenu noteState={noteState} noteActions={noteActions}/>
      <InputArea editorState={editorState} setEditorState={setEditorState} />
    </StyledApp>
  );
}

export default App;
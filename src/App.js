import styled from 'styled-components'
import { useState } from 'react'
import { useNoteState } from './util/NoteState'

import { InputArea } from './sections/InputArea'
import { NotesMenu } from './sections/NotesMenu'

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  font-family: 'Nunito', sans-serif;
`

function App() {
  const [editorState, setEditorState, noteState, noteActions] = useNoteState()
  const [expandState, setExpandState] = useState(true)

  const handelExpand = () => {
    setExpandState(!expandState)
  }

  return (
    <StyledApp>
      <NotesMenu noteState={noteState} noteActions={noteActions} expandState={expandState} />
      <InputArea editorState={editorState} setEditorState={setEditorState} handelExpand={handelExpand} />
    </StyledApp>
  );
}

export default App;
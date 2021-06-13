import styled from 'styled-components'
import { useState, useEffect } from 'react'
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
  const [screenState , setScreenState] = useState({
    isMobile: false,
    expandMenu: false
  })

  useEffect(() => {

    const updateWindow = () => {
      setScreenState(prevState => ({
        ...prevState,
        isMobile: window.innerWidth < 800
      }))
    }

    window.addEventListener('resize', updateWindow)
    return () => window.removeEventListener('resize', updateWindow)
  }, [])

  const handelExpand = () => {
    setScreenState(prevState => ({
      ...prevState,
      expandMenu: !prevState.expandMenu
    }))
  }

  return (
    <StyledApp>
      <NotesMenu noteState={noteState} noteActions={noteActions} handelExpand={handelExpand} screenState={screenState} />
      <InputArea editorState={editorState} setEditorState={setEditorState} handelExpand={handelExpand} screenState={screenState} />
    </StyledApp>
  );
}

export default App;
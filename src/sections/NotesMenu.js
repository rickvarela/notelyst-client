import styled from 'styled-components'
import { convertToRaw } from 'draft-js'

const StyledNotesMenu = styled.div`
    background-color: #E7EBEE;
    width: ${({screenState}) => (screenState.expandMenu ? 0 : screenState.isMobile ? '100%' : '400px')};
    overflow-x: hidden;
    opacity: ${({screenState}) => (screenState.expandMenu ? 0 : '100%')};
    transition: opacity 700ms;
`

export const NotesMenu = ({ noteState, noteActions, handelExpand, screenState }) => {

    return (
        <StyledNotesMenu screenState={screenState}>
            <NotesMenuHeader noteActions={noteActions} handelExpand={handelExpand} screenState={screenState}/>
            <NotesList noteState={noteState} noteActions={noteActions}/>
        </StyledNotesMenu>
    )
}

const StyledNotesHeader = styled.div`
    background-color: #324A5F;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 5px;
`

const NotesMenuHeader = ({ noteActions, handelExpand, screenState }) => {
    return (
        <StyledNotesHeader>
            <span>Notes List</span>
            <div>
                {screenState.isMobile && <button onClick={handelExpand}>CLOSE MENU</button>}
                <button onClick={noteActions.createNote}>NEW NOTE</button>
            </div>
        </StyledNotesHeader>
    )
}

const NotesList = ({ noteState, noteActions }) => {
    return (
        <div>
            {noteState.map((note, index) =>
                <NoteItem key={note._id} note={note} noteActions={noteActions} index={index} />
            )}
        </div>
    )
}

const StyledNoteItem = styled.div`
    background-color: ${props => props.isCurrent ? '#A1B9CE' : 'none'};
    padding: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
        background-color: ${props => props.isCurrent ? 'none' : '#CED6DF'};
        ;
    }
`

const NoteItem = ({ note, noteActions, index, handelExpand }) => {

    const handelClick = () => {
        noteActions.changeCurrentNote(note._id)
        handelExpand()
    }

    return (
        <StyledNoteItem onClick={handelClick} isCurrent={noteActions.isCurrentNote(note._id)}>
            {'Note #' + (index + 1) + ': ' + convertToRaw(note.editorState.getCurrentContent()).blocks[0].text}
        </StyledNoteItem>
    )
}
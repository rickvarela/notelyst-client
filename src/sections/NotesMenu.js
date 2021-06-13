import styled from 'styled-components'
import { convertToRaw } from 'draft-js'

const StyledNotesMenu = styled.div`
    background-color: #E7EBEE;
    width: ${(props) => (props.expandState ? '400px' : 0)};
    overflow-x: hidden;
    opacity: ${(props) => (props.expandState ? '100%' : '0%')};
    transition: opacity 700ms;
`

export const NotesMenu = ({ noteState, noteActions, expandState }) => {

    return (
        <StyledNotesMenu expandState={expandState}>
            <NotesMenuHeader noteActions={noteActions}/>
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

const NotesMenuHeader = ({ noteActions }) => {
    return (
        <StyledNotesHeader>
            <span>Notes List</span>
            <button onClick={noteActions.createNote}>NEW NOTE</button>
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

const NoteItem = ({ note, noteActions, index }) => {

    const handelClick = () => {
        noteActions.changeCurrentNote(note._id)
    }

    return (
        <StyledNoteItem onClick={handelClick} isCurrent={noteActions.isCurrentNote(note._id)}>
            {'Note #' + (index + 1) + ': ' + convertToRaw(note.editorState.getCurrentContent()).blocks[0].text}
        </StyledNoteItem>
    )
}
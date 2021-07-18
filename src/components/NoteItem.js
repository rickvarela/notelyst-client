import styled from 'styled-components';
import CloseX from '../assets/svg/close-x.svg';
import { Node } from 'slate';

const StyledNoteItem = styled.div`
  background-color: ${(props) => (props.isCurrent ? '#A1B9CE' : 'none')};
  padding: 5px;
  height: 60px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #bbc6d3;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isCurrent ? 'none' : '#CED6DF')};
  }

  img {
    opacity: 0;
    height: 15px;
  }

  &:hover img {
    opacity: 1;
  }
`;

const StyledNoteTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding-left: 5px;
`;

const StyledNoteText = styled.div`
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  margin: auto 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-height: 1.5em;
`;

const StyledIconWrapper = styled.div`
  width: 20px;
`;

export const NoteItem = ({ note, noteActions, handelExpand, screenState }) => {
  let noteContent = note.editorState;

  const getNoteText = () => {
    return noteContent
      .slice(1)
      .filter((n) => Node.string(n) !== '')
      .map((n) => Node.string(n).trim())
      .join(' ');
  };

  const handelClick = () => {
    noteActions.changeCurrentNote(note._id);
    if (screenState.isMobile) {
      handelExpand();
    }
  };

  const handelDelete = () => {
    noteActions.deleteNote(note._id);
  };

  return (
    <StyledNoteItem isCurrent={noteActions.isCurrentNote(note._id)}>
      <StyledIconWrapper>
        <img onClick={handelDelete} src={CloseX} />
      </StyledIconWrapper>
      <StyledNoteTextWrapper onClick={handelClick}>
        <StyledNoteText bold>
          {noteContent.length <= 1 && Node.string(noteContent[0]) === ''
            ? 'New note..'
            : Node.string(noteContent[0])}
        </StyledNoteText>
        {noteContent.length > 1 && (
          <StyledNoteText>{getNoteText()}</StyledNoteText>
        )}
      </StyledNoteTextWrapper>
    </StyledNoteItem>
  );
};

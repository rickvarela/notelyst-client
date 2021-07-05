import styled from 'styled-components';
import { convertToRaw } from 'draft-js';

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

  > button {
    width: 100px;
  }
`;

const StyledNoteTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const StyledNoteText = styled.div`
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  margin: auto 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-height: 1.5em;
`;

export const NoteItem = ({
  note,
  noteActions,
  index,
  handelExpand,
  screenState,
}) => {
  const insertContent = () => {
    let noteContent = convertToRaw(note.editorState.getCurrentContent()).blocks;
    let noteText = '';

    if (noteContent.length <= 1 && noteContent[0].text === '') {
      return <StyledNoteTextWrapper><StyledNoteText bold>New Note...</StyledNoteText></StyledNoteTextWrapper>;
    }
    for (let line of noteContent.slice(1)) {
      noteText += ` ${line.text}`;
      if (noteText.length > 50) break;
    }

    return (
      <StyledNoteTextWrapper>
        <StyledNoteText bold>{noteContent[0].text}</StyledNoteText>
        {noteContent[1] && <StyledNoteText>{noteText}</StyledNoteText>}
      </StyledNoteTextWrapper>
    );
  };

  const handelClick = () => {
    noteActions.changeCurrentNote(note._id);
    if (screenState.isMobile) {
      handelExpand();
    }
  };

  return (
    <StyledNoteItem
      onClick={handelClick}
      isCurrent={noteActions.isCurrentNote(note._id)}
    >
      {insertContent()}
    </StyledNoteItem>
  );
};

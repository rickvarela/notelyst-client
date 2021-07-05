import styled from 'styled-components'
import SiteLogo from '../assets/svg/site-logo.svg';

import { NoteItem } from '../components/NoteItem';

const StyledNotesMenu = styled.div`
  background-color: #e7ebee;
  width: ${({ screenState }) =>
    screenState.expandMenu ? 0 : screenState.isMobile ? '100%' : '400px'};
  overflow-x: hidden;
  opacity: ${({ screenState }) => (screenState.expandMenu ? 0 : '100%')};
  transition: opacity 700ms;
  display: flex;
  flex-direction: column;
`;

export const NotesMenu = ({
  noteState,
  noteActions,
  handelExpand,
  screenState,
}) => {
  return (
    <StyledNotesMenu screenState={screenState}>
      <NotesMenuHeader
        noteActions={noteActions}
        handelExpand={handelExpand}
        screenState={screenState}
      />
      <NotesList
        noteState={noteState}
        handelExpand={handelExpand}
        screenState={screenState}
        noteActions={noteActions}
      />
    </StyledNotesMenu>
  );
};

const StyledNotesHeader = styled.div`
  background-color: #324a5f;
  color: white;
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  text-decoration: none;
  color: black;
  background-color: #ced6df;
  line-height: 35px;
  padding: 0 10px;
  text-align: center;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #bbc6d3;
  }
`;

const StyledSiteLogo = styled.img`
  height: 25px;
  margin: auto 5px;
`;

const NotesMenuHeader = ({ noteActions, handelExpand, screenState }) => {
  return (
    <StyledNotesHeader>
      <StyledSiteLogo src={SiteLogo} />
      <div>
        {screenState.isMobile && (
          <StyledButton onClick={handelExpand}>CLOSE MENU</StyledButton>
        )}
        <StyledButton onClick={noteActions.createNote}>NEW NOTE</StyledButton>
      </div>
    </StyledNotesHeader>
  );
};

const StyledNotesList = styled.div`
  overflow-y: auto;
`;

const NotesList = ({ noteState, noteActions, handelExpand, screenState }) => {
  return (
    <StyledNotesList>
      {noteState.map((note, index) => (
        <NoteItem
          key={note._id}
          note={note}
          noteActions={noteActions}
          handelExpand={handelExpand}
          screenState={screenState}
          index={index}
        />
      ))}
    </StyledNotesList>
  );
};



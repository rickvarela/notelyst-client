import styled from 'styled-components';
import { useAuth } from '../util/AuthContext';
import { Link } from 'react-router-dom';

import { InputAreaEditor } from '../components/InputAreaEditor';

const StyledInputArea = styled.div`
  background-color: none;
  flex: 1;
  display: flex;
  width: ${({ screenState }) =>
    screenState.isMobile && screenState.expandMenu ? '100%' : 0};
  overflow: hidden;
  flex-direction: column;
`;

export const InputArea = ({
  editorState,
  setEditorState,
  handelExpand,
  screenState,
}) => {
  return (
    <>
      <StyledInputArea screenState={screenState}>
        <InputAreaHeader handelExpand={handelExpand} />
        <InputAreaEditor
          editorState={editorState}
          setEditorState={setEditorState}
        />
      </StyledInputArea>
    </>
  );
};

const StyledInputAreaHeader = styled.div`
  background-color: #324a5f;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  background-color: #ced6df;
  line-height: 35px;
  padding: 0 10px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #bbc6d3;
  }
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

const WelcomeText = styled.div`
  margin-right: 10px;
`;

const InputAreaHeader = ({ handelExpand, formActions }) => {
  const { authUser, actions } = useAuth();

  return (
    <StyledInputAreaHeader>
      <StyledButton onClick={handelExpand}>EXPAND MENU</StyledButton>
      <StyledNav>
        {authUser.authUser ? (
          <>
            <WelcomeText>{`Welcome, ${authUser.username}`}</WelcomeText>
            <StyledButton onClick={actions.signOut}>SIGN OUT</StyledButton>
          </>
        ) : (
          <>
            <StyledLink to='/signup' role='button'>
              SIGN UP
            </StyledLink>
            <StyledLink to='/login' role='button'>
              LOGIN
            </StyledLink>
          </>
        )}
      </StyledNav>
    </StyledInputAreaHeader>
  );
};

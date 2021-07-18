import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { NoteLystApp } from './sections/NoteLystApp';
import { SignUp } from './sections/SignUp';
import { Login } from './sections/Login';

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  font-family: 'Nunito', sans-serif;
`;

function App() {
  return (
    <StyledApp>
      <Router>
        <Switch>
          <Route path='/' exact>
            <NoteLystApp />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </StyledApp>
  );
}

export default App;

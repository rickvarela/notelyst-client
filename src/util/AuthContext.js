import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoaded: false,
    authUser: null,
  });

  const checkToken = () => {
    fetch('/api/checktoken')
      .then((res) => res.json())
      .then((data) => {
        setAuthState({
          isLoaded: true,
          ...data
        });
      })
      .catch(() => {
        setAuthState({ isLoaded: true });
      });
  };

  const value = {
    authUser: authState.authUser,
    isLoaded: authState.isLoaded,
    actions: {
      checkToken,
      signUp,
      signOut,
      login,
    },
  };

  function login(user, cb) {
    fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      cb();
    });
  }

  function signUp(user, cb) {
    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      cb();
    });
  }

  function signOut() {
    fetch('/api/delete', {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      setAuthState((prevState) => ({
        ...prevState,
        authUser: null,
      }));
    });
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuth = () => useContext(Context);

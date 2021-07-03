import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
  const [authUser, setAuthUser] = useState({
    isLoaded: false,
    authUser: false,
  });

  const checkToken = () => {
    fetch('/api/checktoken')
      .then((res) => res.json())
      .then((data) => {
        setAuthUser({
          isLoaded: true,
          ...data,
        });
      })
      .catch(() => {
        setAuthUser({ isLoaded: true });
      });
  };

  const value = {
    authUser,
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
      setAuthUser((prevState) => ({
        ...prevState,
        authUser: null,
      }));
    });
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuth = () => useContext(Context);

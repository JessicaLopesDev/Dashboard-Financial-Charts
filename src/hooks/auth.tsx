import React, { useContext, useState, createContext } from 'react';

interface IAuthContext {
  logged: boolean;
  signIn(email:string, password: string): void;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem('@dashboard:logged');

    return !!isLogged;
  });

  const signIn = (email: string, password: string) => {
    if(email === 'jessica@email.com' && password === '123') {
      localStorage.setItem('@dashboard:logged', 'true');
      setLogged(true);
    } else {
      alert('Senha ou usuário invalidos!')
    }
  }

  const signOut = () => {
      localStorage.removeItem('@dashboard:logged');
      setLogged(false);
  }

  return (
    <AuthContext.Provider value={{logged, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }
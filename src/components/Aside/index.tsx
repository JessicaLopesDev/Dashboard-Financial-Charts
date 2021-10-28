import React, { useState } from 'react';
import logoImg from '../../assets/logo.svg';
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
  MdClose,
  MdMenu
} from 'react-icons/md';

import * as S from './styles';
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';
import Toggle from '../Toggle';

const Aside: React.FC = () => {
  const { signOut } = useAuth();
  const { toggleTheme, theme } = useTheme();

  const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() => 
  theme.title === 'dark' ? true : false);


  const handleToggleMenu = () => {
    setToggleMenuIsOpened(!toggleMenuIsOpened);
  }

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme()
  }

  return (
    <S.Container menuIsOpen={toggleMenuIsOpened}>
      <S.Header>
        <S.ToggleMenu onClick={handleToggleMenu}>
          { toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
        </S.ToggleMenu>

        <S.LogoImg src={logoImg} alt="Logo Minha Carteira" />
        <S.Title>Minha Carteira</S.Title>
      </S.Header>

      <S.MenuContainer>
        <S.MenuItemLink href="/">
          <MdDashboard />
          Dashboard
        </S.MenuItemLink>

        <S.MenuItemLink href="/list/entry-balance">
          <MdArrowUpward />
          Entradas
        </S.MenuItemLink>

        <S.MenuItemLink href="/list/exit-balance">
          <MdArrowDownward />
          Saídas
        </S.MenuItemLink>

        <S.MenuItemButton onClick={() => signOut()}>
          <MdExitToApp />
          Sair
        </S.MenuItemButton>
      </S.MenuContainer>
      <S.ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
        <Toggle 
          leftLabel="Light"
          rightLabel="Dark"
          checked={darkTheme}
          onChange={handleChangeTheme}
        />
      </S.ThemeToggleFooter>
    </S.Container>
  )
}

export default Aside;
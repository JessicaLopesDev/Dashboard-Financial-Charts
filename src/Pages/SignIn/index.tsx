import React, { useState } from 'react';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import * as S from './styles';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { signIn } = useAuth();


  return (
    <S.Container>
      <S.Logo>
        <img src={logoImg} alt="Minha Carteira" ></img>
        <h2>Minha Carteira</h2>
      </S.Logo>

      <S.Form onSubmit={() => signIn(email, password)}>
        <S.FormTitle>Entrar</S.FormTitle>
        <Input 
          type="email"
          required
          placeholder="e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
          type="password"
          required
          placeholder="senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">
          Acessar
        </Button>

      </S.Form>
    </S.Container>
  )
}

export default SignIn;
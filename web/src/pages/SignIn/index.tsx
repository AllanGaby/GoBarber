import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import logo from '../../assets/logo.svg';
import { Container, Content, Backgroud } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  const handleSubmit = (data: object): void => {
    console.log(data);
  };

  return (
    <Container>
      <Content>
        <img src={logo} alt="Go Barber" />
        <Form onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Backgroud />
    </Container>
  );
};

export default SignIn;

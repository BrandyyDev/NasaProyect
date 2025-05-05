import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, DivContainerLabels, Form, Input, Label, RegisterButton, Title } from './authPageStyled';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/features/auth/authActions';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSuccess = () => {
    navigate('/nasa'); 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password, handleSuccess)); 
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Container>
      <Card>
        <Title>Iniciar Sesión</Title>
        <Form onSubmit={handleSubmit}>
          <DivContainerLabels>
            <Label htmlFor="email">Correo Electrónico:</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </DivContainerLabels>
          <DivContainerLabels>
            <Label htmlFor="password">Contraseña:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </DivContainerLabels>
          <Button type="submit">Entrar</Button>
        </Form>
        <RegisterButton onClick={handleRegister}>Registrarse</RegisterButton>
      </Card>
    </Container>
  );
};

export default AuthPage;
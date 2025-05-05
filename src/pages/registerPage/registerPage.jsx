import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, LinkButton, Title, Card } from './registerPageStyled';
import { registerUser } from '../../redux/features/auth/authActions';
import { useDispatch } from 'react-redux';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    dispatch(registerUser(email, password));
    navigate('/login');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Card>
        <Title>Registro</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Correo Electrónico:</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Contraseña:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirmar Contraseña:</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit">Registrarse</Button>
          <LinkButton type="button" onClick={handleGoToLogin}>
            ¿Ya tienes una cuenta? Inicia sesión
          </LinkButton>
        </Form>
      </Card>
    </Container>
  );
};

export default RegisterPage;
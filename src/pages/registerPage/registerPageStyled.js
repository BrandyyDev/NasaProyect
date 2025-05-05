import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const Card = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  display: block;
  color: #555;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 0.8rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const LinkButton = styled.button`
  margin-top: 1rem;
  background: none;
  border: none;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

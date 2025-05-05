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
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: Arial, sans-serif;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
`;

export const Button = styled.button`
  padding: 0.7rem;
  background-color: #0078d4;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #005a9e;
  }
`;

export const RegisterButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
  background-color: #28a745;
  &:hover {
    background-color: #1e7e34;
  }
`;

export const DivContainerLabels = styled.div`
display: flex;
flex-direction: column;
gap: 2px;
`;

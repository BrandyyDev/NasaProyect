import styled from "styled-components";


export const CardWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin: 1rem;
  padding: 1rem;
  max-width: 438px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 0.5rem 0;
`;

export const DateText = styled.p`
  color: #777;
  margin: 0 0 1rem 0;
  font-style: italic;
`;

export const Explanation = styled.p`
  margin-top: 1rem;
  line-height: 1.6;
  color: #555;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

export const Video = styled.iframe`
  width: 100%;
  height: 350px;
  border: none;
  border-radius: 8px;
`;
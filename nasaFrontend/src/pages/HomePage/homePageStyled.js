import styled from 'styled-components';

export const HomePageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  color: #333;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  .search-mode-toggle {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;

    button {
      background-color: #0077cc;
      color: #fff;
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.3s;

      &.active, &:hover {
        background-color: #005fa3;
        transform: scale(1.05);
      }
    }
  }

  .single-search, .range-search {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;

    input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      width: 200px;
    }
  }

  > button {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: #218838;
      transform: scale(1.02);
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      transform: none;
    }
  }
`;

export const APODCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 1rem 0;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-top: 0;
    font-size: 1.75rem;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1rem;
  }

  img, iframe {
    max-width: 100%;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    display: flex;
    align-items: flex-start;

    img, iframe {
      flex: 1;
      margin-right: 1rem;
    }

    div {
      flex: 2;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 1.2rem;
`;
import styled from 'styled-components';


export const HomePageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  color: #333;

  h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  h2 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
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
    margin-bottom: 1rem;

    button {
      background-color: #0077cc;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
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

  .single-search,
  .range-search {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;

    input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      width: 200px;

      @media (max-width: 480px) {
        width: 100%;
      }
    }
  }

  button {
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





export const ErrorMessage = styled.p`
  color: #d9534f;
  font-weight: bold;
  text-align: center;
  font-size: 1.2rem;
`;

export const CardsContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 1rem;
`;
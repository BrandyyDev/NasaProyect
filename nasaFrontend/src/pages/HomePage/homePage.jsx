import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchAPOD } from '../../redux/features/nasa/nasaActions';
import { useDispatch, useSelector } from 'react-redux';

// Estilos para el contenedor principal
const HomePageContainer = styled.div`
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
`;

// Estilos para la sección de búsqueda
const SearchContainer = styled.div`
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

// Estilos para las tarjetas de APOD
const APODCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    margin: 0.5rem 0;
  }

  img,
  iframe {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    display: flex;
    gap: 1rem;

    img,
    iframe {
      flex: 1;
      max-width: 400px;
    }

    div {
      flex: 2;
    }
  }
`;

// Estilo para mensajes de error
const ErrorMessage = styled.p`
  color: #d9534f;
  font-weight: bold;
  text-align: center;
  font-size: 1.2rem;
`;

const today = new Date().toISOString().split('T')[0];

const HomePage = () => {
  const apodData = useSelector(state => state.nasa.apodData);
  const loading = useSelector(state => state.nasa.loading);
  const error = useSelector(state => state.nasa.error);
  const dispatch = useDispatch();

  const [searchMode, setSearchMode] = useState('single');
  const [singleDate, setSingleDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    dispatch(fetchAPOD());
  }, [dispatch]);

  const handleSearch = () => {
    if (searchMode === 'single') {
      dispatch(fetchAPOD({ date: singleDate }));
    } else {
      dispatch(fetchAPOD({ start_date: startDate, end_date: endDate }));
    }
  };

  return (
    <HomePageContainer>
      <h1>Astronomy Picture of the Day</h1>
      <SearchContainer>
        <div className="search-mode-toggle">
          <button 
            className={searchMode === 'single' ? 'active' : ''}
            onClick={() => setSearchMode('single')}
          >
            Buscar por día
          </button>
          <button 
            className={searchMode === 'range' ? 'active' : ''}
            onClick={() => setSearchMode('range')}
          >
            Buscar por rango
          </button>
        </div>
        {searchMode === 'single' ? (
          <div className="single-search">
            <input
              type="date"
              value={singleDate}
              onChange={(e) => setSingleDate(e.target.value)}
              max={today}
            />
          </div>
        ) : (
          <div className="range-search">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={today}
              placeholder="Fecha inicio"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              max={today}
              placeholder="Fecha fin"
            />
          </div>
        )}
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Cargando...' : 'Buscar'}
        </button>
      </SearchContainer>

      {loading && <p>Cargando la imagen del día...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {apodData && (
        Array.isArray(apodData) ? (
          apodData.map((item) => (
            <APODCard key={item.date}>
              <h2>{item.title}</h2>
              <p>Fecha: {item.date}</p>
              {item.media_type === 'image' ? (
                <img src={item.url} alt={item.title} />
              ) : (
                <iframe title="APOD Video" src={item.url} allowFullScreen></iframe>
              )}
              <p>{item.explanation}</p>
            </APODCard>
          ))
        ) : (
          <APODCard>
            <h2>{apodData.title}</h2>
            <p>Fecha: {apodData.date}</p>
            {apodData.media_type === 'image' ? (
              <img src={apodData.url} alt={apodData.title} />
            ) : (
              <iframe title="APOD Video" src={apodData.url} allowFullScreen></iframe>
            )}
            <p>{apodData.explanation}</p>
          </APODCard>
        )
      )}
    </HomePageContainer>
  );
};

export default HomePage;
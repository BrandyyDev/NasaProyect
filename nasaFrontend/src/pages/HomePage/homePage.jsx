import React, { useState, useEffect } from 'react';
import { fetchAPOD } from '../../redux/features/nasa/nasaActions';
import { useDispatch, useSelector } from 'react-redux';
import { CardsContainer, ErrorMessage, HomePageContainer, SearchContainer } from './homePageStyled';
import { getProtectedUserData, logoutUserAction } from '../../redux/features/auth/authActions';
import APODCard from '../../components/molecules/CardNasa/cardNasa';
import Paginator from '../../components/organisms/paginador/paginador';

const today = new Date().toISOString().split('T')[0];

const HomePage = () => {
  const dispatch = useDispatch();
  const apodData = useSelector(state => state.nasa.apodData);
  const loading = useSelector(state => state.nasa.loading);
  const error = useSelector(state => state.nasa.error);
  const user = useSelector(state => state?.auth?.user);

  const [searchMode, setSearchMode] = useState('single');
  const [singleDate, setSingleDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [profile, setProfile] = useState(null);

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

  const handleLogout = () => {
    dispatch(logoutUserAction());
  };

  const handleGetProfile = async () => {
    const data = await dispatch(getProtectedUserData());

    setProfile(data);
  };

  return (
    <HomePageContainer>
      <h1>Astronomy Picture of the Day</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
        <h2>¡Bienvenido: {user?.email}!</h2>

        <button onClick={handleLogout}>Cerrar Sesión</button>

        <button onClick={handleGetProfile}>Obtener Perfil</button>
      </div>
      {profile && (
        <div className="profile-data">
          <h3>Perfil de Usuario</h3>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )}
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
          apodData.length > 10 ? (
            <Paginator 
              items={apodData} 
              renderItem={(item) => <APODCard key={item.date} item={item} />} 
              itemsPerPage={10} 
            />
          ) : (
            <CardsContainer>
              {apodData.map((item) => (
                <APODCard key={item.date} item={item} />
              ))}
            </CardsContainer>
          )
        ) : (
          <CardsContainer>
            <APODCard item={apodData} />
          </CardsContainer>
        )
      )}
    </HomePageContainer>
  );
};

export default HomePage;
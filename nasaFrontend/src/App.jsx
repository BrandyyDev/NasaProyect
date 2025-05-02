import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import HomePage from './pages/HomePage/homePage';
import AuthPage from './pages/authPage/authPage';
import RegisterPage from './pages/registerPage/registerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/nasa" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
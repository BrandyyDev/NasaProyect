import config from '../../../config/config';
import { apiCall } from '../../../utils/axios';

export const REGISTER_REQUEST = 'AUTH/REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'AUTH/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'AUTH/REGISTER_FAILURE';

export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'AUTH/LOGIN_FAILURE';

export const LOGOUT = 'AUTH/LOGOUT';
export const SET_USER = 'AUTH/SET_USER';
export const CLEAR_ERROR = 'AUTH/CLEAR_ERROR';

// Creadores de acciones síncronas
export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (message) => ({
  type: REGISTER_SUCCESS,
  payload: message,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const registerUser = (email, password) => {
  return async (dispatch) => {

    const jsonData = {
      email: email,
      password: password,
    };

    dispatch(registerRequest());
    try {
      const response = await apiCall(
        `${config.apiBaseUrl}${config.endpoints.auth.register}`,
        jsonData,
        "POST",
        false,
        false
      );

      if (response.status !== 200) {
        alert(response.data.message || 'Error en el registro.');
        throw new Error(response.data.message || 'Error en el registro.');
      }

      dispatch(registerSuccess(response.data.message || 'Registro exitoso.'));
      alert(response.data.message || '¡Registro exitoso! Ahora puedes iniciar sesión.');
  
    } catch (error) {
      dispatch(registerFailure(error.message || 'Error en el registro.'));
      alert(error.message || 'Error en el registro.');
    }
  };
};

export const loginUser = (email, password, done) => {
  return async (dispatch) => {
    const jsonData = {
      email,
      password,
    };
    console.log(jsonData)
    
    dispatch(loginRequest());
    try {
      const response = await apiCall(
        `${config.apiBaseUrl}${config.endpoints.auth.login}`,
        jsonData,
        "POST",
        false,
        false
      );

      if (response.status !== 200) {
        alert(response.data.message || 'Error en el inicio de sesión.');
        throw new Error(response.data.message || 'Error en el inicio de sesión.');
      }
      const data = response.data;
      dispatch(loginSuccess(data.user, data.token));
      done();
      localStorage.setItem('token', data.token);
    } catch (error) {
      alert('Error en el inicio de sesión.');
      dispatch(loginFailure(error.message || 'Error en el inicio de sesión.'));
    }
  };
};


export const logoutUserAction = () => {
  return async (dispatch) => {
    try {
      const response = await apiCall(
        `${config.apiBaseUrl}${config.endpoints.auth.logout}`, 
        {}, 
        "POST", 
        false, 
        false
      );
      if (response.status !== 200) {
        alert(response.data.message || 'Error en el cierre de sesión.');
        throw new Error(response.data.message || 'Error en el cierre de sesión.');
      }
      localStorage.removeItem('token');
      dispatch(logout());
    } catch (error) {
      alert(error.message || 'Error en el cierre de sesión.');
    }
  };
};


export const getProtectedUserData = () => {
  return async (dispatch, getState) => {

    try {
      const response = await apiCall(
        `${config.apiBaseUrl}${config.endpoints.auth.protected}`, 
        {}, 
        "GET", 
        true,  
        false
      );
      if (response.status !== 200) {
        alert(response.data.message || 'Error al obtener datos protegidos.');
        throw new Error(response.data.message || 'Error al obtener datos protegidos.');
      }
      return response.data;
    } catch (error) {
      alert(error.message || 'Error al obtener datos protegidos.');
    }
  };
};
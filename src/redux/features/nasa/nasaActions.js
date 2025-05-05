import config from '../../../config/config';
import { apiCall } from '../../../utils/axios';

export const FETCH_APOD_REQUEST = 'NASA/OBTENER_APOD_REQUEST';
export const FETCH_APOD_SUCCESS = 'NASA/OBTENER_APOD_SUCCESS';
export const FETCH_APOD_FAILURE = 'NASA/OBTENER_APOD_FAILURE';

export const fetchApodRequest = () => ({
  type: FETCH_APOD_REQUEST,
});

export const fetchApodSuccess = (data) => ({
  type: FETCH_APOD_SUCCESS,
  payload: data,
});

export const fetchApodFailure = (error) => ({
  type: FETCH_APOD_FAILURE,
  payload: error,
});

export const fetchAPOD = (params) => {
  return async (dispatch) => {
    dispatch(fetchApodRequest());
    try {
      let query = '';
      if (params) {
        if (params.start_date && params.end_date) {
          query = `?start_date=${params.start_date}&end_date=${params.end_date}`;
        } else if (params.date) {
          query = `?date=${params.date}`;
        }
      }
      const url = `${config.apiBaseUrl}${config.endpoints.nasa.apod}${query}`;
      const response = await apiCall(url, null, "GET", true);
      dispatch(fetchApodSuccess(response.data));
    } catch (error) {
      dispatch(fetchApodFailure('Error al obtener datos del APOD.'));
    }
  };
};
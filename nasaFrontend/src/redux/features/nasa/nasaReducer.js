import { FETCH_APOD_REQUEST, FETCH_APOD_SUCCESS, FETCH_APOD_FAILURE } from './nasaActions';

const initialState = {
  apodData: null,
  loading: false,
  error: null,
};

const nasaReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APOD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_APOD_SUCCESS:
      return {
        ...state,
        loading: false,
        apodData: action.payload,
      };
    case FETCH_APOD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        apodData: null,
      };
    default:
      return state;
  }
};

export default nasaReducer;
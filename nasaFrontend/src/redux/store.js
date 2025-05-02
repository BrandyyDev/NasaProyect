import {applyMiddleware, legacy_createStore as createStore, compose} from "redux";
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middlewares = [thunk];

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))
const persistor = persistStore(store)

export { persistor, store };

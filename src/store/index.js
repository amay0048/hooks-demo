import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducerManager from './rest-helpers/reducerManager';
import callAPIMiddleware from './rest-helpers/callAPIMiddleware';

export function configureStore(initialState) {

    // Create a store with the root reducer function being the one exposed by the manager.
    const store = createStore(
        reducerManager.reduce,
        initialState,
        compose(
            applyMiddleware(callAPIMiddleware),
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        )
    )

    // Optional: Put the reducer manager on the store so it is easily accessible
    store.reducerManager = reducerManager
    return store
}

export default configureStore({});
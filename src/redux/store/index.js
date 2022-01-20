import reducers from '../reducers';
import { createStore,applyMiddleware, compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';

export default function initStore() {
    const store = createStore(
        reducers,
        // composeWithDevTools(
        //     applyMiddleware(thunk, logger), // async await using? react => chunk .. but rn?
        // )
    );
    return store;
}

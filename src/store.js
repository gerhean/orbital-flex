// remember when I said this is just a standard store
// this one is a little more advanced to show you
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import thunk from 'redux-thunk'
// import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'
// this pulls in your combinedReducers
// nav_reducer is one of them
import reducers, { initialState } from './reducers'
import mainSaga from './sagas'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(sagaMiddleware)
    // autoRehydrate()
    // compose(
    //     applyMiddleware(thunk),
    // )
)

// persistStore(store, { storage: AsyncStorage, whitelist: [] })
sagaMiddleware.run(mainSaga)

// this exports it for App.js    
export default store
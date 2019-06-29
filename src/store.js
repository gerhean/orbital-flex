// remember when I said this is just a standard store
// this one is a little more advanced to show you
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// this pulls in your combinedReducers
// nav_reducer is one of them
import reducers, { initialState } from "./reducers";
import mainSaga from "./sagas";

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
 blacklist: ['screen', 'userProfileToView', 'schedules']
};

const pReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  pReducer,
  initialState,
  applyMiddleware(sagaMiddleware)
  // autoRehydrate()
  // compose(
  //     applyMiddleware(thunk),
  // )
);

// persistStore(store, { storage: AsyncStorage, whitelist: [] })
sagaMiddleware.run(mainSaga);

// this exports it for App.js
export default store;
export const persistor = persistStore(store);

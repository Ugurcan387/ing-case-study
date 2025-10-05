import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore, persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { LanguageReducer } from "./states/language-store";
import { UserReducer } from "./states/user-store";


const rootReducer = combineReducers({
    LanguageReducer,
    UserReducer
});

const persistConfig = {
  key: 'app',
  version: 1,
  storage,
  whitelist: ['UserReducer', 'LanguageReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,middleware: (gDM) => {
    return gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  }
    
});

export const state = persistStore(store).getState();
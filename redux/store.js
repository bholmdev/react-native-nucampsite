import { configureStore } from '@reduxjs/toolkit';
import { campsitesReducer } from "../features/campsites/campsitesSlice";
import { commentsReducer } from "../features/comments/commentsSlice";
import { partnersReducer } from "../features/partners/partnersSlice";
import { promotionsReducer } from "../features/promotions/promotionsSlice";
import { favoritesReducer } from '../features/favorites/favoritesSlice';
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
    key: "root",
    storage: AsyncStorage,
    debug: true
};

export const store = configureStore({
    reducer: persistCombineReducers(config, {
        campsites: campsitesReducer,
        comments: commentsReducer,
        favorites: favoritesReducer,
        partners: partnersReducer,
        promotions: promotionsReducer
    }),
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        })
});

export const persistor = persistStore(store);
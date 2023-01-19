import { configureStore } from '@reduxjs/toolkit';
import { campsitesReducer } from "../features/campsites/campsitesSlice";
import { commentsReducer } from "../features/comments/commentsSlice";
import { partnersReducer } from "../features/partners/partnersSlice";
import { promotionsReducer } from "../features/promotions/promotionsSlice";
import { favoritesReducer } from '../features/favorites/favoritesSlice';

export const store = configureStore({
    reducer: {
        campsites: campsitesReducer,
        comments: commentsReducer,
        favorites: favoritesReducer,
        partners: partnersReducer,
        promotions: promotionsReducer
    }
});
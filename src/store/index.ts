import { configureStore } from '@reduxjs/toolkit';
import filters from './features/filters';
import jobs from './features/jobs';

export const store = configureStore({
  reducer: {
    jobs,
    filters,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

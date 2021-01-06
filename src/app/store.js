import { configureStore } from '@reduxjs/toolkit';
import chessSlice from '../features/chess/chessSlice';

export default configureStore({
  reducer: {
    state: chessSlice,
  },
});

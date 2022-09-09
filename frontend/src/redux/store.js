import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";

export default configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

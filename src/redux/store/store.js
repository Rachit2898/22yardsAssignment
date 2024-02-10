import { configureStore } from "@reduxjs/toolkit";

import empSlice from "../features/employees";

export default configureStore({
  reducer: {
    employees: empSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

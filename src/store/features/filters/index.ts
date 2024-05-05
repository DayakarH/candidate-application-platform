import type { Filters } from '@lib/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Filters = {
  minExp: null,
  companyName: '',
  location: '',
  roles: [],
  minBasePay: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    applyFilters: (state, action) => {},
  },
});

export const { applyFilters } = filtersSlice.actions;

export default filtersSlice.reducer;

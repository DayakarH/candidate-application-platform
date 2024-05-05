import type { Filters } from '@lib/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: Filters = {
  minExp: null,
  companyName: '',
  location: [],
  roles: [],
  minBasePay: null,
};

type FilterPayload = Partial<Filters>;

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    applyFilters: (state, action: PayloadAction<FilterPayload>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { applyFilters } = filtersSlice.actions;

export default filtersSlice.reducer;

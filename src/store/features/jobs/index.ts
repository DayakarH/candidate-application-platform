import type { JobDetails, JobsAPIResponse } from '@lib/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type JobsList = {
  jobsList: Array<JobDetails>;
  totalCount: number;
  numOfLoadedJobs: number;
  filters: {
    minExp: number;
    companyName: string;
    location: string;
    employmentType: string;
    role: string;
    minBasePay: number;
  };
  isLoading: boolean;
  error: string | null;
};
const initialState: JobsList = {
  jobsList: [],
  totalCount: 0,
  numOfLoadedJobs: 0,
  filters: {
    minExp: 0,
    companyName: '',
    location: '',
    employmentType: '',
    role: '',
    minBasePay: 0,
  },
  isLoading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    fetchJobsRequest: state => {
      state.isLoading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action: PayloadAction<JobsAPIResponse>) => {
      state.jobsList = action.payload.jdList;
      state.totalCount = action.payload.totalCount;
      state.numOfLoadedJobs = action.payload.jdList.length;
      state.isLoading = false;
      state.error = null;
    },
    fetchJobsFailure: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export const { fetchJobsRequest, fetchJobsSuccess, fetchJobsFailure } =
  jobsSlice.actions;

export default jobsSlice.reducer;

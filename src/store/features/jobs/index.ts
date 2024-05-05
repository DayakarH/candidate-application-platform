import type { JobDetails, JobsAPIResponse } from '@lib/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type JobsList = {
  jobsList: Array<JobDetails>;
  totalCount: number;
  numOfLoadedJobs: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: JobsList = {
  jobsList: [],
  totalCount: 0,
  numOfLoadedJobs: 0,
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
    fetchMoreJobs: (state, action: PayloadAction<JobsAPIResponse>) => {
      state.jobsList = [...state.jobsList, ...action.payload.jdList];
      state.totalCount = action.payload.totalCount;
      state.numOfLoadedJobs += action.payload.jdList.length;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchJobsRequest,
  fetchJobsSuccess,
  fetchJobsFailure,
  fetchMoreJobs,
} = jobsSlice.actions;

export default jobsSlice.reducer;

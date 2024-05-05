import Header from '@components/layout/header';
import { useEffect } from 'react';
import JobCard from './components/job-card';
import JobsContainer from './components/jobs-grid';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchJobsFromAPI } from './lib/utils';
import {
  fetchJobsFailure,
  fetchJobsRequest,
  fetchJobsSuccess,
} from './store/features/jobs';

export default function App() {
  const dispatch = useAppDispatch();
  const { jobsList, isLoading } = useAppSelector(state => state.jobs);
  useEffect(() => {
    dispatch(fetchJobsRequest());
    fetchJobsFromAPI()
      .then(response => {
        dispatch(fetchJobsSuccess(response));
      })
      .catch(error => {
        dispatch(fetchJobsFailure(error));
      });
  }, [dispatch]);

  return (
    <>
      <Header />
      <JobsContainer>
        {!isLoading &&
          jobsList.map(job => <JobCard jobDetails={job} key={job.jdUid} />)}
      </JobsContainer>
    </>
  );
}

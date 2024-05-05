import Header from '@components/layout/header';
import { useEffect, useState, type RefObject } from 'react';
import JobCard from './components/job-card';
import JobsContainer from './components/jobs-grid';
import { useAppDispatch, useAppSelector } from './hooks';
import { useIntersectionObserver } from './hooks/use-intersection-observer';
import { fetchJobsFromAPI } from './lib/utils';
import {
  fetchJobsFailure,
  fetchJobsRequest,
  fetchJobsSuccess,
  fetchMoreJobs,
} from './store/features/jobs';

export default function App() {
  const dispatch = useAppDispatch();
  const { jobsList, isLoading, numOfLoadedJobs } = useAppSelector(
    state => state.jobs
  );
  const { customRef, entry } = useIntersectionObserver({ threshold: 0.8 });
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      dispatch(fetchJobsRequest());
      fetchJobsFromAPI(numOfLoadedJobs)
        .then(response => {
          dispatch(fetchMoreJobs(response));
        })
        .catch(error => {
          dispatch(fetchJobsFailure(error));
        });
      window.scrollTo(0, scrollPosition);
    }
  }, [entry, dispatch]);
  return (
    <>
      <Header />
      <JobsContainer>
        {!isLoading &&
          jobsList.map((job, idx) => {
            if (idx === jobsList.length - 1) {
              return (
                <JobCard
                  jobDetails={job}
                  key={job.jdUid}
                  ref={customRef as unknown as RefObject<HTMLDivElement>}
                />
              );
            }
            return <JobCard jobDetails={job} key={job.jdUid} />;
          })}
      </JobsContainer>
    </>
  );
}

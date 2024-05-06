import JobsContainer from '@components/features/jobs-catalog';
import EndOfResults from '@components/features/jobs-catalog/end-of-results';
import Filters from '@components/features/jobs-catalog/filters';
import JobCard from '@components/features/jobs-catalog/job-card';
import { JobCardSkeletons } from '@components/features/jobs-catalog/loading-skeletons';
import Footer from '@components/layout/footer';
import Header from '@components/layout/header';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  fetchJobsFailure,
  fetchJobsRequest,
  fetchJobsSuccess,
  fetchMoreJobs,
} from '@store/features/jobs';
import { useEffect, useMemo, useState, type RefObject } from 'react';
import { useIntersectionObserver } from './hooks/use-intersection-observer';
import { fetchJobsFromAPI } from './lib/utils';

const StyledApp = styled.div`
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
`;

export default function App() {
  const dispatch = useAppDispatch();
  const { jobsList, isLoading, numOfLoadedJobs, totalCount, error } =
    useAppSelector(state => state.jobs);
  const { companyName, location, minBasePay, minExp, roles, remoteOrOnSite } =
    useAppSelector(state => state.filters);
  const [dynamicFilters, setDynamicFilters] = useState<
    Record<'location' | 'role', Array<string>>
  >({
    location: [],
    role: [],
  });
  const [filteredJobs, setFilteredJobs] = useState(jobsList);
  const { customRef, entry } = useIntersectionObserver({ threshold: 0.8 });

  const FETCHED_ALL_JOBS = useMemo(
    () => numOfLoadedJobs === totalCount,
    [numOfLoadedJobs, totalCount]
  );

  useEffect(() => {
    setFilteredJobs(jobsList);
    setDynamicFilters({
      location: Array.from(
        new Set(jobsList.map(job => job.location.toLowerCase()))
      ).filter(location => location !== 'remote'),
      role: Array.from(new Set(jobsList.map(job => job.jobRole))),
    });
  }, [jobsList]);
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
    if (entry && entry.isIntersecting && !FETCHED_ALL_JOBS) {
      dispatch(fetchJobsRequest());
      fetchJobsFromAPI(numOfLoadedJobs)
        .then(response => {
          dispatch(fetchMoreJobs(response));
        })
        .catch(error => {
          dispatch(fetchJobsFailure(error));
        });
    }
  }, [entry, dispatch]);

  useEffect(() => {
    let jobs = [...jobsList];
    if (companyName) {
      jobs = jobs.filter(job =>
        job.companyName.toLowerCase().includes(companyName.toLowerCase())
      );
    }
    if (!!remoteOrOnSite) {
      if (remoteOrOnSite === 'remote') {
        jobs = jobs.filter(job => job.location.toLowerCase() === 'remote');
      } else {
        jobs = jobs.filter(job => job.location.toLowerCase() !== 'remote');
      }
    }
    if (location.length > 0) {
      jobs = jobs.filter(job => location.includes(job.location.toLowerCase()));
    }
    if (roles.length > 0) {
      jobs = jobs.filter(job => roles.includes(job.jobRole));
    }
    if (minExp) {
      jobs = jobs.filter(job => job.minExp >= minExp);
    }
    if (minBasePay) {
      jobs = jobs.filter(job => job.minJdSalary >= minBasePay);
    }
    setFilteredJobs(jobs);
  }, [
    companyName,
    location,
    minBasePay,
    minExp,
    roles,
    remoteOrOnSite,
    jobsList,
  ]);
  return (
    <StyledApp>
      <Header />
      <main>
        <Filters dynamicFilters={dynamicFilters} />
        <JobsContainer>
          {error ? (
            <Box sx={{ gridColumn: '1/-1', placeSelf: 'center' }}>
              <Typography
                component={'p'}
                fontWeight={500}
                color={'error'}
                fontSize={'1.5rem'}
              >
                {error}
              </Typography>
            </Box>
          ) : null}
          {/* loading skeletons for initial load */}
          {isLoading && numOfLoadedJobs === 0 ? <JobCardSkeletons /> : null}
          {!error &&
            filteredJobs.length > 0 &&
            filteredJobs.map((job, idx) => {
              if (idx === filteredJobs.length - 1) {
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
          {/* loading skeletons for loading jobs through infinite scroll */}
          {isLoading ? <JobCardSkeletons /> : null}
        </JobsContainer>
        {!error && FETCHED_ALL_JOBS ? <EndOfResults /> : null}
      </main>
      <Footer />
    </StyledApp>
  );
}

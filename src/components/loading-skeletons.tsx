import Skeleton from '@mui/material/Skeleton';

export const JobCardSkeleton = () => {
  return (
    <Skeleton
      variant='rectangular'
      sx={{ borderRadius: '1rem', height: '100%' }}
      component={'div'}
    />
  );
};

export const JobCardSkeletons = () => {
  return (
    <>
      {Array(3)
        .fill('skeleton')
        .map((_, idx) => (
          <JobCardSkeleton key={idx} />
        ))}
    </>
  );
};

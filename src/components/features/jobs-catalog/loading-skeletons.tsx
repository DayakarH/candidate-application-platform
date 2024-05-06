import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const JobCardSkeleton = () => {
  return (
    <Card sx={{ borderRadius: '1rem' }}>
      <Stack spacing={4}>
        <CardHeader
          avatar={<Skeleton variant='circular' width={40} height={40} />}
          title={
            <Skeleton
              variant='text'
              sx={{ fontSize: '1rem' }}
              animation='wave'
            />
          }
          subheader={
            <Skeleton
              variant='text'
              sx={{ fontSize: '.75rem' }}
              animation='wave'
            />
          }
          className={'capitalize'}
        />
        <CardContent sx={{ paddingBlock: 0 }}>
          <Stack direction='column' spacing={2}>
            <Skeleton
              variant='rounded'
              width={'100%'}
              height={200}
              component={'div'}
            />
            <Stack direction='column' sx={{ flex: 1 }} spacing={1}>
              <Skeleton
                variant='rounded'
                width={'100%'}
                height={40}
                animation='wave'
              />
              <Skeleton
                variant='rounded'
                width={'100%'}
                height={40}
                animation='wave'
              />
            </Stack>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
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

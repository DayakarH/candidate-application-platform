import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { forwardRef } from 'react';
import type { JobDetails } from '../lib/types';

type JobCardProps = { jobDetails: JobDetails };

const JobCard = forwardRef<HTMLDivElement, JobCardProps>(
  ({ jobDetails }, ref) => {
    return (
      <Card sx={{ borderRadius: '1rem' }} ref={ref} component={"article"}>
        <CardContent>
          <Chip variant='outlined' label='Posted 3 days ago' />
          <Typography>{jobDetails.companyName}</Typography>
          <Typography variant='body1'>
            {jobDetails.jobDetailsFromCompany}
          </Typography>
          <CardActions>
            <Stack spacing={2}>
              <Button variant='contained'>Easy Apply</Button>
              <Button variant='contained'>Unlock Referral Asks</Button>
            </Stack>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
);

export default JobCard;

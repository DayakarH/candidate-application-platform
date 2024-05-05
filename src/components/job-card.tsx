import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { forwardRef, useState } from 'react';
import type { JobDetails } from '../lib/types';
import styles from './job-card.module.css';
import JobDialog from './job-dialog';

type JobCardProps = { jobDetails: JobDetails };

const JobCard = forwardRef<HTMLDivElement, JobCardProps>(
  ({ jobDetails }, ref) => {
  const [open, setOpen] = useState<boolean>(false);

    return (
      <>
        <JobDialog open={open} setOpen={setOpen} jobDetails={jobDetails} />
        <Card sx={{ borderRadius: '1rem' }} ref={ref} component={'article'}>
          <CardHeader
            avatar={
              <Avatar aria-label='logo' src={jobDetails.logoUrl}>
                {jobDetails.companyName.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={
              <Typography color='text.secondary' className='capitalize'>
                {jobDetails.companyName}
              </Typography>
            }
            subheader={
              <>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  className='capitalize'
                >
                  {jobDetails.jobRole}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  className='location '
                >
                  {jobDetails.location}
                </Typography>
              </>
            }
            className={'capitalize'}
          />
          <CardContent sx={{ justifyContent: 'flex-start', textAlign: 'left' }}>
            <Typography variant='body2' className={styles.salaryRange}>
              Estimated Salary: {jobDetails?.minJdSalary ?? 0}-
              {jobDetails?.maxJdSalary ?? 'N/A'} ✅
            </Typography>
            <div className={styles.description}>
              <Typography variant='body2'>
                {jobDetails?.jobDetailsFromCompany}
              </Typography>
            </div>
            <div className={`${styles.viewMore}`}>
              <Button className='capitalize' onClick={() => setOpen(true)}>
                View Job
              </Button>
            </div>
            <div style={{ marginBottom: 10 }}>
              <Typography
                variant='body2'
                className={`${styles.infoContainer} ${styles.jobRequirement}`}
                color='text.secondary'
                component={'span'}
              >
                Minimum Experience:
              </Typography>
              <Typography variant='body1'>
                {jobDetails?.minExp ?? '0'} years
              </Typography>
            </div>

            <Button
              variant='contained'
              sx={{
                width: '100%',
                backgroundColor: 'rgb(85, 239, 196)',
                color: 'rgb(0, 0, 0)',
                fontWeight: '500',
                padding: '8px 18px',
              }}
              className='capitalize'
            >
              ⚡ Easy Apply
            </Button>
            <Button
              variant='contained'
              sx={{
                marginTop: '8px',
                width: '100%',
                backgroundColor: 'blue',
                color: 'white',
                fontWeight: '500',
                padding: '8px 18px',
              }}
              className='capitalize'
            >
              Unlock Referral Asks
            </Button>
          </CardContent>
        </Card>
      </>
    );
  }
);

export default JobCard;

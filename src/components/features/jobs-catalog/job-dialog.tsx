import type { JobDetails } from '@lib/types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});
type JobDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  jobDetails: JobDetails;
};
export default function JobDialog({
  open,
  setOpen,
  jobDetails,
}: JobDialogProps) {
  return (
    <Dialog
      className='dialog'
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      scroll='paper'
      aria-labelledby='job-description-title'
      aria-describedby='job-description-description'
    >
      <DialogTitle id='job-description-title' className='title'>
        Job Description
      </DialogTitle>
      <DialogContent dividers>
        <div className='line-item'>
          <Typography variant='h5' className='capitalize'>
            Overview
          </Typography>
          <Stack
            direction={'row'}
            divider={<Divider orientation='vertical' flexItem />}
            spacing={2}
            sx={{ marginBlockEnd: '1rem' }}
          >
            <Stack
              direction={'row'}
              spacing={1}
              sx={{ alignItems: 'baseline' }}
            >
              <Typography variant='overline'>Company Name:</Typography>
              <Typography className='capitalize'>
                {jobDetails.companyName}
              </Typography>
            </Stack>

            <Stack
              direction={'row'}
              spacing={1}
              sx={{ alignItems: 'baseline' }}
            >
              <Typography variant='overline'>Location: </Typography>
              <Typography className='capitalize'>
                {jobDetails.location}
              </Typography>
            </Stack>
          </Stack>
        </div>
        <DialogContentText
          id='job-description-description'
          tabIndex={-1}
          className='line-item'
        >
          <Typography variant='h5' sx={{ marginBlockEnd: '0.5rem' }}>
            About Role:
          </Typography>
          <Typography variant='body1'>
            {jobDetails.jobDetailsFromCompany}
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

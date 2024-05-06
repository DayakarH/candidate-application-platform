import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function EndOfResults() {
  return (
    <Stack
      direction={'row'}
      spacing={1}
      className='container'
      sx={{ alignItems: 'center', marginBlock: '1rem' }}
    >
      <Divider
        textAlign='center'
        component={'span'}
        variant='fullWidth'
        sx={{
          flex: 1,
          backgroundColor: 'text.secondary',
          height: 1,
          opacity: 0.6,
        }}
      />
      <Typography component={'span'}>End of Results</Typography>
      <Divider
        textAlign='center'
        component={'span'}
        variant='fullWidth'
        sx={{
          flex: 1,
          backgroundColor: 'text.secondary',
          height: 1,
          opacity: 0.6,
        }}
      />
    </Stack>
  );
}

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

const StyledFooter = styled.footer`
  padding-block: 1rem;
  border-block-start: 1px solid var(--color-subtle-border);

  a {
    color: unset;
    font-weight: 500;
  }
`;
export default function Footer() {
  return (
    <StyledFooter>
      <Stack
        direction={'row-reverse'}
        sx={{ alignItems: 'center' }}
        className='container'
      >
        <p>
          <Typography component={"span"}>
            ©{new Date().getFullYear()}{' '}
            <a href='https://github.com/DayakarH'>Dayakar</a>
          </Typography>
        </p>
      </Stack>
    </StyledFooter>
  );
}

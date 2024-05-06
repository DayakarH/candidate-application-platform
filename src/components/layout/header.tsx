import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

const StyledHeader = styled.header`
  padding-block: 1rem;
  border-block-end: 1px solid var(--color-subtle-border);
  box-shadow: var(--shadow-elevation-low);
  a {
    text-decoration: none;
    color: unset;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <div className='container'>
        <a href='/'><Typography>Candidate Application Platform</Typography></a>
      </div>
    </StyledHeader>
  );
}

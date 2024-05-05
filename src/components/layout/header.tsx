import styled from '@emotion/styled';

const StyledHeader = styled.header`
  padding-block: 1rem;

  a {
    text-decoration: none;
    color: unset;
    font-size:1.5rem;
    font-weight: 500;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <div className='container'>
        <a href='/'>Candidate Application Platform</a>
      </div>
    </StyledHeader>
  );
}

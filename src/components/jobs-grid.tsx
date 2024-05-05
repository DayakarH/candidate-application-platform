import styled from '@emotion/styled';
import type { ReactNode } from 'react';

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
`;

export default function JobsContainer({ children }:{children: ReactNode}) {
  return <JobsGrid className='container'>{children}</JobsGrid>;
}

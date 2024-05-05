import styled from '@emotion/styled';
import type { ReactNode } from 'react';

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-auto-rows: minmax(350px, auto);
  gap: 1rem;
  padding-block: 2rem;
`;

export default function JobsContainer({ children }: { children: ReactNode }) {
  return <JobsGrid className='container'>{children}</JobsGrid>;
}

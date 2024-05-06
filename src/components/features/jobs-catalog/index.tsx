import styled from '@emotion/styled';
import type { ReactNode } from 'react';

const JobsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: minmax(350px, auto);
  gap: 1rem;
  padding-block: 2rem;
  margin-block-end: 2rem;

  &:has(article:hover) article:not(:hover) {
    scale: 0.95;
    opacity: 0.7;
  }
`;

export default function JobsContainer({ children }: { children: ReactNode }) {
  return <JobsGrid className='container'>{children}</JobsGrid>;
}

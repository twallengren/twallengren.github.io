import styled from '@emotion/styled';

const BaseSection = styled.section`
  padding: 20px;
  border-bottom: 1px solid #ddd;

  &:last-of-type {
    border-bottom: none;
  }
`;

export const SectionTitle = styled.h2`
  margin-top: 0;
  font-family: 'Bona Nova SC', serif;
`;

export default BaseSection;

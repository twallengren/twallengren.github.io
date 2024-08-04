import React from 'react';
import styled from '@emotion/styled';

const ProjectContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 20px auto;  /* Center horizontally and add bottom margin */
  text-align: center;
`;

const ProjectImage = styled.img`
  max-width: 90%;
  height: auto;
  margin: 10px 0;
`;

const ProjectTitle = styled.h3`
  margin: 0 auto 20px auto;
  max-width: 90%;
`;

const Description = styled.p`
  margin: 0 auto 20px auto;
  max-width: 90%;
  text-align: left;
`;

const ProjectLink = styled.a`
  color: #293242;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  padding: 10px;
`;

const ProjectDescription = ({ title, description, link, image }) => {
  return (
    <ProjectContainer>
      {image && <ProjectImage src={image} alt={`${title} image`} />}
      <ProjectTitle>{title}</ProjectTitle>
      {link && (
        <ProjectLink href={link} target="_blank" rel="noopener noreferrer">
          Project Link
        </ProjectLink>
      )}
      <Description>{description}</Description>
    </ProjectContainer>
  );
};

export default ProjectDescription;

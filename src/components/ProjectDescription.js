import React from 'react';
import styled from '@emotion/styled';

const ProjectContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 20px auto;  /* Center horizontally and add bottom margin */
  text-align: center;
`;

const ProjectImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 10px 0;
`;

const ProjectTitle = styled.h3`
  margin: 10px 0;
`;

const ProjectLink = styled.a`
  color: #61dafb;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ProjectDescription = ({ title, description, link, image }) => {
  return (
    <ProjectContainer>
      {image && <ProjectImage src={image} alt={`${title} image`} />}
      <ProjectTitle>{title}</ProjectTitle>
      <p>{description}</p>
      {link && (
        <ProjectLink href={link} target="_blank" rel="noopener noreferrer">
          View Project
        </ProjectLink>
      )}
    </ProjectContainer>
  );
};

export default ProjectDescription;

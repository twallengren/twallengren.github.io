import React from 'react';
import BaseSection, {SectionTitle} from './BaseSection';

const Projects = () => {
  return (
    <BaseSection id="projects">
      <SectionTitle>Projects</SectionTitle>
      <ul>
        <li>
          <h3>Project Title 1</h3>
          <p>Brief description of the project. Highlight key features, technologies used, and your role.</p>
          <a href="project-link" target="_blank" rel="noopener noreferrer">View Project</a>
        </li>
        <li>
          <h3>Project Title 2</h3>
          <p>Brief description of the project. Highlight key features, technologies used, and your role.</p>
          <a href="project-link" target="_blank" rel="noopener noreferrer">View Project</a>
        </li>
        {/* Add more projects as needed */}
      </ul>
    </BaseSection>
  );
};

export default Projects;

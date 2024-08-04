import React from 'react';
import BaseSection, { SectionTitle } from './BaseSection';
import ProjectDescription from './ProjectDescription';
import matrixProblemsImage from '../assets/matrix-problems.png';

const Projects = () => {
  return (
    <BaseSection id="projects">
      <SectionTitle>Projects & Publications</SectionTitle>
      <ProjectDescription
        title="Matrix valued inverse problems on graphs with application to elastodynamic networks"
        description={
          <>
            <p>
              This paper addresses the inverse problem of determining matrix-valued edge or nodal quantities in a graph from measurements at boundary nodes, extending the concept of finding resistors in a network using voltage and current measurements.
            </p>
            <p>
              The measurements are derived from solving Dirichlet problems, where vector-valued voltages at interior nodes are found from prescribed boundary node voltages. The paper establishes conditions for unique solutions, examines rank-deficient cases, and demonstrates the analyticity of the parameter-to-data map.
            </p>
            <p>
              Practical implications include iterative methods for numerical solutions and local uniqueness. The results, applicable to elastodynamic networks of springs, masses, and dampers, provide explicit Jacobian formulas using Dirichlet problem solutions.
            </p>
          </>
        }
        link="https://arxiv.org/abs/1806.07046"
        image={matrixProblemsImage}
      />
      {/* Add more ProjectDescription components as needed */}
    </BaseSection>
  );
};

export default Projects;

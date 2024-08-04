import React from 'react';
import BaseSection, {SectionTitle} from './BaseSection';

const Employment = () => {
  return (
    <BaseSection id="employment">
      <SectionTitle>Employment History</SectionTitle>
      <ul>
        <li>
          <h3>Job Title 1</h3>
          <p>Company Name - Dates of Employment</p>
          <p>Brief description of your role and responsibilities.</p>
        </li>
        <li>
          <h3>Job Title 2</h3>
          <p>Company Name - Dates of Employment</p>
          <p>Brief description of your role and responsibilities.</p>
        </li>
        {/* Add more employment history as needed */}
      </ul>
    </BaseSection>
  );
};

export default Employment;

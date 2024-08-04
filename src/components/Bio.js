import React from 'react';
import BaseSection, { SectionTitle } from './BaseSection';
import styled from '@emotion/styled';
import profilePhoto from '../assets/profile-photo.jpg';

const ProfileImage = styled.img`
  max-width: 150px;
  border-radius: 50%;
  margin: 20px 0;
`;

const MaxWidthContainer = styled.div`
  max-width: 600px; /* Adjust this value as needed */
  margin: 0 auto;
  text-align: left;
`;

const Bio = () => {
  return (
    <BaseSection id="bio">
      <SectionTitle>About Me</SectionTitle>
      <ProfileImage src={profilePhoto} alt="Profile" />
      <MaxWidthContainer>
        <p>My name is Toren Wallengren. I currently live in Edinburgh, UK. I am a senior data engineer at a FinTech company called Addepar. In my free time, I enjoy playing ice hockey, making music, and contemplating math and physics.</p>
      </MaxWidthContainer>
    </BaseSection>
  );
};

export default Bio;

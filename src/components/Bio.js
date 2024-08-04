import React from 'react';
import BaseSection, { SectionTitle } from './BaseSection';
import styled from '@emotion/styled';
import profilePhoto from '../assets/profile-photo.jpg';

const ProfileImage = styled.img`
  max-width: 300px;
  border-radius: 20%;
  margin: 20px 0;
`;

const MaxWidthContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  text-align: center;

  li {
    margin-bottom: 10px;
  }
`;

const InfoLabel = styled.span`
  font-weight: bold;
`;

const Bio = () => {
  return (
    <BaseSection id="about">
      <SectionTitle>About Me</SectionTitle>
      <MaxWidthContainer>
        <ProfileImage src={profilePhoto} alt="Profile" />
        <InfoList>
          <li>
            <InfoLabel>Location:</InfoLabel> Edinburgh, United Kingdom
          </li>
          <li>
            <InfoLabel>Role:</InfoLabel> Senior Data Engineer
          </li>
          <li>
            <InfoLabel>Education:</InfoLabel> Mathematics BSc
          </li>
          <li>
            <InfoLabel>Interests & Hobbies:</InfoLabel> Ice hockey, music, math, physics
          </li>
        </InfoList>
      </MaxWidthContainer>
    </BaseSection>
  );
};

export default Bio;

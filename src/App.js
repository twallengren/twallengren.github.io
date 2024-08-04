/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import './App.css';
import AnimatedCanvas from './components/AnimatedCanvas';

const AppHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh; /* Full height of the viewport */
  background-color: #282c34;
  color: white;
  overflow: hidden;
`;

const Navigation = styled.nav`
  z-index: 1; /* Ensure navigation is above the canvas */
  margin-top: 20px;
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  li {
    margin: 0 15px;
  }

  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Section = styled.section`
  padding: 20px;
  border-bottom: 1px solid #ddd;

  &:last-of-type {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h2`
  margin-top: 0;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 10px;
  background-color: #282c34;
  color: white;
`;

function App() {

  return (
    <div className="App">
      <AppHeader>
        <h1 style={{ zIndex: 1 }}>Toren Wallengren</h1>
        <Navigation>
          <ul>
            <li><a href="#bio">Bio</a></li>
            <li><a href="#employment">Employment History</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </Navigation>
        <AnimatedCanvas />
      </AppHeader>
      <main>
        <Section id="bio">
          <SectionTitle>Bio</SectionTitle>
          <p>Write a brief bio about yourself here. Include information about your background, interests, and professional journey.</p>
        </Section>

        <Section id="employment">
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
        </Section>

        <Section id="projects">
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
        </Section>

        <Section id="blog">
          <SectionTitle>Blog</SectionTitle>
          <ul>
            <li>
              <h3>Blog Post Title 1</h3>
              <p>Brief description or excerpt of the blog post.</p>
              <a href="blog-post-link" target="_blank" rel="noopener noreferrer">Read More</a>
            </li>
            <li>
              <h3>Blog Post Title 2</h3>
              <p>Brief description or excerpt of the blog post.</p>
              <a href="blog-post-link" target="_blank" rel="noopener noreferrer">Read More</a>
            </li>
            {/* Add more blog posts as needed */}
          </ul>
        </Section>
      </main>
      <Footer>
        <p>&copy; {new Date().getFullYear()} Toren Wallengren. All rights reserved.</p>
      </Footer>
    </div>
  );
}

export default App;

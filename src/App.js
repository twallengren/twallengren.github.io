/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import './App.css';
import AnimatedCanvas from './components/AnimatedCanvas';
import Bio from './components/Bio';
import Blog from './components/Blog';
import Projects from './components/Projects';

const AppHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #282c34;
  color: white;
  overflow: hidden;
  font-family: 'Bona Nova SC', serif;
  height: 100vh;
`;

const ThumbnailImage = styled.img`
  max-width: 300px; /* Ensures the image scales dynamically */
  height: auto;
  margin: 20px 0;
  z-index: 1; /* Ensure image is above the canvas */
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
        <ThumbnailImage src="/thumbnail.png" />
        <Navigation>
          <ul>
            <li><a href="#about">About Me</a></li>
            <li><a href="#projects">Projects & Publications</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </Navigation>
        <AnimatedCanvas />
      </AppHeader>
      <main>
        <Bio />
        <Projects />
      </main>
      <Footer>
        <p>&copy; {new Date().getFullYear()} Toren Wallengren. All rights reserved.</p>
      </Footer>
    </div>
  );
}

export default App;

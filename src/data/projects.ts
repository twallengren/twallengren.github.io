import type { ImageMetadata } from 'astro';

export interface Project {
  title: string;
  category: string;
  summary: string;
  technologies: string[];
  repositoryUrl: string;
  demo?: { url: string; label: string };
  image?: { src: ImageMetadata; alt: string };
}

export const projects: Project[] = [
  {
    title: 'path-planning-ode',
    category: 'Optimisation · Interactive',
    summary: 'Paint a cost landscape, reshape a route, and watch it find a better way through. An interactive exploration of route optimisation with the mathematics close at hand.',
    technologies: ['Python', 'SciPy', 'TypeScript', 'Pyodide'],
    repositoryUrl: 'https://github.com/twallengren/path-planning-ode',
    demo: { url: 'https://twallengren.github.io/path-planning-ode/', label: 'Open playground' },
  },
  {
    title: 'calendar-project',
    category: 'Financial infrastructure',
    summary: 'Business-day calendars defined in readable specifications. Reproducible data generation, holiday rules, and multiple calendar systems make the assumptions behind a date explicit.',
    technologies: ['Java', 'Python', 'YAML'],
    repositoryUrl: 'https://github.com/twallengren/calendar-project',
  },
  {
    title: 'field-sim',
    category: 'Computational physics',
    summary: 'Explore how fields react, move, and diffuse. A two-dimensional simulator using JAX, with diffusion derived from an energy functional and conservative transport.',
    technologies: ['Python', 'JAX', 'Numerical methods'],
    repositoryUrl: 'https://github.com/twallengren/field-sim',
  },
  {
    title: 'nBodyProblem',
    category: 'Physics · Interactive',
    summary: 'A Newtonian gravity sandbox in the browser. Launch bodies, explore orbital scenarios, and follow the motion that emerges from their mutual attraction.',
    technologies: ['JavaScript', 'Canvas', 'Numerical integration'],
    repositoryUrl: 'https://github.com/twallengren/nBodyProblem',
  },
];

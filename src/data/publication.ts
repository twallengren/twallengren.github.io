interface Publication {
  title: string;
  year: number;
  summary: string;
  contribution: string;
  url: string;
}

export const publication: Publication = {
  title: 'Matrix valued inverse problems on graphs with application to elastodynamic networks',
  year: 2018,
  summary: 'What can measurements at the boundary tell us about the inside of a network? This work studies how to recover matrix-valued properties of a graph, with applications to networks of springs, masses, and dampers.',
  contribution: 'I contributed to the mathematical proofs and the simulation software used to explore these inverse problems.',
  url: 'https://arxiv.org/abs/1806.07046',
};

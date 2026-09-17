interface Profile {
  name: string;
  role: string;
  location: string;
  introduction: string;
  about: string;
  links: { label: string; url: string }[];
  education: { institution: string; degree: string; dates: string; detail: string };
  interests: string;
}

export const profile: Profile = {
  name: 'Toren Wallengren',
  role: 'Staff Product Manager, Calculations at Addepar',
  location: 'United Kingdom',
  introduction: 'From building the models to shaping the product. I bring an engineering background to financial calculations, and explore mathematics and software through independent projects.',
  about: 'I work where mathematics, software, and product decisions meet. My path through operations, computational physics, and software engineering shapes how I approach product leadership: understand the model, ask what people need, and make the details work.',
  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/torenwallengren/' },
    { label: 'GitHub', url: 'https://github.com/twallengren' },
  ],
  education: {
    institution: 'University of Utah',
    degree: 'BS, Mathematics',
    dates: '2013–2017',
    detail: 'An educational background in mathematics and physics, with experience tutoring both subjects.',
  },
  interests: 'Away from work, I make time for music and ice hockey. Mathematics and physics remain enduring interests, often finding their way into the things I build.',
};

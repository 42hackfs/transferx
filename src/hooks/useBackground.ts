import { useState } from 'react';

// ----------------------------------------------------------------------
const bgImages = [
  {
    href: '/static/mock-images/ALL_THE_COLORS.jpeg',
    name: 'ALL THE COLORS',
    artist: 'Beeple',
    src: 'https://twitter.com/beeple/status/1407910878410907649'
  },
  {
    href: '/static/mock-images/disney+.jpeg',
    name: 'DISNEY PLUS CONTENT GENERATION',
    artist: 'Beeple',
    src: 'https://twitter.com/beeple/status/1328199971112411137/photo/1'
  },
  {
    href: '/static/mock-images/illestrater.jpeg',
    name: 'Illestrater',
    artist: 'Beeple',
    src: 'https://twitter.com/beeple/status/1339067786363072513/photo/1'
  },
  {
    href: '/static/mock-images/HAWAII.jpeg',
    name: 'HAWAII',
    artist: 'Beeple',
    src: 'https://twitter.com/beeple/status/1392383423688314881'
  },
  {
    href: '/static/mock-images/gg.jpeg',
    name: 'GENEVIÈVE GAUCKLER',
    artist: 'Beeple',
    src: 'https://twitter.com/beeple/status/1398487770503524352'
  },
  {
    href: '/static/mock-images/rl.jpeg',
    name: 'REFLECTED LIGHT',
    artist: 'Beeple',
    src: 'https://twitter.com/beeple/status/1400962065737650187'
  },
  {
    href: '/static/mock-images/TheSecondNotion.jpeg',
    name: 'The Second Notion',
    artist: '@Jah',
    src: 'https://foundation.app/@Jah/the-second-notion-55083'
  },
  {
    href: '/static/mock-images/acid.jpeg',
    name: 'Overclocked on Acid',
    artist: '@LaserLewDude',
    src: 'https://foundation.app/@LaserLewDude/overclocked-on-acid-58440'
  },
  {
    href: '/static/mock-images/belvedere.jpeg',
    name: 'Belvedere',
    artist: '@thomasdubois',
    src: 'https://foundation.app/@thomasdubois/belvedere-58655'
  }
];
export default function useBackground() {
  const [indexBg] = useState(Math.floor(Math.random() * bgImages.length));
  return bgImages[indexBg];
}

// Usage
// const countdown = useCountdown(new Date('07/07/2022 21:30'));

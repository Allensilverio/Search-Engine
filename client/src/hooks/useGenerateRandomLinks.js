import { useState } from 'react';

function generateRandomLink() {
  const randomLink = {
    title: 'Título Aleatorio',
    url: 'https://www.ejemplo.com',
    url2: 'LINK mas largo aleatorio, para ver como se ve',
    description: 'Descripción aleatoria',
  };
  return randomLink;
}

export function useRandomLinkGenerator(initialCount) {
  const [randomLinks, setRandomLinks] = useState(() => {
    const initialLinks = [];
    for (let i = 0; i < initialCount; i++) {
      initialLinks.push(generateRandomLink());
    }
    return initialLinks;
  });

  const regenerateRandomLinks = (count) => {
    const newLinks = [];
    for (let i = 0; i < count; i++) {
      newLinks.push(generateRandomLink());
    }
    setRandomLinks(newLinks);
  };

  return {
    randomLinks,
    regenerateRandomLinks,
    totalResultados: randomLinks.length, 

  };
}

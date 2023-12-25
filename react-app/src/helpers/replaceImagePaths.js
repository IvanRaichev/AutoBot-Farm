import React, { useEffect } from 'react';

const ReplaceImagePaths = () => {
  useEffect(() => {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      let currentSrc = img.getAttribute('src');
      if (currentSrc && currentSrc.startsWith('/static/media/')) {
        const newSrc = currentSrc.replace('/static/media/', 'static/media/');
        img.setAttribute('src', newSrc);
      }
    });
  }, []); 

  return null;
};

export default ReplaceImagePaths;

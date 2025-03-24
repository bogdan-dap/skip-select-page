import React from 'react';
import './TitleComponentStyle.css'

function TitleComponent  ({ mainTitle, subTitle }) {
  return (
    <div>
      <h2 className='text-white main-title-container'>{mainTitle}</h2>
      <p className='second-title-container'>{subTitle}</p>
    </div>
  );
};

export default TitleComponent;

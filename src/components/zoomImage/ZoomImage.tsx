// components/ZoomImage.js

"use client";

import React from 'react';
import styles from './ZoomImage.module.css';

const ZoomImage = (coverImage: any) => {
  const zoom = (e: any) => {
    const zoomer = e.currentTarget;
    const offsetX = e.nativeEvent.offsetX !== undefined ? e.nativeEvent.offsetX : e.touches[0].pageX;
    const offsetY = e.nativeEvent.offsetY !== undefined ? e.nativeEvent.offsetY : e.touches[0].pageY;

    const x = (offsetX / zoomer.offsetWidth) * 100;
    const y = (offsetY / zoomer.offsetHeight) * 100;

    zoomer.style.backgroundPosition = `${x}% ${y}%`;
  };

  return (
    <div
      className={`${styles.zoom} h-72 md:h-[500px]`}
      onMouseMove={zoom}
      onTouchMove={zoom}
      style={{ backgroundImage: `url('${coverImage.coverImage}')` }}
    >
      <img src={coverImage.coverImage} alt="Zoomable" className='w-full h-full' />
    </div>
  );
};

export default ZoomImage;
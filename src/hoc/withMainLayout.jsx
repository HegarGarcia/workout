import React from 'react';
import MainLayout from '../layout/MainLayout';
import DynamicBackground from '../layout/DynamicBackground';

export default function withMainLayout({ src, hex = '212121', title }) {
  const bg = {
    type: src ? 'img' : 'color',
    src,
    hex
  };

  return (WrappedComponent) => () => (
    <DynamicBackground background={bg}>
      <MainLayout title={title}>
        <WrappedComponent />
      </MainLayout>
    </DynamicBackground>
  );
}

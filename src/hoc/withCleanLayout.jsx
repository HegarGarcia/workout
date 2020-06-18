import React from 'react';
import CleanLayout from '../layout/CleanLayout';
import DynamicBackground from '../layout/DynamicBackground';

export default function withCleanLayout({ src, hex = '#212121' } = {}) {
  const bg = {
    type: src ? 'img' : 'color',
    src,
    hex
  };

  return (WrappedComponent) => () => (
    <DynamicBackground background={bg}>
      <CleanLayout>
        <WrappedComponent />
      </CleanLayout>
    </DynamicBackground>
  );
}

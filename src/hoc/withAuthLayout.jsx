import React from 'react';
import AuthLayout from '../layout/AuthLayout';
import DynamicBackground from '../layout/DynamicBackground';

export default function withAuthLayout({ src, hex }) {
  const bg = {
    type: src ? 'img' : 'color',
    src,
    hex
  };

  return (WrappedComponent) => () => (
    <DynamicBackground background={bg}>
      <AuthLayout>
        <WrappedComponent />
      </AuthLayout>
    </DynamicBackground>
  );
}

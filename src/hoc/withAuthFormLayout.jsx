import React from 'react';
import AuthFormLayout from '../layout/AuthFormLayout';
import DynamicBackground from '../layout/DynamicBackground';

export default function withAuthFormLayout({ src, hex, title }) {
  const bg = {
    type: src ? 'img' : 'color',
    src,
    hex
  };

  return (WrappedComponent) => () => (
    <DynamicBackground background={bg}>
      <AuthFormLayout title={title}>
        <WrappedComponent />
      </AuthFormLayout>
    </DynamicBackground>
  );
}

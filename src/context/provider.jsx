import React, { cloneElement } from 'react';
import FirebaseProvider from './firebase';
import AuthProvider from './auth';

const ProviderComposer = ({ contexts, children }) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  contexts.reduceRight(
    (kids, parent) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      cloneElement(parent, {
        children: kids
      }),
    children
  );

const ContextProvider = ({ children }) => (
  <ProviderComposer contexts={[<FirebaseProvider />, <AuthProvider />]}>
    {children}
  </ProviderComposer>
);

export default ContextProvider;

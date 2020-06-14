import React, { cloneElement } from 'react';
import AuthProvider from './auth';
import FirebaseProvider from './firebase';
import LayoutProvider from './layout';
import UserProvider from './user';

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
  <ProviderComposer
    contexts={[
      <FirebaseProvider />,
      <AuthProvider />,
      <UserProvider />,
      <LayoutProvider />
    ]}
  >
    {children}
  </ProviderComposer>
);

export default ContextProvider;

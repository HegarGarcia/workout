import React, { cloneElement } from 'react';
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
  <ProviderComposer contexts={[<UserProvider />]}>{children}</ProviderComposer>
);

export default ContextProvider;

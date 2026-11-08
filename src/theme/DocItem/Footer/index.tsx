import React, {type ReactNode} from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import ProductCta, {isFeatured} from '@site/src/components/ProductCta';

type Props = WrapperProps<typeof FooterType>;

// Every other product doc gets the call-to-action after the article.
export default function FooterWrapper(props: Props): ReactNode {
  const {metadata} = useDoc();
  return (
    <>
      {!isFeatured(metadata.id) && <ProductCta docId={metadata.id} placement="bottom" />}
      <Footer {...props} />
    </>
  );
}

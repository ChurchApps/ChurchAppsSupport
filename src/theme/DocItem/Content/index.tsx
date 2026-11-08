import React, {type ReactNode} from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type {WrapperProps} from '@docusaurus/types';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import ProductCta, {isFeatured} from '@site/src/components/ProductCta';

type Props = WrapperProps<typeof ContentType>;

// Product overview pages get the call-to-action above the article.
export default function ContentWrapper(props: Props): ReactNode {
  const {metadata} = useDoc();
  return (
    <>
      {isFeatured(metadata.id) && <ProductCta docId={metadata.id} placement="top" />}
      <Content {...props} />
    </>
  );
}

import MDXComponents from '@theme-original/MDXComponents';
import YouTube from '@site/src/components/YouTube';

// Makes <YouTube id="..." title="..." /> available in every doc without an import.
export default {
  ...MDXComponents,
  YouTube,
};

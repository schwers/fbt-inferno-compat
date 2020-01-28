/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 */
import { VNodeFlags } from 'inferno-vnode-flags';
import { createFragment, createVNode } from 'inferno';
import { FbtResult } from 'fbt';

function getInfernoResult(resolvedResultPayload) {
  const {contents} = resolvedResultPayload;
  const flattenedContents = FbtResult.flattenToArray(contents);

  // return createFragment(
  //   flattenedContents,
  //   0, // ChildFlags.HasNonKeyedChildren,
  //   null, // key
  // );

  return createVNode(
    VNodeFlags.HtmlElement,
    'span',
    'inferno-fbt', // className - just adding one for example
    flattenedContents,
    0, // UNKNOWN children - defer to  inferno for `normalizeChildren`
    null, // props
    null, // key
  );

}

export default getInfernoResult;

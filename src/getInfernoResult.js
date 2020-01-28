/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 */
import { VNodeFlags } from 'inferno-vnode-flags';
import { createFragment, createVNode } from 'inferno';

/**
 * Not currently exposed, but hangs off FbtResult
 *  import fbt {FbtResult} from 'fbt';
 *
 */
function flattenToArray(
  contents/*: $NestedFbtContentItems,*/
)/*: Array<$FbtContentItem>*/ {
  const result = [];
  for (let ii = 0; ii < contents.length; ++ii) {
    const content = contents[ii];

    // Hack for accessing FbtResultBase.getContents()
    if (content.getContents !== undefined &&
        typeof content.getContents === 'function') {
      content = content.getContents();
    }

    if (Array.isArray(content)) {
      result.push.apply(result, flattenToArray(content));
    } else {
      result.push(content);
    }
  }
  return result;
}

function getInfernoResult(resolvedResultPayload) {
  const {contents} = resolvedResultPayload;
  const flattenedContents = flattenToArray(contents);

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

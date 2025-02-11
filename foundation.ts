import { css } from 'lit';

import { find, identity } from '@openenergytools/scl-lib';

export function updateElementReference(
  newDoc: XMLDocument,
  oldElement: Element
): Element | null {
  if (!oldElement || !oldElement.closest('SCL')) return null;

  const id = identity(oldElement);

  const newElement = find(newDoc, oldElement.tagName, id);

  return newElement;
}

export function pathIdentity(element: Element): string {
  const id = identity(element);
  if (Number.isNaN(id)) return 'UNDEFINED';

  const paths = (id as string).split('>');
  paths.pop();
  return paths.join('>');
}

export const styles = css`
  .section {
    display: flex;
    height: calc(100vh - 184px);
  }

  .selectionlist {
    width: 35%;
    margin: 4px 4px 4px 8px;
    background-color: var(--mdc-theme-surface, white);
    overflow-y: scroll;
    resize: horizontal;
  }

  .elementeditorcontainer {
    flex: 65%;
    margin: 4px 8px 4px 4px;
    background-color: var(--mdc-theme-surface);
    overflow-y: scroll;
    display: flex;
    z-index: 0;
  }

  .listitem.header {
    font-weight: 500;
  }

  mwc-list-item.hidden[noninteractive] + li[divider] {
    display: none;
  }

  mwc-list-item.hidden[slot] + li[divider] {
    display: none;
  }

  .change.scl.element {
    display: none;
  }

  @media (max-width: 950px) {
    .elementeditorcontainer {
      display: block;
    }
  }

  @media (max-width: 599px) {
    .section {
      height: 100%;
    }

    .selectionlist {
      display: flex;
      position: absolute;
      width: calc(100% - 32px);
      height: auto;
      top: 110px;
      left: 8px;
      z-index: 1;
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
    }

    .elementeditorcontainer {
      display: block;
    }

    data-set-element-editor {
      width: calc(100% - 16px);
    }

    .selectionlist.hidden {
      display: none;
    }

    .change.scl.element {
      display: flex;
      margin: 4px 8px 8px;
    }
  }
`;

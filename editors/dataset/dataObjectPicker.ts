import { identity } from '@openenergytools/scl-lib';
import { Tree } from '@openscd/oscd-tree-grid';

function subDataObjectsObject(sdo: Element, sDiOrDai?: Element): Tree {
  const tree: Tree = {};
  const children: Tree = {};

  const doType = sdo.ownerDocument.querySelector(
    `DOType[id="${sdo.getAttribute('type')}"]`
  );
  if (!doType) return tree;

  Array.from(doType.querySelectorAll('SDO,DA')).forEach(sDoOrDa => {
    if (sDoOrDa.tagName === 'SDO') {
      const name = sDoOrDa.getAttribute('name') ?? 'UNKNOWN_SDO';
      const sdi = sDiOrDai?.querySelector(`SDI[name="${name}"]`) ?? undefined;
      const desc = sdi?.getAttribute('desc');

      const sDoName = `${name}${desc ? ` (${desc})` : ''}`;
      const id = `SDO: ${identity(sDoOrDa)}`;
      children[id] = subDataObjectsObject(sDoOrDa, sdi);
      children[id]!.text = sDoName;
    } else {
      const fc = sDoOrDa.getAttribute('fc') ?? 'UNKNOWN_FC';
      const id = `FC: ${fc}`;
      children[id] = {};
      children[id]!.text = id;
    }
  });

  tree.children = children;
  return tree;
}

function dataObjectObject(dO: Element, dOI?: Element): Tree {
  const tree: Tree = {};
  const children: Tree = {};

  const doType = dO.ownerDocument.querySelector(
    `DOType[id="${dO.getAttribute('type')}"]`
  );
  if (!doType) return tree;

  Array.from(doType.querySelectorAll('SDO,DA')).forEach(sDoOrDa => {
    if (sDoOrDa.tagName === 'SDO') {
      const name = sDoOrDa.getAttribute('name') ?? 'UNKNOWN_SDO';
      const sDi = dOI?.querySelector(`SDI[name="${name}"]`) ?? undefined;
      const desc = sDi?.getAttribute('desc');
      const sDoName = `${name}${desc ? ` (${desc})` : ''}`;

      const id = `SDO: ${identity(sDoOrDa)}`;
      children[id] = subDataObjectsObject(sDoOrDa, sDi);
      children[id]!.text = sDoName;
    } else {
      const fc = sDoOrDa.getAttribute('fc') ?? 'UNKNOWN_DA';
      const id = `FC: ${fc}`;
      children[id] = {};
      children[id]!.text = id;
    }
  });

  tree.children = children;
  return tree;
}

function anyLnObject(anyLn: Element): Tree {
  const tree: Tree = {};
  const children: Tree = {};

  const lnType = anyLn.ownerDocument.querySelector(
    `LNodeType[id="${anyLn.getAttribute('lnType')}"]`
  );
  if (!lnType) return tree;

  Array.from(lnType.querySelectorAll('DO')).forEach(dO => {
    const name = dO.getAttribute('name') ?? 'UNKNOWN_DO';
    const dOi =
      anyLn.querySelector(`:scope > DOI[name="${name}"]`) ?? undefined;
    const desc = dOi?.getAttribute('desc');

    const doName = `${name}${desc ? ` (${desc})` : ''}`;

    const id = `DO: ${identity(dO)}`;
    children[id] = dataObjectObject(dO, dOi);
    children[id]!.text = doName;
  });

  tree.children = children;
  return tree;
}

function lDeviceObject(lDevice: Element): Tree {
  const tree: Tree = {};
  const children: Tree = {};

  Array.from(lDevice.querySelectorAll('LN0,LN')).forEach(anyLn => {
    const desc = anyLn.getAttribute('desc');

    const anyLnClass = `${anyLn.getAttribute('prefix') ?? ''} ${
      anyLn.getAttribute('lnClass') ?? 'UNKNOWN_INST'
    } ${anyLn.getAttribute('inst') ?? ''}${desc ? ` (${desc})` : ''}`;

    const id = `${anyLn.tagName}: ${identity(anyLn)}`;
    children[id] = anyLnObject(anyLn);
    children[id]!.text = anyLnClass;
  });

  tree.children = children;

  return tree;
}

export function dataObjectTree(server: Element): Tree {
  const tree: Tree = {};

  Array.from(server.querySelectorAll('LDevice')).forEach(lDevice => {
    const desc = lDevice.getAttribute('desc');

    const lDeviceInst = `${lDevice.getAttribute('inst') ?? 'UNKNOWN_LDEVICE'}${
      desc ? ` (${desc})` : ''
    }`;

    const id = `LDevice: ${identity(lDevice)}`;
    tree[id] = lDeviceObject(lDevice);
    tree[id]!.text = lDeviceInst;
  });

  return tree;
}

/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { expect, fixture, html } from '@open-wc/testing';

import { sendMouse } from '@web/test-runner-commands';

import { SinonSpy, spy } from 'sinon';

import {
  isInsert,
  isRemove,
} from '@openenergytools/scl-lib/dist/foundation/utils.js';

import { dataSetDoc } from './data-set-editor.testfiles.js';

import './data-set-editor.js';

const doc = new DOMParser().parseFromString(dataSetDoc, 'application/xml');

describe('DataSet editor component', () => {
  let editEvent: SinonSpy;

  beforeEach(async () => {
    await fixture(html`<data-set-editor .doc="${doc}"></data-set-editor>`);

    editEvent = spy();
    window.addEventListener('oscd-edit', editEvent);
  });

  it('allows to add a new empty DataSet element', async () => {
    await sendMouse({ type: 'click', position: [760, 100] });

    expect(editEvent).to.have.been.calledOnce;

    const insert = editEvent.args[0][0].detail;

    expect(insert).to.satisfy(isInsert);
    expect(insert.parent.tagName).to.equal('LN0');
    expect(insert.node.tagName).to.equal('DataSet');
    expect(insert.node.getAttribute('name')).to.equal('newDataSet_001');
    expect(insert.node.children.length).to.equal(0);
  });

  it('allows to remove an existing DataSet element', async () => {
    await sendMouse({ type: 'click', position: [760, 200] });

    expect(editEvent).to.have.been.calledOnce;
    expect(editEvent.args[0][0].detail[0]).to.satisfy(isRemove);
    expect(editEvent.args[0][0].detail[0].node.tagName).to.equal('DataSet');
  });
});

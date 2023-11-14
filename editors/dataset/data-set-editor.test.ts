/* eslint-disable import/no-extraneous-dependencies */
import { fixture, html } from '@open-wc/testing';

import { setViewport } from '@web/test-runner-commands';

import { visualDiff } from '@web/test-runner-visual-regression';

import { dataSetDoc } from './data-set-editor.testfiles.js';

import './data-set-editor.js';
import type { DataSetEditor } from './data-set-editor.js';

const factor = window.process && process.env.CI ? 4 : 2;
function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}
mocha.timeout(2000 * factor);

describe('DataSet editor component', () => {
  describe('with missing SCL document', () => {
    let editor: DataSetEditor;
    beforeEach(async () => {
      editor = await fixture(html`<data-set-editor></data-set-editor>`);
      document.body.prepend(editor);
    });

    afterEach(async () => {
      editor.remove();
    });

    it('looks like the latest snapshot', async () => {
      await editor.updateComplete;
      await timeout(200);
      await visualDiff(
        editor,
        `dataset/data-set-editor/#1 Missing SCL document`
      );
    });
  });

  describe('with SCL document loaded', () => {
    let editor: DataSetEditor;
    beforeEach(async () => {
      const doc = new DOMParser().parseFromString(
        dataSetDoc,
        'application/xml'
      );

      editor = await fixture(
        html`<data-set-editor .doc="${doc}"></data-set-editor>`
      );
      document.body.prepend(editor);
    });

    afterEach(async () => {
      editor.remove();
    });

    describe('with unselected DataSet', () => {
      it('looks like the latest snapshot', async () => {
        await setViewport({ width: 1900, height: 1200 });

        await editor.updateComplete;
        await timeout(200);
        await visualDiff(
          editor,
          `dataset/data-set-editor/#2 Unselected DataSet 1900x1200`
        );
      });

      it('filtered looks like the latest snapshot', async () => {
        await setViewport({ width: 1900, height: 1200 });

        editor.selectionList.shadowRoot!.querySelector('mwc-textfield')!.value =
          'ldInst2';
        editor.selectionList.onFilterInput();

        await editor.updateComplete;
        await timeout(200);
        await visualDiff(
          editor,
          `dataset/data-set-editor/#3 With filtered DataSets`
        );
      });

      it('on mobile looks like the latest snapshot', async () => {
        await setViewport({ width: 599, height: 1100 });

        await editor.updateComplete;
        await timeout(200);
        await visualDiff(
          editor,
          `dataset/data-set-editor/#4 Unselected DataSet 599x1100`
        );
      });
    });

    describe('with selected DataSet', () => {
      beforeEach(async () => {
        await editor.selectionList.items[4].click();
      });

      it('looks like the latest snapshot', async () => {
        await setViewport({ width: 1900, height: 1200 });

        await editor.updateComplete;
        await timeout(200);
        await visualDiff(
          editor,
          `dataset/data-set-editor/#5 Selected DataSet 1900x1200`
        );
      });

      it('on mobile looks like the latest snapshot', async () => {
        await setViewport({ width: 599, height: 1100 });

        await editor.updateComplete;
        await timeout(200);
        await visualDiff(
          editor,
          `dataset/data-set-editor/#6 Selected DataSet 599x1100`
        );
      });

      it('with active opened selection list looks like the latest snapshot', async () => {
        await setViewport({ width: 599, height: 1100 });

        editor.selectDataSetButton.click();

        await editor.updateComplete;
        await timeout(200);
        await visualDiff(
          editor,
          `dataset/data-set-editor/#7 Selection List 599x1100`
        );
      });
    });
  });
});
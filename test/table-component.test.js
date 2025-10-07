import { expect, fixture, html, aTimeout} from '@open-wc/testing';
import '../src/components/table/customTable.js';

import { tableConfig } from '../src/config/table.config.js';
import { mockData } from './__mocks__/data.js';

describe('/src/components/table/customTable.js', () => {
    it('renders default', async() => {
        const el = await fixture(html`<custom-table .config=${tableConfig}></custom-table>`);
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.table-wrapper');
        expect(view).to.exist;
    })

    it('renders default with data', async() => {
        const el = await fixture(html`<custom-table .data=${mockData} .config=${tableConfig}></custom-table>`);
        await el.updateComplete;

        const bodyRows = el.renderRoot.querySelectorAll('tbody .row');
        expect(bodyRows.length).to.equal(mockData.length);
    })

    it('edit triggered', async() => {
        let edited = false;
        const el = await fixture(html`<custom-table .data=${mockData} .config=${tableConfig} @edit=${() => {edited = true}}></custom-table>`);
        await el.updateComplete;

        const editIcon = el.renderRoot.querySelector('edit-icon');
        editIcon.click();
        await el.updateComplete;

        expect(edited).to.be.true;
    })

    it('delete triggered', async() => {
        let deleted = false;
        const el = await fixture(html`<custom-table .data=${mockData} .config=${tableConfig} @delete=${() => {deleted = true}}></custom-table>`);
        await el.updateComplete;

        const editIcon = el.renderRoot.querySelector('delete-icon');
        editIcon.click();
        await el.updateComplete;

        expect(deleted).to.be.true;
    })
})
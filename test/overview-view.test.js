import { expect, fixture, html, } from '@open-wc/testing';
import '../src/views/userOverview.js';

import { mockData } from './__mocks__/data.js';

describe('/src/views/userOverview.js', () => {
    it('renders default', async() => {
        const el = await fixture(html`<user-overview></user-overview>`);
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.overview-view');
        expect(view).to.exist;
    })

    
    it('displays search form', async() => {
        const el = await fixture(html`<user-overview></user-overview>`);
        await el.updateComplete;

        const searchButton = el.renderRoot.querySelector('.toolbar .search');
        searchButton.click();
        await el.updateComplete;

        const view = el.renderRoot.querySelector('custom-form');
        expect(view).to.exist;
    })

    it('display data in table format', async() => {
        const el = await fixture(html`<user-overview></user-overview>`);
        await el.updateComplete;

        el.data = mockData; // has 11 items
        el.listType = 'TABLE';
        await el.updateComplete;
        const table = el.renderRoot.querySelector('custom-table');
        
        expect(table).to.exist;
    })

    it('display data in card format', async() => {
        const el = await fixture(html`<user-overview></user-overview>`);
        await el.updateComplete;

        el.data = mockData; // has 11 items
        el.listType = 'CARD';
        await el.updateComplete;
        const cardWrapper = el.renderRoot.querySelector('.card-wrapper');
        
        expect(cardWrapper).to.exist;
    })

    it('check pagination', async() => {
        const el = await fixture(html`<user-overview></user-overview>`);
        await el.updateComplete;

        el.data = mockData; // has 11 items
        await el.updateComplete;
        const paginationAfterData = el.renderRoot.querySelector('custom-pagination');
        
        expect(paginationAfterData).to.exist;
    })

    it('delete modal render', async() => {
        const el = await fixture(html`<user-overview></user-overview>`);
        await el.updateComplete;

        el.data = mockData; // has 11 items
        el._delete({detail: {id: mockData[0].id}});
        await el.updateComplete;

        expect(el.showDeletePopup).to.be.true;
    })
})
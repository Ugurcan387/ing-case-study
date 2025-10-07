import { expect, fixture, html} from '@open-wc/testing';

import '../src/components/card.js';

import { mockData } from './__mocks__/data.js';
import { tableConfig } from '../src/config/table.config.js';

describe('/src/components/card.js', () => {
    it('renders default', async() => {
        const el = await fixture(html`<custom-card></custom-card>`);
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.card');
        expect(view).to.exist;
    })

    it('click edit', async() => {
        let edited = false;
        const el = await fixture(html`<custom-card 
                                            .config=${tableConfig} 
                                            .data=${mockData[0]}
                                            @edit=${() => {edited = true}}
                                       ></custom-card>`);
        await el.updateComplete;

        const buttons = el.renderRoot.querySelectorAll('custom-button');
        buttons[0].click();
        await el.updateComplete;

        expect(edited).to.be.true;
    })

    it('click delete', async() => {
        let deleted = false;
        const el = await fixture(html`<custom-card 
                                            .config=${tableConfig} 
                                            .data=${mockData[0]}
                                            @delete=${() => {deleted = true}}
                                       ></custom-card>`);
        await el.updateComplete;

        const buttons = el.renderRoot.querySelectorAll('custom-button');
        buttons[1].click();
        await el.updateComplete;

        expect(deleted).to.be.true;
    })
})
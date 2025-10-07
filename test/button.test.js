import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '../src/components/button.js'

import { store } from './__mocks__/store.js';

describe('/src/components/button.js', () => {
    it('renders default', async() => {
        const el = await fixture(html`<custom-button></custom-button>`);
        await el.updateComplete;

        const button = el.renderRoot.querySelector('.button');
        expect(button).to.exist;
    })
})
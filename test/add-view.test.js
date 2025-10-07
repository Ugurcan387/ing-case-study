import { expect, fixture, html, aTimeout} from '@open-wc/testing';
import sinon from 'sinon';
import { Router } from '@vaadin/router';

import '../src/views/userAdd.js';

import { createUniqueString } from '../src/utils/utils.js';

describe('/src/views/userAdd.js', () => {
    it('renders default', async() => {
        const el = await fixture(html`<user-add></user-add>`);
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.add-page-wrapper');
        expect(view).to.exist;
    })

    it('cancel add', async() => {
        const el = await fixture(html`<user-add></user-add>`);
        await el.updateComplete;
        const goStub = sinon.stub(Router, 'go');

        el._cancel();
        await aTimeout(0);

        expect(goStub.calledOnceWith('/')).to.be.true;
        goStub.restore();
    })

    it('creates unique id successfullt', async() => {
        const id = createUniqueString();
        expect(id.startsWith('ID') && id.length > 10).to.be.true;
    })
})
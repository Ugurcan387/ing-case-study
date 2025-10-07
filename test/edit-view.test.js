import { expect, fixture, html, aTimeout} from '@open-wc/testing';
import sinon from 'sinon';
import { Router } from '@vaadin/router';

import '../src/views/userEdit.js'

describe('/src/views/userEdit.js', () => {
    it('renders default', async() => {
        const el = await fixture(html`<user-edit></user-edit>`);
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.edit-page-wrapper');
        expect(view).to.exist;
    })
    
    it('cancel edit', async() => {
        const el = await fixture(html`<user-edit></user-edit>`);
        await el.updateComplete;
        const goStub = sinon.stub(Router, 'go');

        el._cancel();
        await aTimeout(0);

        expect(goStub.calledOnceWith('/')).to.be.true;
        goStub.restore();
    })
})
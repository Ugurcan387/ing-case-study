import { expect, fixture, html, aTimeout } from '@open-wc/testing';
import sinon from 'sinon';
import { Router } from '@vaadin/router';

import '../src/components/header/header.js'

describe('/src/components/header/header.js', () => {
    it('renders default', async() => {
        const el = await fixture(html`<custom-header></custom-header>`);
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.custom-header');
        expect(view).to.exist;
    })
    
    
    it('change language', async() => {
        const el = await fixture(html`<custom-header></custom-header>`);
        await el.updateComplete;

        const flag = el.renderRoot.querySelector('.flag');
        flag.click();
        await el.updateComplete;

        expect(el.language).to.equal('tr');
    })

    it('navigate home', async() => {
        const el = await fixture(html`<custom-header></custom-header>`);
        await el.updateComplete;
        const goStub = sinon.stub(Router, 'go');
        
        const logo = el.renderRoot.querySelector('.left');
        logo.click();
        await aTimeout(0);

        expect(goStub.calledOnceWith('/')).to.be.true;
        goStub.restore();
    })

    it('navigate home', async() => {
        const el = await fixture(html`<custom-header></custom-header>`);
        await el.updateComplete;
        const goStub = sinon.stub(Router, 'go');
        
        const addButton = el.renderRoot.querySelector('.button');
        addButton.click();
        await aTimeout(0);

        expect(goStub.calledOnceWith('/add')).to.be.true;
        goStub.restore();
    })
})
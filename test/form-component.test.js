import { expect, fixture, html, } from '@open-wc/testing';
import { formConfig } from '../src/config/form.config.js';

import { mockData } from './__mocks__/data.js';

import '../src/components/form/form.js'
import '../src/components/form/formItem.js'

describe('/src/components/form/formItem.js', () => {
    it('renders default', async () => {
        const el = await fixture(html`<custom-form-item></custom-form-item>`)
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.field-set');
        expect(view).to.exist;
    })

    it('renders default', async () => {
        const errorMessage = () => "This is a error message";
        const el = await fixture(html`<custom-form-item .valid=${false} .message=${errorMessage}></custom-form-item>`)
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.valid-error');
        expect(view).to.exist;
    })
})

describe('/src/components/form/form.js', () => {
    it('renders default', async() => {
        const el = await fixture(html`<custom-form></custom-form>`);
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.form-wrapper');
        expect(view).to.exist;
    })

    it('empty form save button', async() => {
        let saved = false;
        const el = await fixture(html`<custom-form .config=${formConfig} @save=${() => {saved = true}}></custom-form>`);
        await el.updateComplete;

        const buttons =el.renderRoot.querySelectorAll('custom-button');
        buttons[0].click();
        await el.updateComplete;

        expect(saved).to.be.false;
    })

    it('filled form save button', async() => {
        let saved = false;
        const el = await fixture(html`<custom-form .values=${mockData[0]} .config=${formConfig} @save=${() => {saved = true}}></custom-form>`);
        await el.updateComplete;

        const buttons =el.renderRoot.querySelectorAll('custom-button');
        buttons[0].click();
        await el.updateComplete;

        expect(saved).to.be.true;
    })

    it('cancel button', async() => {
        let canceled = false;
        const el = await fixture(html`<custom-form .config=${formConfig} @cancel=${() => {canceled = true}}></custom-form>`);
        await el.updateComplete;

        const buttons =el.renderRoot.querySelectorAll('custom-button');
        buttons[1].click();
        await el.updateComplete;

        expect(canceled).to.be.true;
    })

    it('save text given', async() => {
        let customSaveText = "Custom Save Text";
        const el = await fixture(html`<custom-form .saveText=${customSaveText}></custom-form>`);
        await el.updateComplete;

        const buttons =el.renderRoot.querySelectorAll('custom-button');
        expect(buttons[0].textContent.trim()).to.equal(customSaveText);
    })

    it('cancel text given', async() => {
        let customCancelText = "Custom Cancel Text";
        const el = await fixture(html`<custom-form .cancelText=${customCancelText}></custom-form>`);
        await el.updateComplete;

        const buttons =el.renderRoot.querySelectorAll('custom-button');
        expect(buttons[1].textContent.trim()).to.equal(customCancelText);
    })

    it('hide cancel button', async() => {
        const el = await fixture(html`<custom-form .hideCancel=${true}></custom-form>`);
        await el.updateComplete;

        const buttons =el.renderRoot.querySelectorAll('custom-button');
        expect(buttons.length).to.equal(1);
    })
})
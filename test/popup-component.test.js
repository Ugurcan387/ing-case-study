import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/popup.js'


describe('/src/components/popup.js', () => {
    it('renders default', async() => {
        const el = await fixture(html`<custom-popup></custom-popup>`);
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.popup-wrapper');
        expect(view).to.not.exist;
    })

    it('renders with visible true', async() => {
        const el = await fixture(html`<custom-popup .visible=${true}></custom-popup>`);
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.popup-wrapper');
        expect(view).to.exist;
    })

    it('click outside', async() => {
        let cancelCalled = false;
        const el = await fixture(html`<custom-popup 
                                            .visible=${true}
                                            @cancel=${() => {cancelCalled = true}}
                                      ></custom-popup>`);
        await el.updateComplete;

        const wrapper = el.renderRoot.querySelector('.popup-wrapper');
        wrapper.click();
        await el.updateComplete;

        expect(cancelCalled).to.be.true;
    })

    it('click cancel button', async() => {
        let cancelCalled = false;
        const el = await fixture(html`<custom-popup 
                                            .visible=${true}
                                            @cancel=${() => {cancelCalled = true}}
                                      ></custom-popup>`);
        await el.updateComplete;

        const buttons = el.renderRoot.querySelectorAll('custom-button');
        buttons[1].click();
        await el.updateComplete;

        expect(cancelCalled).to.be.true;
    })

    it('click cancel button', async() => {
        let confirmCalled = false;
        const el = await fixture(html`<custom-popup 
                                            .visible=${true}
                                            @confirm=${() => {confirmCalled = true}}
                                      ></custom-popup>`);
        await el.updateComplete;

        const buttons = el.renderRoot.querySelectorAll('custom-button');
        buttons[0].click();
        await el.updateComplete;

        expect(confirmCalled).to.be.true;
    })
})
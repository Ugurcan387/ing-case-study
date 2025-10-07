import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/select.js'

const options = [
    {
        value: 'analytics',
        label: () => 'Analytics'
    },
    {
        value: 'tech',
        label: () => 'Tech'
    }
]

describe('/src/components/popup.js', () => {
    it('renders default', async() => {
        const el = await fixture(html`<custom-select></custom-select>`);
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.select-wrapper');
        expect(view).to.exist;
    })

    it('renders options', async() => {
        const el = await fixture(html`<custom-select .options=${options}></custom-select>`);
        await el.updateComplete;

        const input = el.renderRoot.querySelector('.input');
        input.click();
        await el.updateComplete;

        const optionContainer = el.renderRoot.querySelector('.options-container')

        expect(optionContainer).to.exist;
    })

    it('close options', async() => {
        const el = await fixture(html`<custom-select .options=${options}></custom-select>`);
        await el.updateComplete;

        const input = el.renderRoot.querySelector('.input');
        input.click();
        await el.updateComplete;
        input.click();
        await el.updateComplete;

        const optionContainer = el.renderRoot.querySelector('.options-container')

        expect(optionContainer).to.not.exist;
    })

    it('renders options', async() => {
        const el = await fixture(html`<custom-select .options=${options} .clearable=${false}></custom-select>`);
        await el.updateComplete;

        const input = el.renderRoot.querySelector('.input');
        input.click();
        await el.updateComplete;

        const clearOption = el.renderRoot.querySelector('.option.clear')

        expect(clearOption).to.not.exist;
    })

    it('select option', async() => {
        const el = await fixture(html`<custom-select .options=${options} .clearable=${false}></custom-select>`);
        await el.updateComplete;

        const input = el.renderRoot.querySelector('.input');
        input.click();
        await el.updateComplete;

        const option = el.renderRoot.querySelector('.option');
        option.click();
        await el.updateComplete;

        expect(el.value).to.equal(options[0].value);
    })
})
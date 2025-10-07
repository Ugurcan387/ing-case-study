import { expect, fixture, html, } from '@open-wc/testing';

import '../src/components/pagination/pagination.js'

describe('/src/components/pagination/pagination.js', () => {
    it('renders default', async () => {
        const el = await fixture(html`<custom-pagination .totalPages=${10} .currentPage=${1}></custom-pagination>`)
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.pagination');
        expect(view).to.exist;
    })

    it('renders default with no totalPages', async () => {
        const el = await fixture(html`<custom-pagination .totalPages=${0} .currentPage=${1}></custom-pagination>`)
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.pagination');
        expect(view).to.be.null;
    })

    it('with no passive nodes', async () => {
        const el = await fixture(html`<custom-pagination .totalPages=${2} .currentPage=${1}></custom-pagination>`)
        await el.updateComplete;

        const view = el.renderRoot.querySelector('.pagination .page.passive');
        expect(view).to.be.null;
    })

    it('with one passive nodes', async () => {
        const el = await fixture(html`<custom-pagination .totalPages=${20} .currentPage=${1}></custom-pagination>`)
        await el.updateComplete;

        const passiveNodes = el.renderRoot.querySelectorAll('.pagination .page.passive');
        expect(passiveNodes.length).to.equal(1);
    })

    it('with two passive nodes', async () => {
        const el = await fixture(html`<custom-pagination .totalPages=${20} .currentPage=${7}></custom-pagination>`)
        await el.updateComplete;

        const passiveNodes = el.renderRoot.querySelectorAll('.pagination .page.passive');
        expect(passiveNodes.length).to.equal(2);
    })

    it('pagination go next success', async () => {
        let currentPage = 10;
        const el = await fixture(html`<custom-pagination .totalPages=${20} .currentPage=${currentPage} @page-change=${(event) => {currentPage = event.detail.value}}></custom-pagination>`)
        await el.updateComplete;

        const nextButton = el.renderRoot.querySelector('.icon.next');
        nextButton.click();
        await el.updateComplete;

        expect(currentPage).to.equal(11);
    })

    it('pagination go next fail', async () => {
        let currentPage = 20;
        const el = await fixture(html`<custom-pagination .totalPages=${20} .currentPage=${currentPage} @page-change=${(event) => {currentPage = event.detail.value}}></custom-pagination>`)
        await el.updateComplete;

        const nextButton = el.renderRoot.querySelector('.icon.next');
        nextButton.click();
        await el.updateComplete;

        expect(currentPage).to.equal(20);
    })

    it('pagination go previous success', async () => {
        let currentPage = 2;
        const el = await fixture(html`<custom-pagination .totalPages=${20} .currentPage=${currentPage} @page-change=${(event) => {currentPage = event.detail.value}}></custom-pagination>`)
        await el.updateComplete;

        const prevButton = el.renderRoot.querySelector('.icon.previous');
        prevButton.click();
        await el.updateComplete;

        expect(currentPage).to.equal(1);
    })

    it('pagination go previous fail', async () => {
        let currentPage = 1;
        const el = await fixture(html`<custom-pagination .totalPages=${20} .currentPage=${currentPage} @page-change=${(event) => {currentPage = event.detail.value}}></custom-pagination>`)
        await el.updateComplete;

        const prevButton = el.renderRoot.querySelector('.icon.previous');
        prevButton.click();
        await el.updateComplete;

        expect(currentPage).to.equal(1);
    })
})
import {LitElement, html} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';

import { globalStyles } from '../../styles/global-style';
import { paginationStyles } from '../../styles/pagination-style';

const DISTANCE_INDICATOR = '...';
const INDEX_TYPES = {
    PASSIVE: 'PASSIVE',
    ACTIVE: 'ACTIVE'
}

export class Pagination extends LitElement {
    static properties = {
        totalPages: {type: Number}, 
        currentPage: {type: Number},
        displayPages: {type: String}
    };
    static styles = [globalStyles, paginationStyles];

    constructor() {
        super();
        updateWhenLocaleChanges(this);
        this.displayPages = '';
    }

    connectedCallback() {
        super.connectedCallback();
        this._calculateDisplay(this.totalPages, this.currentPage);
    }

    willUpdate(updatedProperties) {
        if(updatedProperties.has('totalPages') || updatedProperties.has('currentPage')) {
            this._calculateDisplay(updatedProperties.totalPages || this.totalPages, updatedProperties.currentPage || this.currentPage);
        }
    }
    
    render() {
        return this.totalPages 
                ? html`
                    <div class="pagination">
                        <div class="icon previous${this.currentPage === 1 ? ' disabled' : ''}" @click=${() => this._changePage(this.currentPage - 1)}></div>
                        ${this.displayPages.map((content) => html`
                                                                    <div 
                                                                        class="page ${content.type === INDEX_TYPES.ACTIVE ? 'active' : 'passive'} ${content.index === this.currentPage ? ' current' : ''}"
                                                                        @click=${content.type === INDEX_TYPES.ACTIVE ? () => this._changePage(content.index) : this._noop}
                                                                    >
                                                                        ${content.index}
                                                                    </div>`)}
                        <div class="icon next${this.currentPage === this.totalPages ? ' disabled' : ''}" @click=${() => this._changePage(this.currentPage + 1)}></div>
                    </div>
                `
                : ''
    }

    _calculateDisplay(totalPages, currentPage) {
        const displayPages = []; 
        if (totalPages > 7) {
            displayPages.push(this._createPageIndex(1)) // start page will always be shown
            // first 4 and last 4 indexes will show only one '...' on pagination
            let content;
            if (currentPage <= 4) {
                content = [2,3,4,5, DISTANCE_INDICATOR];
            }
            else if (currentPage > totalPages - 4) {
                content = [DISTANCE_INDICATOR, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
            }
            else {
                content = [DISTANCE_INDICATOR, currentPage -1, currentPage, currentPage + 1, DISTANCE_INDICATOR];
            }

            for (let index = 0; index < content.length; index++) {
                const element = content[index];
                displayPages.push(this._createPageIndex(element))
            }
            
            displayPages.push(this._createPageIndex(totalPages)); // last page will always be shown
        }
        else {
            for (let index = 1; index <= totalPages; index++) {
                displayPages.push(this._createPageIndex(index));
            }
        }

        this.displayPages = displayPages;
    }

    _createPageIndex(index) {
        return {
            index,
            type: index === DISTANCE_INDICATOR
                  ? INDEX_TYPES.PASSIVE
                  :INDEX_TYPES.ACTIVE
        }
    }

    _changePage(page) {
        if (page > this.totalPages || page < 1) {
            return;
        }
        
        this.dispatchEvent(new CustomEvent('page-change', {
            detail: { value: page },
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }

    _noop() {
        // no operation
    }
}

customElements.define('custom-pagination', Pagination);
import {LitElement, html} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';
import {Router} from '@vaadin/router';

import {connect} from 'pwa-helpers';
import { store } from '../store';
import { userActions } from '../store/states/user-store';
import { USER_ACTIONS } from '../store/actionsTypes';

import '../components/pagination/pagination';
import '../components/table/customTable';
import '../components/form/form';
import '../components/card';
import '../components/popup';
import '../components/select';

import { globalStyles } from '../styles/global-style';
import { overviewStyle } from '../styles/overview-style';

import { tableConfig } from '../config/table.config';
import { formConfig } from '../config/form.config';

const PAGE_SIZE = 10;
const LIST_TYPES = {
    TABLE: 'TABLE',
    CARD: 'CARD'
}

export class UserOverview extends connect(store)(LitElement) {
    static properties = {
        data: {type: Array},
        filteredData: {type: Array},
        displayData: {type: Array},
        select: {type: Object},
        currentPage: {type: Number},
        pageSize: {type: Number},
        totalPages: {type: Number},
        deleteId: {type: String},
        showDeletePopup: {type: Boolean},
        searchConfig: {type: Object},
        searchValues: {type: Object},
        showSearch: {type: Boolean},
        listType: {type: String},
        listOptions: {type: Array}
    }
    static styles = [globalStyles, overviewStyle]

    constructor() {
        super();
        updateWhenLocaleChanges(this);

        const {UserReducer} = store.getState();
        this.data = UserReducer.data || [];
        this.filteredData = UserReducer.data || [];
        this.select = this.filteredData.reduce((accumulator, entry) => {
            accumulator[entry.id] = false;
            return accumulator;
        }, {});

        this.currentPage = 1;
        this.pageSize = 10;
        this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
        this.displayData = this._getPageData(this.currentPage);
        this.deleteId = '';
        this.showDeletePopup = false;
        this.searchConfig = formConfig.map((config) => ({...config, rules: []}));
        this.searchValues = {};
        this.showSearch = false;
        this.listType = LIST_TYPES.TABLE;
        this.listOptions = [
            {
                value: LIST_TYPES.TABLE,
                label: () => msg('Table')
            },
            {
                value: LIST_TYPES.CARD,
                label: () => msg('Card')
            }
        ]
    }

    updated(updatedProperties) {
        if (updatedProperties.has('data')) {
            this._search({detail: {value: this.searchValues}});
        }
        if (updatedProperties.has('filteredData')) {
            this.select = this.filteredData.reduce((accumulator, entry) => {
                accumulator[entry.id] = false;
                return accumulator;
            }, {});

            this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
            this.displayData = this._getPageData(this.currentPage);
        }
    }

    render() {
        return html`
            <div class="overview-view">
                <p class="page-header">${msg('Employee List')}</p>

                <div class="toolbar">
                    <p class="search" @click=${this._toggleSearch}>${msg('Search')}<span class="arrow ${this.showSearch ? 'down' : 'up'}"></span></p>
                    <div class="item">
                        <p>${msg('Display Type')}</p>
                        <custom-select
                            .options=${this.listOptions}
                            .value=${this.listType}
                            .clearable=${false}
                            @change=${this._listTypeChange}
                        ></custom-select>
                    </div>
                    
                </div>
                ${this.showSearch
                    ?
                    (
                        html`
                        <custom-form
                            .values=${this.searchValues}
                            .config=${this.searchConfig}
                            .saveText=${msg('Search')}
                            .hideCancel=${true}
                            @save=${this._search}
                            @cancel=${this._reset}
                        >

                        </custom-form>`
                    )
                    : ''
                }
                
                ${
                    this.listType === LIST_TYPES.TABLE
                    ?
                    (
                        html`
                            <custom-table 
                                class="overview-table"
                                .columns=${tableConfig} 
                                .data=${this.displayData}
                                @select-change=${this._tableSelectChange}
                                @edit=${this._edit}
                                @delete=${this._delete}
                            ></custom-table>
                        `
                    )
                    :
                    (
                        html`
                            <div class="card-wrapper">
                                ${this.displayData.map((dataEntry) => html`
                                    <div class="card">
                                        <custom-card
                                            .config=${tableConfig}
                                            .data=${dataEntry}
                                            @edit=${this._edit}
                                            @delete=${this._delete}
                                        ></custom-card>
                                    </div>
                                `)}
                            </div>
                        `
                    )
                }

                <custom-pagination 
                    .totalPages=${this.totalPages} 
                    .currentPage=${this.currentPage}
                    @page-change=${this._changePage}
                ></custom-pagination>
            </div>

            <custom-popup 
                .visible=${this.showDeletePopup} 
                @confirm=${this._deleteConfirm}
                @cancel=${this._deleteCancel}
            >
                <div class="popup-content-wrapper">
                    <p class="popup-header">${msg('Are you sure?')}</p>
                    <p class="popup-text">${msg('This record will be deleted permenantly.')}</p>
                </div>
            </custom-popup>
        `
    }

    _tableSelectChange(event) {
        this.select = event.detail.value;
    }

    _changePage(event) {
        this.currentPage = event.detail.value;
        this.displayData = this._getPageData(this.currentPage);
    }

    _getPageData(page) {
        return this.filteredData.slice((page - 1) * this.pageSize, (page * this.pageSize));
    }

    _edit(event) {
        const {id} = event.detail;
        Router.go('/edit/' + id);
    }

    _delete(event) {
        this.deleteId = event.detail.id;
        this.showDeletePopup = true;
    }

    _deleteConfirm() {
        if (this.deleteId) {
            store.dispatch(userActions.update({
                type: USER_ACTIONS.DELETE,
                id: this.deleteId 
            }));
    
            this.deleteId = '';

            const {UserReducer} = store.getState();
            this.data = UserReducer.data || [];
            this.showDeletePopup = false;
        }
    }

    _deleteCancel() {
        this.showDeletePopup = false;
        this.deleteId = '';
    }

    _toggleSearch() {
        this.showSearch = !this.showSearch;
    }

    _search(event) {
        const filters = event.detail.value;
        const filterKeys = Object.keys(filters);
        this.filteredData = this.data.filter((entry) => {
            let isSuccess = true;

            for (let index = 0; index < filterKeys.length; index++) {
                const key = filterKeys[index];
                if (filters[key] && filters[key] !== entry[key]) {
                    isSuccess = false;
                    break;
                }
            }

            return isSuccess;
        });
        this.showSearch = false;
    }

    _reset() {
        this.searchValues = Object.keys(this.searchValues).reduce((accumulator, key) => {
            accumulator[key] = '';
            return accumulator;
        },{});
    }

    _listTypeChange(event) {
        this.listType = event.detail.value
    }
}

customElements.define('user-overview', UserOverview);
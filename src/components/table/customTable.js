import {LitElement, html} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';

import '../checkbox';
import '../icons/edit-icon'; 
import '../icons/delete-icon'; 

import { deepCopy } from '../../utils/utils';

import { globalStyles } from '../../styles/global-style';
import { tableStyle } from '../../styles/table-style';

export class CustomTable extends LitElement {
    static properties = {
        data: {type: Array},
        columns: {type: Array},
        checked: {type: Object},
        allSelect: {type: Boolean}
    };
    static styles = [globalStyles, tableStyle];

    constructor() {
        super();
        updateWhenLocaleChanges(this);
        this.data = [];
        this.columns = [];
        this.checked = {};
        this.allSelect = false;
    }

    updated(updatedProperties) {
        if(updatedProperties.has('data') && updatedProperties.get('data')) {
            const checked = {};
            const data = deepCopy(this.data);
            for (let index = 0; index < data.length; index++) {
                const entry = data[index];
                checked[entry.id] = false;
            }

            this.checked = checked;
        }

        if (updatedProperties.has('checked') && updatedProperties.get('checked')) {
            const selectValues = Object.values(this.checked);
            this.allSelect = selectValues.length 
                             ? selectValues.reduce((accumulator, entry) => {
                                    accumulator = accumulator && entry;
                                    return accumulator;
                                }, true)
                             : false;
        }
    }
    
    render() {
        return html`
        <div class="table-wrapper">
            <table class="custom-table">
                <thead>
                    <tr class="headers">
                        <td class="column select"> 
                            <custom-checkbox 
                                .checked=${this.allSelect} 
                                @change=${(event) => this._change(event, 'ALL')}
                            ></custom-checkbox> 
                        </td>

                        ${this.columns.map((column) => html`
                                <td class="column">${column.label()}</td>
                            `
                        )}

                        <td class="column action">${msg('Actions')}</td>
                    </tr>
                </thead>
                
                 <tbody>
                    ${this.data.map((entry) => html`
                            <tr class="row">
                                <td class="cell select"> 
                                    <custom-checkbox 
                                        .checked=${this.checked[entry.id]} 
                                        @change=${(event) => this._change(event, entry.id)}
                                    ></custom-checkbox> 
                                </td>

                                ${this.columns.map((column) => html`
                                        <td class="cell">${column.render ? column.render(entry[column.key]) : entry[column.key]}</td>
                                    `
                                )}

                                <td class="cell action">
                                    <edit-icon class="icon" @click=${() => this._clickEdit(entry.id)}></edit-icon>
                                    <delete-icon class="icon" @click=${() => this._clickDelete(entry.id)}></delete-icon>
                                </td>
                            </tr>
                        `)
                    }
                 </tbody>
                
            </table>
        </div>
        `
    };

    _change(event, id) {
        if (id === 'ALL') {
            this.checked = this.data.reduce((accumulator, entry) => {
                accumulator[entry.id] = event.detail.value;
                return accumulator;
            }, {});
            this.allSelect = event.detail.value;
        }

        if (this.checked[id] === true || this.checked[id] === false) {
            const checked = deepCopy(this.checked);
            checked[id] = event.detail.value;
            this.checked = checked;
        }

        this.dispatchEvent(new CustomEvent('select-change', {
            detail: { value: this.checked },
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }

    _clickEdit(id) {
        this.dispatchEvent(new CustomEvent('edit', {
            detail: { id: id },
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }

    _clickDelete(id) {
        this.dispatchEvent(new CustomEvent('delete', {
            detail: { id: id },
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }
}

customElements.define('custom-table', CustomTable);
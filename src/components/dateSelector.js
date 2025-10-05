import {LitElement, html, css} from 'lit';

import 'lit-flatpickr';

export class CustomDateSelector extends LitElement {
    static properties = {
        value: {type: String},
        name: {type: String}
    }
    static styles = css`
        lit-flatpickr {
            box-sizing: border-box;
            height: 40px;
            width: 100%;
            border-width: 1px;
            border-radius: 5px;
            font-size: 16px;
            line-height: 20px;
            padding: 0 5px;
            border: 1px solid #ddd;
        }
    `

    constructor() {
        super();

        this.name = '';
        this.value = '';
    }

    updated(updatedProperties) {
        if (updatedProperties.has('value') && this.value) {
            const date = new Date(this.value)
            this.shadowRoot.querySelector('#my-date-picker').setDate(date,true);
        }
    }

    render() {
        return html`
            <lit-flatpickr
                id="my-date-picker"
                .defaultDate=${this.value ? new Date(this.value) : ''}
                altInput
                altFormat="Y-m-d"
                dateFormat="Y-m-d"
                theme="material_orange"
                .onChange=${this._change}
            ></lit-flatpickr>
        `
    }

    _change = (date) => {
        const selectedDate = date[0] ? (new Date(date[0])).toString() : '';
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: selectedDate },
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }
}

customElements.define('custom-date-selector', CustomDateSelector);
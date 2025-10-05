import {LitElement, html, css} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';

import './button';

export class CustomCard extends LitElement {
    static properties = {
        data: {type: Object},
        config: {type: Array}
    }
    static styles = css`
        .card {
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 15px;
            max-width: 500px;
            box-shadow: 10px 10px 10px #ededed;
        }

        .card .data-container {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 15px;
        }

        .card .data-container .field-wrapper {
            flex-basis: 50%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 15px;
        }

        .card .data-container .field-wrapper .label {
            flex-basis: 100%;
            margin: 0;
            margin-bottom: 5px;
            white-space: collapse;
            color: #ddd;
            font-size: 12px;
        }

        .card .data-container .field-wrapper .value {
            flex-basis: 100%;
            margin: 0;
            white-space: collapse;
            font-size: 20px;
        }

        .card .data-container .button-wrapper {

        }
    `

    constructor() {
        super();
        updateWhenLocaleChanges(this);

        this.data = {};
        this.config = [];
    }

    render() {
        return html`
            <div class="card" @click=${this._cancelOutside}>
                <div class="data-container">
                    ${this.config.map((field) => html`
                        <div class="field-wrapper">
                            <p class="label">${field.label()}</p>
                            <p class="value">
                                ${field.render ? field.render(this.data[field.key]) : this.data[field.key]}
                            </p>
                        </div>
                    `)}
                </div>

                <div class="button-wrapper">
                    <custom-button type="primary" @click=${this._edit}>${msg('Edit')}</custom-button>
                    <custom-button type="secondary" @click=${this._delete}>${msg('Delete')}</custom-button>
                </div>
            </div>
        `
    }

    _edit() {
        this.dispatchEvent(new CustomEvent('edit', {
            detail: { id: this.data.id },
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }

    _delete() {
        this.dispatchEvent(new CustomEvent('delete', {
            detail: { id: this.data.id },
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }
}

customElements.define('custom-card', CustomCard);
import {LitElement, html, css} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';

import './icons/cancel-icon'

import { globalStyles } from '../styles/global-style';

export class CustomSelect extends LitElement {
    static properties = {
        options: {type: Array},
        value: {type: String},
        displayText: {type: Function},
        open: {type: Boolean},
        name: {type: String},
        clearable: {type: Boolean}
    }
    static styles = [globalStyles, css`
        .select-wrapper {
            color: #212121;
            box-sizing: border-box;
            position:relative;
            width: 100%;
        }
        .select-wrapper .input {
            height: 40px;
            width: 100%;
            border-width: 1px;
            border-radius: 5px;
            font-size: 14px;
            line-height: 28px;
            padding: 0 5px;
            border: 1px solid #ddd;
        }

        .select-wrapper .input:focus {
            outline-width: 0;
        }

        .select-wrapper .options-container {
            position:absolute;
            top: 32px;
            width: 100%;
            max-height: 200px;
            background-color: white;
            z-index: 2001;
            border-radius: 5px;
        }

        .select-wrapper .options-container .option {
            cursor: pointer;
            transition: 0.2s;
            height: 35px;
            display: flex;
            align-items: center;
            padding: 0 5px;
        }

        .select-wrapper .options-container .option.clear {
            color: #ff6200;
            font-size: 8px !important;
            height: 20px;
            justify-content: center
        }

        .select-wrapper .options-container .option-text {
            margin: 0;
            font-size: 16px;
        }

        .select-wrapper .options-container .option:hover {
            background-color: #efefef;
        }
    `]

    constructor() {
        super();
        updateWhenLocaleChanges(this);

        this.value = '';
        this.displayText = () => '';
        this.options = [];
        this.open = false;
        this.clearable = true;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('click', this._clickOutside)
    }

    disconnectedCallback() {
        window.removeEventListener('click', this._clickOutside)
        super.disconnectedCallback();
    }

    updated(updatedProperties) {
        if (updatedProperties.has('value') && (this.value || this.value === '')) {
            const selectedOption = this.options.find((option) => option.value === this.value) || {};

            this.displayText = selectedOption.label || (() => '');
        }
    }

    render() {
        return html`
            <div class="select-wrapper">
                <input 
                    class="input" 
                    .placeholder=${msg('Please select')}
                    .value=${this.displayText()} 
                    .name=${this.name}
                    readonly 
                    @click=${this._toggleOptions}
                />
                ${
                    this.open 
                    ?
                    (
                        html`
                        <div class="options-container">
                            ${this.options.map((option) => html`
                                <div class="option" @click=${() => this._selectOption(option.value)}>
                                    <p class="option-text">${option.label()}</p>
                                </div>
                            `)}
                            ${this.clearable
                            ?
                            (
                                html`
                                <div class="option clear" @click=${this._clear}>
                                    <p class="option-text">${msg('Clear')}</p>
                                </div>`
                            )
                            : ''
                            }
                            
                        </div>`
                    )
                    : ''
                }
                
            </div>
        `
    }

    _selectOption(value) {
        this.value = value;
        this.open = false;
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: value },
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }

    _clear(value) {
        this.value = '';
        this.open = false;
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: '' },
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }

    _toggleOptions() {
        this.open = !this.open;
    }

    _clickOutside = (event) => {
        const path = event.composedPath?.() ?? [];
        if (!path.includes(this)) {
            this.open = false;
        }
    }
}

customElements.define('custom-select', CustomSelect);
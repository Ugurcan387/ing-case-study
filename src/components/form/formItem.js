import {LitElement, html, css} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';

import { globalStyles } from '../../styles/global-style';

export class CustomFormItem extends LitElement {
    static properties = {
        label: {type: String},
        key: {type: String},
        valid: {type: Boolean},
        message: {type: String}
    }
    static styles = [globalStyles, css`
        .field-set {
            display: flex;
            flex-wrap: wrap;
            border: none;
            width: 100%;
            max-width: 450px;
            min-width: 250px;
            align-items: center;
            margin: auto auto 40px;
        }   

        @media(max-width: 750px) {
            .field-set {
                margin: auto auto 20px;
            } 
        }

        .field-set .label {
            flex-basis: 100%;
            font-size: 16px;
            margin-bottom: 8px;
        }

        .field-set .field-wrapper {
            flex-basis: 100%;
        }

        .field-set .field-message {
            height: 12px;
            flex-basis: 100%;
        }

        .field-set .field-message .valid-error{
            font-size: 12px;
            margin: 4px 0 0;
            color: red;
            flex-basis: 100%;
        }
    `]
    constructor() {
        super();
        updateWhenLocaleChanges(this);

        this.valid = true;
        this.message = '';
    }
    
    render() {
        return html`
            <fieldset class="field-set">
                <label class="label" for=${this.key}>${this.label}</label>

                <div class="field-wrapper">
                    <slot></slot>
                </div>

                <div class="field-message">
                    ${this.valid ? '' : html`
                        <p class="valid-error">${this.message()}</p>    
                    `}
                </div>
            </fieldset>
        `
    }
}

customElements.define('custom-form-item', CustomFormItem);
import {LitElement, html} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';

import './formItem';
import '../input';
import '../select';
import '../dateSelector';
import '../button'

import { globalStyles } from '../../styles/global-style';
import { formStyles } from '../../styles/form-style';

import { INPUT_TYPES } from '../../config/form.config';

export class CustomForm extends LitElement {
    static properties = {
        config: {type: Array},
        values: {type: Object},
        ruleMap: {type: Object},
        saveText: {type: String},
        cancelText: {type: String},
        hideCancel: {type: Boolean}
    }
    static styles = [globalStyles, formStyles];

    constructor() {
        super();
        updateWhenLocaleChanges(this);

        this.values = {};
        this.config = [];
        this.ruleMap = {};
        this.saveText = '';
        this.cancelText = '';
        this.hideCancel = false;
    }

    updated(updatedProperties) {
        if (updatedProperties.has('config') && this.config && this.config.length) {
            const ruleMap = {};
            const values = {};

            for (let index = 0; index < this.config.length; index++) {
                const field = this.config[index];
                ruleMap[field.key] = field.rules;
                values[field.key] = this.values[field.key] || '';
            }

            this.ruleMap = ruleMap;
            this.values = values;
        }
    }

    
    render() {
        return html`
            <div class="form-wrapper">
                <form class="form">
                    ${this.config.map((item) => html`
                            <custom-form-item
                                class="form-item"
                                id="${item.key}"
                                .label=${item.label()}
                                .key=${item.key}
                            >
                                ${this._renderItem(item, this.values)}
                            </custom-form-item>
                        `
                    )}
                </form>

                <div class="button-wrapper">
                    <custom-button type="primary" @click=${this._save}>${this.saveText || msg('Save')}</custom-button>
                    ${this.hideCancel ? '' : html`<custom-button type="secondary" @click=${this._cancel}>${this.cancelText || msg('Cancel')}</custom-button>`}
                </div>
            </div>
        `
    }

    _renderItem(item, values) {
        const {key, type, props} = item;
        switch(type) {
            case(INPUT_TYPES.INPUT):
                return html`
                    <custom-input 
                        .value=${values[key] || ''} 
                        .name=${key}
                        valid="true"
                        message=""
                        @change=${(event) => this._fieldChange(event, key)}
                    ></custom-input>
                `; 
            case(INPUT_TYPES.DATE):
                return html`
                    <custom-date-selector 
                        .value=${values[key] || ''} 
                        .name=${key}
                        valid="true"
                        message=""
                        @change=${(event) => this._fieldChange(event, key)}
                    ></custom-date-selector>
                `;
            case(INPUT_TYPES.SELECT):
                return html`
                    <custom-select 
                        .options=${props.options} 
                        .value=${values[key] || ''} 
                        .name=${key}
                        valid="true"
                        message=""
                        @change=${(event) => this._fieldChange(event, key)}
                    ></custom-select>
                `;
        }
    }

    _fieldChange(event, key) {
        const value = event.detail.value;
        this._validateField(key, value);
        this.values[key] = value;
    }

    _validateField(key, value) {
        const rules = this.ruleMap[key];
        if (rules && rules.length) {
            for (let index = 0; index < rules.length; index++) {
                const rule = rules[index];
                const element = this.renderRoot.querySelector('#'+key);

                if (!rule.validator(value)) {
                    element.valid = false;
                    element.message = rule.message;
                    return false;
                }
                else {
                    element.valid = true;
                    element.message = '';
                }
            }
        }
        return true;
    }

    _validateFields(values) {
        const keys = Object.keys(values);
        let areFieldsValid = true;
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const isValid = this._validateField(key, values[key]);
            if (!isValid) {
                areFieldsValid = false;
            }
        }

        return areFieldsValid;
    }

    _save() {
        if (!this._validateFields(this.values)) {
            return;
        }

        this.dispatchEvent(new CustomEvent('save', {
            detail: { value: this.values },
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }

    _cancel() {
        this.dispatchEvent(new CustomEvent('cancel', {
            detail: {},
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }
}

customElements.define('custom-form', CustomForm);
import {LitElement, html, css} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';

import './button';
import './icons/cancel-icon';

export class CustomPopup extends LitElement {
    static properties = {
        visible: {type: Boolean}
    }
    static styles = css`
        .popup-wrapper {
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
            top: 0;
            left: 0;
            z-index: 2002;
            background: rgba(0,0,0,0.3);
        }

        .popup {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            min-width: 250px;
            max-width: 450px;
            width: 100%;
            background-color: #fff;
            margin: 0 15px;
            border-radius: 5px;
        }

        .popup cancel-icon{
            position: absolute;
            top: 8px;
            right: 8px;
            cursor: pointer;
            color: #ff6200;
            transition: 0.2s;
        }

        .popup cancel-icon:hover{
            color: #ff995c;
        }

        .popup .popup-content {
            flex-basis: 100%;
        }

        .popup .button-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-basis: 100%;
            margin: 15px 0;
            gap: 15px;
        }
    `

    constructor() {
        super();
        updateWhenLocaleChanges(this);

        this.visible = false;
    }

    render() {
        return this.visible
               ? 
               (
                    html`
                        <div class="popup-wrapper" @click=${this._cancelOutside}>
                            <div class="popup" id="popup">
                                <cancel-icon @click=${this._cancel}></cancel-icon>

                                <span class="popup-content">
                                    <slot></slot>
                                </span>

                                <div class="button-wrapper">
                                    <custom-button type="primary" @click=${this._confirm}>${msg('Confirm')}</custom-button>
                                    <custom-button type="secondary" @click=${this._cancel}>${msg('Cancel')}</custom-button>
                                </div>
                            </div>
                        </div>
                    `
               )
               : ''
    }

    _confirm() {
        this.dispatchEvent(new CustomEvent('confirm', {
            detail: {},
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

    _cancelOutside(event) {
        const path = event.composedPath?.() ?? [];
        const popup = this.shadowRoot.querySelector('#popup')
        if (!path.includes(popup)) {
            this._cancel();
        }
    }
}

customElements.define('custom-popup', CustomPopup);
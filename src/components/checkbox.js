import {LitElement, html, css} from 'lit';

export class CustomCheckbox extends LitElement {
    static styles = css`
        .checkarea-wrapper {
            position: relative;
            height: 20px;
            width: 20px;
        }

        .checkarea input {
            position: absolute;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        .customcheck {
            position: absolute;
            top: 0;
            left: 0;
            height: 20px;
            width: 20px;
            background-color: white;
            border: 1px solid rgba(179, 179, 179, 0.7);
            border-radius: 30%;
        }

        .checkarea input:checked ~ .customcheck {
            background-color: #ff6200;
        }

        .customcheck:after {
            content: "";
            position: absolute;
            display: none;
        }

        .checkarea input:checked ~ .customcheck:after {
            display: block;
        }

        .checkarea .customcheck:after {
            left: 7px;
            top: 3px;
            width: 4px;
            height: 9px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    `
    static properties = {
        checked: {type: Boolean}
    }
    constructor() {
        super();

        this.checked = false;
    }

    render() {
        return html`
            <div class="checkarea-wrapper">
                <label class="checkarea">
                    <input type="checkbox" .checked=${this.checked} @change=${this._change} style="opacity: 0;">
                    <span class="customcheck"></span>
                </label>
            </div>
            
        `
    }

    _change(event) {
        this.checked = event.target.checked;
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.checked },
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }
}

customElements.define('custom-checkbox', CustomCheckbox);
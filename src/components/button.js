import {LitElement, html, css} from 'lit';

export class CustomButton extends LitElement {
    static properties = {
        type: String
    }
    static styles = css`
        .button {
            color: #ff6200;
            fill: #ff6200 !important;
            border: none;
            background-color: transparent;
            cursor: pointer;
            transition: 0.1s;
        }

        .button:hover {
            fill: #ff995c !important;
            color: #ff995c;
        }

        .button.primary {
            padding: 10px 20px;
            min-width: 90px;
            background-color: #ff6200;
            border: 1px solid #ff6200;
            color: #fff;
            border-radius: 5px;
        }

        .button.primary:hover {
            background-color: #ff995c;
            border: 1px solid #ff995c;
        }

        .button.secondary {
            padding: 10px 20px;
            min-width: 90px;
            border: 1px solid #ff6200;
            background-color: #fff;
            color: #ff6200;
            border-radius: 5px;
        }

        .button.secondary:hover {
            border: 1px solid #ff995c;
            color: #ff995c;
        }
    `

    constructor() {
        super();
        this.type = ''
    }

    render() {
        return html`
            <button class="button ${this.type}">
                <slot></slot>
            </button>
        `
    }
}

customElements.define('custom-button', CustomButton);
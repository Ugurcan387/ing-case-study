import {LitElement, html, css} from 'lit';

export class CustomInput extends LitElement {
    static properties = {
        value: {type: String},
        name: {type: String}
    }
    static styles = css`
        .input {
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

        .input:focus {
            outline-width: 0;
        }
    `

    constructor() {
        super();
        this.value = '';
        this.key = '';
    }

    render() {
        return html`
            <input 
                class="input"
                .name=${this.name}
                .value=${this.value} 
                @input=${this._change} 
            />
        `
    }

    _change(event) {
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: event.target.value },
            bubbles: true,
            composed: true,
            cancelable: true
        }));
    }
}

customElements.define('custom-input', CustomInput);
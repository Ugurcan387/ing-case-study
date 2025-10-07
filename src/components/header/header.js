import {LitElement, html} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';
import {Router} from '@vaadin/router';

import {connect} from 'pwa-helpers';
import { store } from '../../store';
import { languageActions } from '../../store/states/language-store';
import { LANGUAGE_ACTIONS } from '../../store/actionsTypes';

import '../button.js';
import '../icons/add-icon.js';

import { headerStyles } from '../../styles/header-styles';
import { globalStyles } from '../../styles/global-style';

const INGImage = new URL('./ing.png', import.meta.url).href;
const TRImage  = new URL('./tr.png',  import.meta.url).href;
const UKImage  = new URL('./uk.png',  import.meta.url).href;

const ADD_ROUTE = '/add';
const HOME_ROUTE = '/';

import { setLocale, getLocale } from "../../utils/locale";

export class CustomHeader extends connect(store)(LitElement) {
    static properties = {language: {type: String}, showAdd: {type: Boolean}};
    static styles = [headerStyles, globalStyles]

    constructor() {
        super();
        updateWhenLocaleChanges(this);

        const {LanguageReducer} = store.getState();
        this.language = LanguageReducer.language;
        this.showAdd = true;

        if (getLocale() !== this.language) {
            setLocale(this.language);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('vaadin-router-location-changed', this._determineButtonDisplay)
    }

    disconnectedCallback() {
        window.removeEventListener('vaadin-router-location-changed', this._determineButtonDisplay)
        super.disconnectedCallback();
    }

    stateChanged(state) {
        this.language = state.LanguageReducer.language;

        if (getLocale() !== this.language) {
            setLocale(this.language);
        }
    }
    
    render() {
        return html`<div class="custom-header">
                <div class="left" @click=${this._redirectHome}>
                    <img src=${INGImage} class="image" />
                    <p class="text">ING</p>
                </div>

                <div class="right">
                    ${this.showAdd 
                        ? html`
                            <custom-button class="button" @click=${this._redirectToAdd}>
                                <div class="button-content">
                                    <add-icon class="button-icon" ></add-icon>
                                    <p class="button-text">${msg('Add Employee')}</p>
                                </div>
                            </custom-button>` 
                        : ''
                    }
                    
                    <img  
                        src=${this._getImage()} 
                        class="flag"
                        @click=${this._changeLanguage} 
                    />
                </div>
            </div>
        `
    }

    _changeLanguage() {
        store.dispatch(languageActions.update({
            type: LANGUAGE_ACTIONS.CHANGE,
            value: this.language === 'en' ? 'tr' : 'en'
        }))
    }

    _getImage() {
        return this.language === 'en' ? UKImage : TRImage;
    }

    _redirectToAdd() {
        Router.go(ADD_ROUTE);
    }

    _redirectHome() {
        Router.go(HOME_ROUTE);
    }

    _determineButtonDisplay = (event) => {
        this.showAdd = event.detail.location.pathname !== ADD_ROUTE;
        this.requestUpdate();
    }
}


customElements.define('custom-header', CustomHeader);
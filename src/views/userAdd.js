import {LitElement, html, css} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';
import {Router} from '@vaadin/router';

import {connect} from 'pwa-helpers';
import { store } from '../store';
import { userActions } from '../store/states/user-store';
import { USER_ACTIONS } from '../store/actionsTypes';

import '../components/form/form';

import { formConfig } from '../config/form.config';

import { globalStyles } from '../styles/global-style';

export class UserAdd extends connect(store)(LitElement) {
    static styles = [globalStyles, css`
        .add-page-wrapper {
            width: 100%
        }   
        
        .add-page-wrapper .title {
            width: 100%;
            padding: 0;
            margin: 40px 20px;
            font-size: 40px;
            color: #ff6200;
        }

        @media(max-width: 850px) {
            .add-page-wrapper .title {
                text-align: center;
                margin: 20px 0;
                font-size: 30px;
                color: #ff6200;
            }
        }
    `]

    constructor() {
        super();
        updateWhenLocaleChanges(this);
    }
    
    render() {
        return html`
            <div class="add-page-wrapper">
                <p class="title">${msg('Add Employee')}</p>
                
                <custom-form 
                    .config=${formConfig}
                    @save=${this._save}
                    @cancel=${this._cancel}
                ></custom-form>
            </div>
        `
    }

    _save(event) {
        store.dispatch(userActions.update({
            type: USER_ACTIONS.CREATE,
            value: event.detail.value
        }));

        Router.go('/');

    }

    _cancel() {
        Router.go('/');
    }
}

customElements.define('user-add', UserAdd);
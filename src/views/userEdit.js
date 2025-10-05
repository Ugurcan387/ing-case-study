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

export class UserEdit extends connect(store)(LitElement) {
    static properties = {
        values: {type: Object},
        id: {type: String}
    }
    static styles = [globalStyles, css`
        .edit-page-wrapper {
            width: 100%
        }   
        
        .edit-page-wrapper .title {
            width: 100%;
            padding: 0;
            margin: 40px 20px;
            font-size: 40px;
            color: #ff6200;
        }

        @media(max-width: 850px) {
            .edit-page-wrapper .title {
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

        this.values = {};
        this.id = '';
    }

    onBeforeEnter(location) {
        this.id = location.params.user;
        const {UserReducer} = store.getState();
        this.values = UserReducer.data.find((entry) => entry.id === this.id);
    }
    
    render() {
        return html`
            <div class="edit-page-wrapper">
                <p class="title">${msg('Edit Employee')}</p>
                
                <custom-form 
                    .values=${this.values}
                    .config=${formConfig}
                    @save=${this._save}
                    @cancel=${this._cancel}
                ></custom-form>
            </div>
        `
    }

    _save(event) {
        store.dispatch(userActions.update({
            type: USER_ACTIONS.UPDATE,
            value: event.detail.value,
            id: this.id
        }));

        Router.go('/');

    }

    _cancel() {
        Router.go('/');
    }
}

customElements.define('user-edit', UserEdit);
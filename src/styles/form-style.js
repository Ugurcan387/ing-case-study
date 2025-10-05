import {css} from 'lit';

export const formStyles = css`
    .form-wrapper {
        margin: 20px 30px;
    }

    .form-wrapper .button-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
    }

    .form {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .form .form-item {
        flex-basis: 33%;
    }
`
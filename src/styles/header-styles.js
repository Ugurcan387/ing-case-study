import {css} from 'lit';

export const headerStyles = css`
    .custom-header {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 8px;

        height: 64px;
        width: 100%;
        box-shadow: 0 2px 2px 0px #eeeeee;

        cursor: default;
    }

    .custom-header .left {
        display: flex;
        justify-content: left;
        align-items: center;
        cursor: pointer;
    }

    .custom-header .left .image {
        height: 32px;
        width: auto;
    }

    .custom-header .left .text {
        font-weight: 700;
        font-size: 16px;
        margin-left: 8px;
    }

    .custom-header .right {
        display: flex;
        justify-content: right;
        align-items: center;
    }

    .custom-header .right .flag {
        height: 32px;
        width: auto;
        cursor: pointer;
    }

    .custom-header .right .button {
        margin-right: 16px;
    }

    .custom-header .right .button-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .custom-header .right .button-icon {
        margin-right: 6px;
    }

    @media(max-width: 750px) {
        .custom-header .right .button {
            margin-right: 0;
        }

        .custom-header .right .button-text {
            display: none;
        }

        .custom-header .left .text {
            display: none;
        }
    }
`
import {css} from 'lit';

export const tableStyle = css`
    .custom-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        background-color: #fff;
    }


    .custom-table .headers {
        border-bottom: 1px solid #ddd;
    }

    .custom-table .headers .column {
        white-space: nowrap;  
        padding: 25px 20px;
        color: #ff6200;
        text-align: center;
    }

    .custom-table .headers .column.action {
        position: sticky;
        background-color: #fff;
        z-index: 1;
        right: 0;
    }

    .custom-table .headers .column.select {
        position: sticky;
        background-color: #fff;
        z-index: 1;
        left: 0;
    }

    .custom-table .headers .column:not(:last-child) {
        margin-right: 16px;
    }

    .custom-table .row {
        text-align: center
    }

    .custom-table .row:not(:last-child) {
        border-bottom: 1px solid #ddd;
    }

    .custom-table .row .cell {
        white-space: nowrap;
        padding: 25px 20px;
        color: #565656;
    }

    .custom-table .row .cell.action {
        position: sticky;
        background-color: #fff;
        z-index: 1;
        right: 0;
    }

    .custom-table .row .cell.select {
        position: sticky;
        background-color: #fff;
        z-index: 1;
        left: 0;
    }

    .custom-table .icon {
        color: #ff6200;
        transition: 0.2s;
        cursor: pointer;
    }

    .custom-table .icon:hover {
        color: #ff995c;
    }
`
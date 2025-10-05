import {css} from 'lit';

export const overviewStyle = css`
    .overview-view {
        display: flex;
        justify-content: center;
        flex-wrap:wrap;
        width: 100%;
        overflow: hidden;
    }

    .overview-view .page-header {
        width: 100%;
        flex-basis: 100%;
        font-size: 32px;
        color: #ff6200;
        padding: 0;
        margin: 20px;
    }

    .overview-view .overview-table {
        flex-basis: 100%;
        margin: 20px;
        overflow-x: auto;
        width: 100% !important
    }

    .overview-view .card-wrapper {
        flex-basis: 100%;
        display: flex;
        flex-wrap: wrap;
        margin: 20px;
        width: 100%;
        gap: 15px;
    }

    .overview-view .card-wrapper .card{
        display: flex;
        justify-content: center;
        margin: auto;
    }

    @media(max-width: 1200px) {
        .overview-view .card-wrapper .card{
            flex-basis: 100%;
        }
    }

    .overview-view .toolbar {
        flex-basis: 100%;
        display: flex;
        align-items:center;
        justify-content: right;
    }

    .overview-view .toolbar .search {
        margin: 0;
        margin-right: 15px;
        color: #ff6200;
        cursor: pointer;
        transition: 0.2s;
    }

    .overview-view .toolbar .search:hover {
        color: #ff995c;
    }

    .overview-view .toolbar .search .arrow {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-top: 3px solid currentColor;
        border-right: 3px solid currentColor;
        border-radius: 2px;
        margin-left: 8px;
    }

    .overview-view .toolbar .search .arrow.up {
        transform: rotate(-45deg);
    }

    .overview-view .toolbar .search .arrow.down {
        transform: rotate(135deg);
    }

    .overview-view .toolbar .item {
        display: flex;
        width: 200px;
        align-items: center;
        margin-right: 15px;
        padding-left: 15px;
        color: #ff6200;
        border-left: 1px solid #ddd;
    }

    .overview-view .toolbar .item p{
        margin-right: 5px;
        width: 170px;
    }

    .popup-content-wrapper {
        margin: 20px 15px 10px;
    }

    .popup-header {
        color: #ff6200;
        font-size: 24px;
        margin: 0;
    }

    .popup-text {
        margin: 20px 0 0;
    }
`
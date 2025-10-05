import {css} from 'lit';

export const paginationStyles = css`
    .pagination {
        display: flex;
        justify-content: center;
        align-items:center;
        gap: 15px;
        margin: 10px 0;
    }

    .pagination .icon {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-top: 3px solid currentColor;
        border-right: 3px solid currentColor;
        border-radius: 2px;
        margin: 8px;
        color: #ff6200;
        cursor: pointer;
        transition: 0.2s;
    }

    .pagination .icon:hover {
        color: #ff995c;
    }

    .pagination .icon.disabled {
        color: #eee;
        cursor: default;
    }

    .pagination .previous {
        transform: rotate(-135deg);
    }

    .pagination .next {
        transform: rotate(45deg);
    }

    .pagination .page {
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #565656;
        width: 35px;
        height: 35px;
    }

    .pagination .page.active {
        background-color: transparent;
        border-radius: 50%;
        cursor: pointer;
    }

    .pagination .page.active:hover {
        color: #ff995c;
        transition: 0.2s;
    }


    .pagination .page.passive {
        cursor: default;
    }

    .pagination .page.active.current {
        color: #fff;
        background-color: #ff6200;
    }

    .pagination .page.active.current:hover {
        color: #fff;
        background-color: #ff995c;
    }
`
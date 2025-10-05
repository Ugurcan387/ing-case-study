import {css} from 'lit';

export const globalStyles = css`
    html {
        -webkit-box-sizing: border-box; 
        -moz-box-sizing: border-box; 
        box-sizing: border-box;
      }
      *, *:before, *:after {
        box-sizing: inherit;
      }
      body {
        margin: 0;
        padding: 0;
      }
`
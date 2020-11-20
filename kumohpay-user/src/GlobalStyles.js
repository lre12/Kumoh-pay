import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
   ${reset};
   * > body,
   * > body * {
      font-family: 'Nanum Gothic', sans-serif !important;
   }
   a{
       text-decoration:none;
       color:inherit;
   }
   *{
       box-sizing:boerder-box;
   }
   li, dt, dd {
      list-style:none;
   }
`;

export default GlobalStyles;
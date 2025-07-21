import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  
  body, html, * {
    -ms-overflow-style: none; 
    scrollbar-width: none;   
  }
  body::-webkit-scrollbar, html::-webkit-scrollbar, *::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;

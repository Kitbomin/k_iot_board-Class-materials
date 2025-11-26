//! global.ts

import { css, Global } from "@emotion/react"

export const GlobalStyle = () => (
  <Global 
    styles = {css`
    /* 
      ! 전체 선택자: 모든 요소를 가르킴(실제요소)
      > before, after - 해당 속성의 "가상요소"는 해당 * 전체 선택자 속성에 포함되지 않음  
      -> 그래서 가상 선택 이전, 이후를 모두 하나의 스타일로 통일할려고 밑에와 같은 작업을 함
    */
      *, *::before, *::after {
        margin: 0; padding: 0; box-sizing: border-box;
      }
      html, body, #root {
        height: 100%;
      }

      body {
        /* font - family */
        background: #f8fafc;
        color: #111827;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      ul {
        list-style: none;
      }

      :root {
        --primary: #4f46e5;
        --sidebar-width: 220px;
        --header-height: 60px;
        --footer-height: 50px;
      }
    `} />
)
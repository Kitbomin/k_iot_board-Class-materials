/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import {css} from "@emotion/react"
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

function Layout({ children }: {children: React.ReactNode} ) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  }


  return (
    <div css={layoutStyle}>
      <Header onToggleSidebar={handleToggleSidebar}/>
      <div css={contentStyle}>
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar}/>

        <main css={mainStyle}>{children}</main>
      </div>
      <Footer />

    </div>
  )
}

export default Layout

const layoutStyle = css`
  display: grid;
  flex-direction: column;
  height: 100vh;
  
  /* 행 높이 설정: 헤더[높이값(고정)], 메인[가변(남은 길이)], 푸터[높이값(고정)] */
  /* grid-template-rows: var(--header-height) 1fr var(--footer-height); */

  /* 열 너비 설정: 사이드바[너비값(고정)], 메인[가변(남은 길이)] */
  /* grid-template-columns: var(--sidebar-width) 1fr; */

  /* 위의 template 행과 열의 공간을 어떤 html 코드가 사용할 것인지 특정하는 코드 */
  /* grid-template-areas: "header header" "sidebar main" "footer footer"; */

  /* 폭이 좁아지면 grid가 자동으로 배치됨 */
  /* > header {
    grid-area: header;
  }

  > aside {
    grid-area: sidebar;
  }

  > main {
    grid-area: main;
    overflow-y: auto;
    padding: 1rem;
  }

  > footer {
    grid-area: footer;
  } */

`;


const contentStyle =  css`
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  transition: all 0.25s ease;
`;

const mainStyle = css`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;



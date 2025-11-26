/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react'

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}


function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside css={sidebarStyle(isOpen)}>
      <div className='sidebar-header'>
        <span>메뉴</span>
        <button className='close' onClick={onClose}>❌</button>
      </div>
      <nav className='items'>
        <a>Dashboard</a>
        <a>게시판</a>
        <a>사용자관리</a>
        <a>설정</a>
      </nav>
    </aside>
  )
}

export default Sidebar

const sidebarStyle = (isOpen: boolean) => css`
  display: flex;
  flex-direction: column;

  /* 태그 요소 위치를 결정하는 top, right, bottom, left 축약 속성 */
  inset: 0 auto 0 0;

  width: ${isOpen ? "240px": "0px"};
  min-width: 0;
  overflow: hidden;

  background: white;
  border-right: 1px solid #e5e7eb;
  
  transform: translateX(${isOpen ? "0" : "-100%"});
  transition: transform 0.25s ease;

  /* shrink: width 유지 불가 판단시 -> 줄바꿈 발생 (아래로 떨어짐) */
  /* flex-shrink: 0; */

  .sidebar-header {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .close {
    margin-left: auto;
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
  }

  .items {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
  }


  a {
    padding: 0.75rem;
    border-radius: 8px;
    cursor: pointer;;

    &:hover {
      background: var(--primary);
      color: white;
    }
  }
`;
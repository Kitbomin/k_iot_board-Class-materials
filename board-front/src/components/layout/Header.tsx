/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import React from 'react'

interface HeaderProps {
  onToggleSidebar: () => void;
}

function Header({onToggleSidebar}: HeaderProps) {
  return (
    <header css={headerStyle}>
      <div className="sidebar-btn" onClick={onToggleSidebar}>
        <div className="hamburger hamburger1"></div>
        <div className="hamburger hamburger2"></div>
        <div className="hamburger hamburger3"></div>
      </div>
      
      <h1>Board</h1>
      <div className="right">Login</div>
    </header>
  )
}

export default Header

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;

  .hamburger {
    width: 25px;
    border: 1.9px solid black;
    transition: width 0.2s ease;
  }

  .sidebar-btn {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .sidebar-btn,
  .right {
    cursor: pointer;
  }

  .sidebar-btn:hover > .hamburger2 {
    width: 15px;
  }

  h1 {
    text-align: center;
    color: var(--primary);
  }


`;
import React from 'react';

export default function Header(){
  return (
    <header className="header">
      <div className="header-left">
        <div className="avatar">ร้าน</div>
        <div>
          <div className="greeting">สวัสดี, <strong>เจ้าของร้าน</strong></div>
          <div className="muted">จัดการสต๊อกได้ง่าย</div>
        </div>
      </div>
      <div className="header-right">
        <button className="icon-btn">⚙️</button>
      </div>
    </header>
  );
}

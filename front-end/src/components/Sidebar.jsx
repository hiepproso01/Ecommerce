import React from 'react';
import { BsGrid1X2Fill,BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsCardText } from 'react-icons/bs';
import  logo from "../img/logo.png"
const Sidebar = ({ openSidebarToggle }) => {
  
  return (
    <aside
      id="sidebar"
      className={`sidebar ${openSidebarToggle ? 'shifted' : ''}`}
    >
      <div className='sidebar-header'>
      <img src={logo} alt='Logo' className='logo' />
        {/* <button onClick={OpenSidebar} className='md:hidden'>
          &times;
        </button> */}
      </div>
      <ul className='sidebar-list'>
        
        <li className='sidebar-item'>
          <a href="/product" className='flex-center1'>
            <BsCardText className='icon' /> Quản lý sản phẩm
          </a>
        </li>
        <li className='sidebar-item'>
          <a href="/category" className='flex-center1'>
            <BsFillArchiveFill className='icon' /> Quản lý danh mục
          </a>
        </li>
        <li className='sidebar-item'>
          <a href="/supplier" className='flex-center1'>
            <BsFillGrid3X3GapFill className='icon' /> Quản lý nhà cung cấp
          </a>
        </li>
        <li className='sidebar-item'>
          <a href="" className='flex-center1'>
            <BsPeopleFill className='icon' /> Quản lý khách hàng
          </a>
        </li>
        <li className='sidebar-item'>
          <a href="" className='flex-center1'>
            <BsListCheck className='icon' /> Quản lý đơn hàng
          </a>
        </li>
        <li className='sidebar-item'>
          <a href="" className='flex-center1'>
            <BsMenuButtonWideFill className='icon' /> Quản lý báo cáo
          </a>
        </li>
        <li className='sidebar-item'>
          <a href="" className='flex-center1'>
            <BsFillGearFill className='icon' /> Cài đặt
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

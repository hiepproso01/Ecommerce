import React from 'react';
import { Link } from 'react-router-dom';
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsCardText } from 'react-icons/bs';
import logo from "../img/logo.png";

const Sidebar = ({ openSidebarToggle }) => {
  return (
    <aside
      id="sidebar"
      className={`sidebar ${openSidebarToggle ? 'shifted' : ''}`}
    >
      <div className='sidebar-header'>
        <img src={logo} alt='Logo' className='logo' />
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-item'>
          <Link to="/product" className='flex-center1'>
            <BsCardText className='icon' /> Quản lý sản phẩm
          </Link>
        </li>
        <li className='sidebar-item'>
          <Link to="/category" className='flex-center1'>
            <BsFillArchiveFill className='icon' /> Quản lý danh mục
          </Link>
        </li>
        <li className='sidebar-item'>
          <Link to="/supplier" className='flex-center1'>
            <BsFillGrid3X3GapFill className='icon' /> Quản lý nhà cung cấp
          </Link>
        </li>
        <li className='sidebar-item'>
          <Link to="/categorygroup" className='flex-center1'>
            <BsFillGrid3X3GapFill className='icon' /> Quản lý nhóm danh mục
          </Link>
        </li>
        <li className='sidebar-item'>
          <Link to="/customer" className='flex-center1'>
            <BsPeopleFill className='icon' /> Quản lý khách hàng
          </Link>
        </li>
        <li className='sidebar-item'>
          <Link to="" className='flex-center1'>
            <BsListCheck className='icon' /> Quản lý đơn hàng
          </Link>
        </li>
        <li className='sidebar-item'>
          <Link to="" className='flex-center1'>
            <BsMenuButtonWideFill className='icon' /> Quản lý báo cáo
          </Link>
        </li>
        <li className='sidebar-item'>
          <Link to="" className='flex-center1'>
            <BsFillGearFill className='icon' /> Cài đặt
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
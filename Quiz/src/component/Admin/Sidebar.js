import "react-pro-sidebar/dist/css/styles.css";
import { NavLink, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaGem,
  FaGithub,
  FaFacebook,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import sidebarBg from "../../assets/backGroundSky.jpg";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { useSSR } from "react-i18next";
import { useState } from "react";

const Sidebar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  return (
    <div className="sidebar">
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={false}
      >
        <SidebarHeader className="backToHome">
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <NavLink to="/" className="nav-link">
              Quiz
            </NavLink>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaTachometerAlt />}>
              Dashboard
              <Link to="/admin" />
            </MenuItem>
            {/* <MenuItem icon={<FaGem />}>Component</MenuItem> */}
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              suffix={<span className="badge yellow">3</span>}
              title="Features"
              icon={<FaRegLaughWink />}
            >
              <MenuItem>
                Quản lý User
                <Link to="manage-user" />
              </MenuItem>
              <MenuItem>
                Quản lý bài Quiz
                <Link to="manage-quiz" />
              </MenuItem>
              <MenuItem>
                Quản lý câu hỏi
                <Link to="manage-question" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/ND-Long/React-Ultimate--hoidanit/tree/prod/Quiz"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                className="mx-3"
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Source
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;

/* eslint-disable react/prop-types */
/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
*/

import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  DollarOutlined,
  FileImageOutlined,
  FundOutlined,
  IdcardOutlined,
  PieChartOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

function Sidenav({ color }) {
  const [selectedKey, setSelectedKey] = useState("1");

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const menuItems = [
    {
      key: "/dashboard",
      label: (
        <NavLink to="/dashboard">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "/dashboard" ? "#f0f2f5" : "",
            }}
          >
            {dashboard}
          </span>
          <span className="label">Dashboard</span>
        </NavLink>
      ),
    },
    {
      key: "/genre",
      label: (
        <NavLink to="/genre">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "/genre" ? "#f0f2f5" : "",
            }}
          >
            {dashboard}
          </span>
          <span className="label">Genre</span>
        </NavLink>
      ),
    },
    {
      key: "/playlist",
      label: (
        <NavLink to="/playlist">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "/playlist" ? "#f0f2f5" : "",
            }}
          >
            <FileImageOutlined />
          </span>
          <span className="label">Playlist</span>
        </NavLink>
      ),
    },
    {
      key: "/koleksi",
      label: (
        <NavLink to="/koleksi">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "/koleksi" ? "#f0f2f5" : "",
            }}
          >
            <ShoppingCartOutlined />
          </span>
          <span className="label">Collection</span>
        </NavLink>
      ),
    },
    {
      key: "/download",
      label: (
        <NavLink to="/download">
          <span
            className="icon"
            style={{
              backgroundColor: selectedKey === "/download" ? "#f0f2f5" : "",
            }}
          >
            <UnorderedListOutlined />
          </span>
          <span className="label">Download</span>
        </NavLink>
      ),
    },
  ];

  const handleMenuKey = (item) => {
    setSelectedKey(item.key);
  };

  return (
    <>
      <div className="brand">
  <span style={{ color: "#ff4d4f", fontSize: "24px", fontWeight: "bold" }}>MyTube</span>
</div>
      <hr />
      <Menu
        theme="light"
        mode="inline"
        items={menuItems}
        selectedKeys={[selectedKey]}
        onSelect={handleMenuKey}
      />
    </>
  );
}

export default Sidenav;

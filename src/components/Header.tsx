import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  position: absolute;
  top: 0;
  right: 1rem;
`;

const MenuItem = styled.li`
  padding: 0.5rem;
  font-size: 0.875rem;
`;

const Header = props => {
  return (
    <Menu>
      <MenuItem>
        <Link to="/">Home</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/locations">Locations</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/settings">Settings</Link>
      </MenuItem>
    </Menu>
  );
};

export default Header;

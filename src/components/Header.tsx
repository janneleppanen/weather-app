import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withNamespaces } from "react-i18next";

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

const Header = ({ t }) => {
  return (
    <Menu>
      <MenuItem>
        <Link to="/">{t("navigation.home")}</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/locations">{t("navigation.locations")}</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/settings">{t("navigation.settings")}</Link>
      </MenuItem>
    </Menu>
  );
};

export default withNamespaces()(Header);

import * as React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { withNamespaces } from "react-i18next";

import { ReactComponent as BookmarksSVG } from "../images/icons/star.svg";
import { ReactComponent as SettingsSVG } from "../images/icons/settings.svg";
import { Container } from "../common";

const iconStyles = css`
  width: 1.25rem;
  height: 1.25rem;
  fill: currentColor;
  transition: all 0.1s;
  &:hover {
    transform: scale(1.2);
  }
`;

const MenuWrapper = styled.header`
  background-color: ${props => props.theme.headerBackground};
`;

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 0.5rem;
  display: flex;
  justify-content: flex-end;
  color: white;
`;

const MenuItem = styled.li`
  padding: 1rem 0.75rem;
  font-size: 0.875rem;
`;

const MenuLink = styled(Link)`
  color: ${props => props.theme.headerText};
  display: flex;
  align-items: center;
`;

const BookmarkIcon = styled(BookmarksSVG)`
  ${iconStyles}
`;

const SettingsIcon = styled(SettingsSVG)`
  ${iconStyles}
`;

interface Props {
  t: Function;
}

const Header = (props: Props) => {
  // const { t } = props;
  return (
    <MenuWrapper>
      <Container>
        <Menu>
          <MenuItem>
            <MenuLink to="/bookmarks">
              <BookmarkIcon />
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/settings">
              <SettingsIcon />
            </MenuLink>
          </MenuItem>
        </Menu>
      </Container>
    </MenuWrapper>
  );
};

export default withNamespaces()(Header);

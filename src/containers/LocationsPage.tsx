import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "lodash/fp";

import { Container, Notice } from "../common";

interface Props {
  bookmarks: Bookmarks;
  t: any;
}

class LocationsPage extends React.Component<Props, {}> {
  public render() {
    const { bookmarks, t } = this.props;
    return (
      <Container>
        {bookmarks.length === 0 && (
          <Notice centerText>{t("locations.empty")}</Notice>
        )}

        {bookmarks.length > 0 && this.renderBookmarkList(bookmarks)}
      </Container>
    );
  }

  public renderBookmarkList(bookmarks: Bookmarks) {
    return (
      <ul>
        {bookmarks.map((bookmark: string) => (
          <li key={bookmark}>
            <Link to={`/locations/${bookmark}`}>{bookmark}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = ({ bookmarks }) => ({ bookmarks });

export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(LocationsPage);

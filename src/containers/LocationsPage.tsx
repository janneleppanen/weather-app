import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Container, Notice } from "../common";

interface Props {
  bookmarks: Bookmarks;
}

class LocationsPage extends React.Component<Props, {}> {
  public render() {
    const { bookmarks } = this.props;
    return (
      <Container>
        {bookmarks.length === 0 && (
          <Notice centerText>You don't have any bookmarks</Notice>
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

export default connect(mapStateToProps)(LocationsPage);

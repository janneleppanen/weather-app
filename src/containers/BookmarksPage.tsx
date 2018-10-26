import * as React from "react";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import { compose } from "lodash/fp";
import { Link } from "react-router-dom";

import BookmarkLink from "../components/BookmarkLink";
import { Container, Notice } from "../common";

interface Props {
  bookmarks: Bookmarks;
  t: any;
}

class BookmarksPage extends React.Component<Props, {}> {
  public render() {
    const { bookmarks, t } = this.props;
    return (
      <Container>
        {bookmarks.length === 0 ? (
          <Notice centerText>
            <p>{t("bookmarks.empty")}</p>
            <p>
              <Link to="/">{t("bookmarks.search")}</Link>
            </p>
          </Notice>
        ) : (
          <React.Fragment>
            <h1>{t("bookmarks.title")}</h1>
            {this.renderBookmarkList(bookmarks)}
          </React.Fragment>
        )}
      </Container>
    );
  }

  public renderBookmarkList(bookmarks: Bookmarks) {
    return (
      <div>
        {bookmarks.map((bookmark: string) => (
          <BookmarkLink key={bookmark} to={`/locations/${bookmark}`}>
            {bookmark}
          </BookmarkLink>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ bookmarks }) => ({ bookmarks });

export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(BookmarksPage);

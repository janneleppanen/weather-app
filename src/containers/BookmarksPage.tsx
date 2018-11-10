import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from "react-i18next";
import { Link } from "react-router-dom";

import BookmarkLink from "../components/BookmarkLink";
import SubHeader from "../components/SubHeader";
import { Container, Notice } from "../common";
import { displayTemperature } from "../utils/temperature";

interface Props {
  bookmarks: Bookmarks;
  forecast: {
    loading: boolean;
    weather: Array<Weather> | null;
  };
  temperatureScale: TemperatureScaleSetting;
  t: i18nT;
}

class BookmarksPage extends React.Component<Props, {}> {
  public render() {
    const { bookmarks, t } = this.props;
    return (
      <React.Fragment>
        <SubHeader backTo="/locations" title={t("bookmarks.title")} />
        <Container padded>
          {bookmarks.length === 0 ? (
            <Notice centerText>
              <p>{t("bookmarks.empty")}</p>
              <p>
                <Link to="/">{t("bookmarks.search")}</Link>
              </p>
            </Notice>
          ) : (
            this.renderBookmarkList(bookmarks)
          )}
        </Container>
      </React.Fragment>
    );
  }

  public renderBookmarkList(bookmarks: Bookmarks) {
    return (
      <div>
        {bookmarks.map((bookmark: string) => this.renderBookmark(bookmark))}
      </div>
    );
  }

  renderBookmark = bookmark => {
    const forecast = this.props.forecast.weather[bookmark];
    const temperature = forecast.list[0].main.temp;
    const { temperatureScale } = this.props;

    return (
      <BookmarkLink key={bookmark} to={`/locations/${bookmark}`}>
        {bookmark}{" "}
        <small>{displayTemperature(temperature, temperatureScale)}</small>
      </BookmarkLink>
    );
  };
}

const mapStateToProps = ({
  bookmarks,
  forecast,
  settings: { temperature }
}) => ({ bookmarks, forecast, temperatureScale: temperature });

export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(BookmarksPage);

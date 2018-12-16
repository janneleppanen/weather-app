import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import { ReactComponent as Drawing } from "../images/drawings/missed-chances.svg";
import { AppName } from "../config/constants";
import BookmarkLink from "../components/BookmarkLink";
import SubHeader from "../components/SubHeader";
import { Container, Notice, AppContent, RemoveButton } from "../common";
import { displayTemperature } from "../utils/temperature";
import { removeBookmark } from "../redux/BookmarkReducer";

const DrawingContainer = styled.div`
  max-width: 200px;
  margin: 3rem auto 1rem auto;
  opacity: 0.8;
  ${props => props.theme.drawingEffect}
`;

const MissedChancesDrawing = styled(Drawing)`
  max-width: 100%;
  height: auto;
`;

const BookmarkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const BookmarkListItem = styled.li`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.borderColor};
`;

const BookmarkListLink = styled(BookmarkLink)`
  flex: 1;
`;

interface Props {
  bookmarks: Array<Bookmark>;
  forecast: {
    loading: boolean;
    weather: Array<Weather> | null;
  };
  temperatureScale: TemperatureScaleSetting;
  t: i18nT;
  removeBookmark: Function;
}

class BookmarksPage extends React.Component<Props, {}> {
  public render() {
    const { bookmarks, t } = this.props;
    return (
      <AppContent>
        <Helmet>
          <title>
            {t("bookmarks.title")} | {AppName}
          </title>
        </Helmet>

        <SubHeader backTo="/locations" title={t("bookmarks.title")} />

        {bookmarks.length === 0 ? (
          <Container padded textAlignCenter>
            <Notice centerText>
              <p>{t("bookmarks.empty")}</p>
              <p>
                <Link to="/">{t("bookmarks.search")}</Link>
              </p>
              <DrawingContainer>
                <MissedChancesDrawing />
              </DrawingContainer>
            </Notice>
          </Container>
        ) : (
          <Container padded>{this.renderBookmarkList(bookmarks)}</Container>
        )}
      </AppContent>
    );
  }

  public renderBookmarkList(bookmarks: Array<Bookmark>) {
    return (
      <BookmarkList>
        {bookmarks.map((bookmark: string) => this.renderBookmark(bookmark))}
      </BookmarkList>
    );
  }

  renderBookmark = (bookmark: Bookmark) => {
    const forecast = this.props.forecast.weather[bookmark];
    const temperature = forecast ? forecast.list[0].main.temp : null;
    const { temperatureScale } = this.props;

    return (
      <BookmarkListItem key={bookmark}>
        <BookmarkListLink to={`/locations/${bookmark}`}>
          {bookmark}{" "}
          {temperature && (
            <small>{displayTemperature(temperature, temperatureScale)}</small>
          )}
        </BookmarkListLink>
        <RemoveButton
          onClick={() => {
            this.props.removeBookmark(bookmark);
          }}
        />
      </BookmarkListItem>
    );
  };
}

const mapStateToProps = ({ bookmarks, forecast, settings }: GlobalState) => ({
  bookmarks,
  forecast,
  temperatureScale: settings.temperatureScale
});

export default compose(
  withNamespaces(),
  connect(
    mapStateToProps,
    { removeBookmark }
  )
)(BookmarksPage);

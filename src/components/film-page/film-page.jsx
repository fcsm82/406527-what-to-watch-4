import React, {PureComponent} from "react";
import {Link} from "react-router-dom";

import {connect} from "react-redux";

import PropTypes from "prop-types";
import {filmPropTypes, commentPropTypes} from "../../utils/proptypes";

// import {getAppLoadingStatus} from "../../redux/reducers/data/selectors.js";

import {Operation as DataOperation} from "../../redux/reducers/data/data.js";
import {getFilms, getComments} from "../../redux/reducers/data/selectors.js";

import withActiveTab from "../hocs/with-active-tab/with-active-tab.js";

// import Loader from "../loader/loader.jsx";
import SvgContainer from "../svg-container/svg-container.jsx";
import Logo from "../logo/logo.jsx";
import UserBlock from "../user-block/user-block.jsx";
import MyListButton from "../my-list-button/my-list-button.jsx";
import Tabs from "../tabs/tabs.jsx";
import FilmsList from "../films-list/films-list.jsx";
import Footer from "../footer/footer.jsx";

import {AppRoute} from "../../consts";
import {getSimilarFilms} from "../../utils/utils.js";

const TabsWrapped = withActiveTab(Tabs);

class FilmPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadComments(this.props.film.id);
  }

  render() {
    const {film, films, comments} = this.props;

    const {
      color,
      name,
      genre,
      released,
      poster,
      backgroundImg,
    } = film;

    return (
      <>
        <SvgContainer />

        <section className="movie-card movie-card--full" style = {{background: color}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={backgroundImg} alt={name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <Link
                  to={AppRoute.ROOT}
                  className="logo__link"
                >
                  <Logo/>
                </Link>
              </div>

              <UserBlock/>

            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{released}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link to={`${AppRoute.FILMS}/${film.id}${AppRoute.PLAYER}`}
                    className="btn btn--play movie-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>

                  <MyListButton film = {film}/>

                  <Link
                    to = {AppRoute.REVIEW}
                    className="btn movie-card__button"
                  >
                    Add review
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={poster} alt={`${poster} poster`} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <TabsWrapped
                  film = {film}
                  comments = {comments}
                />

              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__movies-list">
              <FilmsList films = {getSimilarFilms(films, film)}/>
            </div>
          </section>

          <Footer/>
        </div>
      </>
    );
  }
}

FilmPage.propTypes = {
  // isAppLoading: PropTypes.bool.isRequired,
  film: PropTypes.shape(filmPropTypes).isRequired,
  films: PropTypes.arrayOf(PropTypes.shape(filmPropTypes)).isRequired,
  loadComments: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentPropTypes)).isRequired,
};

const mapStateToProps = (state) => {

  return {
    // isAppLoading: getAppLoadingStatus(state),
    films: getFilms(state),
    comments: getComments(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadComments: (id) => dispatch(DataOperation.loadComments(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);
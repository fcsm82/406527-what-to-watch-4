import React, {PureComponent} from "react";
import {connect} from "react-redux";

import PropTypes from "prop-types";
import {filmPropTypes, commentPropTypes} from "../../utils/proptypes";

import {getAppLoadingStatus} from "../../redux/reducers/data/selectors.js";

import Overview from "./overview/overview.jsx";
import Details from "./details/details.jsx";
import Reviews from "./reviews/reviews.jsx";
import {Tab} from "../../consts.js";


class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.tabs = Object.values(Tab);
  }

  render() {
    const {film, comments, activeTab, onTabClick} = this.props;

    return (
        <>
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                {this.tabs.map((tab) => {
                  return (
                    <li
                      key={tab}
                      className={`movie-nav__item ${tab === activeTab ? `movie-nav__item--active` : ``}`}>
                      <a
                        href="#"
                        className="movie-nav__link"
                        onClick={(evt) => onTabClick(evt.target.textContent)}
                      >
                        {tab}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {
              this._renderActiveTab(film, comments, activeTab)
            }
        </>
    );
  }

  _renderActiveTab(film, comments, activeTab) {
    switch (activeTab) {
      case Tab.OVERVIEW:
        return <Overview film = {film}/>;
      case Tab.DETAILS:
        return <Details film = {film}/>;
      case Tab.REVIEWS:
        return <Reviews
          comments = {comments}
        />;
      default:
        return ``;
    }
  }
}

Tabs.propTypes = {
  film: PropTypes.shape(filmPropTypes).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentPropTypes)).isRequired,
  onTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {

  return {
    isAppLoading: getAppLoadingStatus(state),
    // comments: getComments(state)
  };
};

export default connect(mapStateToProps)(Tabs);

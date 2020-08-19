import React from "react";
import FavoritesLayout from "./FavoritesLayout";

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      newItem: "",
      list: [],
    };
    this.addWidget = this.addWidget.bind(this);
  }

  addWidget() { 
    this.setState({
      list: [...this.state.list, this.props.favoritesWidget]
    })
  }

  render() {
    return (
      <div>
        <FavoritesLayout
          list={this.state.list}
          addWidget={this.addWidget}
          handleSearchOpen={this.props.handleSearchOpen}
          openSearch={this.props.openSearch}
          handleNavClick={this.props.handleNavClick}
          loadWeather={this.props.loadWeather}
          favoritesWidget={this.props.favoritesWidget}
        />
      </div>
    );
  }
}

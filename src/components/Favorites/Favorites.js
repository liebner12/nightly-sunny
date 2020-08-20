import React from "react";
import FavoritesLayout from "./FavoritesLayout";

export default function WeatherLayout(props) {
  
  return (
    <div>
      <FavoritesLayout
        favList={props.favList}
        handleSearchOpen={props.handleSearchOpen}
        openSearch={props.openSearch}
        handleNavClick={props.handleNavClick}
        loadWeather={props.loadWeather}
        favoritesWidget={props.favoritesWidget}
        weatherIcon={props.weatherIcon}
      />
    </div>
  );
}

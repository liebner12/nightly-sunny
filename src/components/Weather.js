import React from "react";
import WeatherLayout from "./Main/WeatherLayout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchOverlay from "./Main/SearchOverlay";
import Navbar from "./Main/Navbar";
import tempHourly from "./Main/ResponseData/TempHourly";
import setTempHourly from "./Main/ResponseData/SetTempHourly";
import tempNextDays from "./Main/ResponseData/TempNextDays";
import setTempNextDays from "./Main/ResponseData/SetTempNextDays";
import favoritesWidget from "./Favorites/FavoritesWidget";
import FavoritesLayout from "./Favorites/FavoritesLayout";
import {
  faCloudSun,
  faCloudRain,
  faSun,
  faCloudShowersHeavy,
  faSnowflake,
  faSmog,
  faMoon,
  faCloudMoon,
  faCloud,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
      date: "01.01",
      hour: "00:00",
      city: "Warsaw",
      country: "PL",
      temp: 0,
      navbarValue: 0,
      error: false,
      warning: false,
      weatherId: 201,
      icon: "faCloudSun",
      openSearch: false,
      tempMin: 0,
      tempMax: 0,
      weatherType: "clouds",
      details: [
        { humidity: 0 },
        { pressure: 0 },
        { feelsLike: 0 },
        { windDeg: 0 },
        { windSpeed: 0 },
        { visibility: 0 },
      ],
      favoritesWidget,
      tempHourly,
      tempNextDays,
      favList: [],
    };
    this.handleDeletion = this.handleDeletion.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getWeatherByLoc);
    if (window.location.href.split("/")[3] === "favorites") {
      this.setState({ navbarValue: "favorites" });
    }
    if (localStorage != null) {
      const list = localStorage.getItem("list");
      this.setState({ favList: list == null ? [] : JSON.parse(list) });
    }
  }

  getWeatherByLoc = async (position) => {
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
    );
    const response = await api_call.json();
    this.getResults(response);
  };

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    if (city !== "") {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
      );
      const response = await api_call.json();
      if (response.cod === "404") {
        this.setState({
          error: true,
        });
      } else {
        this.state.navbarValue === "favorites"
          ? this.addFavorite(response)
          : this.getResults(response);
      }
    }
  };

  addFavorite(response) {
    if (
      !this.state.favList.some((item) => item[0].city === response.city.name)
    ) {
      this.setState({
        favoritesWidget: [
          {
            date: this.toDate(response.list[0].dt_txt),
            hour: this.toHour(response.list[0].dt_txt),
            city: response.city.name,
            temp: this.toCelsius(response.list[0].main.temp),
            weatherId: response.list[0].weather[0].id,
            weatherType: response.list[0].weather[0].main,
          },
          {
            favoritesTempNextDays: [
              {
                date: this.toDate(response.list[8].dt_txt),
                hour: this.toHour(response.list[8].dt_txt),
                temp: this.toCelsius(response.list[8].main.temp),
                weatherId: response.list[8].weather[0].id,
              },
              {
                date: this.toDate(response.list[16].dt_txt),
                hour: this.toHour(response.list[16].dt_txt),
                temp: this.toCelsius(response.list[16].main.temp),
                weatherId: response.list[16].weather[0].id,
              },
              {
                date: this.toDate(response.list[24].dt_txt),
                hour: this.toHour(response.list[24].dt_txt),
                temp: this.toCelsius(response.list[24].main.temp),
                weatherId: response.list[24].weather[0].id,
              },
              {
                date: this.toDate(response.list[32].dt_txt),
                hour: this.toHour(response.list[32].dt_txt),
                temp: this.toCelsius(response.list[32].main.temp),
                weatherId: response.list[32].weather[0].id,
              },
            ],
          },
        ],
      });
      this.setState({
        favList: [...this.state.favList, this.state.favoritesWidget],
      });
      localStorage.setItem("list", JSON.stringify(this.state.favList));
    } else {
      this.setState({
        warning: true,
      });
    }
  }

  getResults(response) {
    this.setState({
      date: this.toDate(response.list[0].dt_txt),
      hour: this.toHour(response.list[0].dt_txt),
      city: response.city.name,
      temp: this.toCelsius(response.list[0].main.temp),
      tempMin: this.toCelsius(response.list[0].main.temp_min),
      tempMax: this.toCelsius(response.list[0].main.temp_max),
      weatherId: response.list[0].weather[0].id,
      weatherType: response.list[0].weather[0].main,
      details: [
        { humidity: response.list[0].main.humidity },
        { pressure: response.list[0].main.pressure },
        { feelsLike: this.toCelsius(response.list[0].main.feels_like) },
        { windDeg: response.list[0].wind.deg },
        { windSpeed: response.list[0].wind.speed },
        { visibility: this.toKm(response.list[0].visibility) },
      ],
      tempHourly: setTempHourly(
        response,
        this.toCelsius,
        this.toDate,
        this.toHour
      ),
      tempNextDays: setTempNextDays(
        response,
        this.toCelsius,
        this.toDate,
        this.toHour
      ),
    });
  }

  weatherIcon(weatherId, hour) {
    switch (true) {
      case weatherId >= 200 && weatherId <= 232:
        return faBolt;
      case weatherId >= 300 && weatherId <= 321:
        return faCloudRain;
      case weatherId >= 500 && weatherId <= 531:
        return faCloudShowersHeavy;
      case weatherId >= 600 && weatherId <= 622:
        return faSnowflake;
      case weatherId >= 700 && weatherId <= 781:
        return faSmog;
      case weatherId === 800:
        if (parseInt(hour) <= 20 && parseInt(hour) >= 6) {
          return faSun;
        }
        return faMoon;
      case weatherId === 801:
        if (parseInt(hour) <= 20 && parseInt(hour) >= 6) {
          return faCloudSun;
        }
        return faCloudMoon;
      case weatherId === 802:
        return faCloud;
      default:
        return faCloud;
    }
  }

  toCelsius(temp) {
    return Math.floor(temp - 273.15);
  }

  toDate(date) {
    let dateStr = date.split(" ")[0].slice(5);
    dateStr = dateStr.substr(3,2)+"."+dateStr.substr(0,2)
    return dateStr
  }

  toHour(date) {
    return date.split(" ")[1].slice(0, 5);
  }

  toKm(range) {
    return range / 1000;
  }

  handleNavClick = (val) => {
    this.setState({ navbarValue: val });
  };

  handleSearchOpen = (isOpen) => {
    this.setState({
      openSearch: isOpen,
    });
  };

  handleErrorClose = (event, reason) => {
    this.setState({
      error: false,
      warning: false,
    });
    if (reason === "clickaway") {
      return;
    }
  };

  handleDeletion(id) {
    const array = this.state.favList.filter(function (value, index, arr) {
      return index !== id;
    });
    this.setState({
      favList: array,
    });
    localStorage.setItem("list", JSON.stringify(array));
  }

  render() {
    return (
      <Router>
        <Navbar
          handleSearchOpen={this.handleSearchOpen}
          navbarValue={this.state.navbarValue}
          handleNavClick={this.handleNavClick}
          textInput={this.textInput}
        />
        <Switch>
          <Route path="/" exact>
            <WeatherLayout
              loadWeather={this.getWeather}
              error={this.state.error}
              city={this.state.city}
              temp={this.state.temp}
              tempMin={this.state.tempMin}
              tempMax={this.state.tempMax}
              country={this.state.country}
              weatherId={this.state.weatherId}
              weatherIcon={this.weatherIcon}
              weatherType={this.state.weatherType}
              tempNextDays={this.state.tempNextDays}
              tempHourly={this.state.tempHourly}
              details={this.state.details}
              handleNavClick={this.handleNavClick}
              handleErrorClose={this.handleErrorClose}
            />
            <SearchOverlay
              loadWeather={this.getWeather}
              error={this.state.error}
              handleSearchOpen={this.handleSearchOpen}
              openSearch={this.state.openSearch}
              handleNavClick={this.handleNavClick}
              textInput={this.textInput}
            />
          </Route>
          <Route path="/favorites">
            <FavoritesLayout
              favList={this.state.favList}
              handleNavClick={this.handleNavClick}
              loadWeather={this.getWeather}
              favoritesWidget={this.state.favoritesWidget}
              weatherIcon={this.weatherIcon}
              error={this.state.error}
              handleErrorClose={this.handleErrorClose}
              warning={this.state.warning}
              handleDeletion={this.handleDeletion}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Weather;

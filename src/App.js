import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";

// Components
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

import axios from "axios";

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIDToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("FBIDToken");
    delete axios.defaults.headers.common["Authorization"];
    store.dispatch({ type: SET_UNAUTHENTICATED });
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:userHandle" component={user} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;

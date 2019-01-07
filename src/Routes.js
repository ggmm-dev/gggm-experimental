import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            render={({ location }) => (
              <Switch location={location}>
                <Route
                  path="/"
                  render={props => (
                    <App key={props.match.params.id} {...props} />
                  )}
                />
              </Switch>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;

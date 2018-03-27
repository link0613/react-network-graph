import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Helmet from 'react-helmet';
import cx from 'classnames';
import history from 'modules/history';
import RoutePublic from 'modules/RoutePublic';
import RoutePrivate from 'modules/RoutePrivate';

import config from 'config';

import Home from 'routes/Home';
import NotFound from 'routes/NotFound';

import Header from 'components/Header';
import SystemAlerts from 'components/SystemAlerts';

import { showAlert } from 'actions';

export class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
  }

  render() {
    const { app, dispatch } = this.props;

    return (
      <ConnectedRouter history={history}>
        <div>
          <Helmet
            defer={false}
            htmlAttributes={{ lang: 'en-us' }}
            encodeSpecialCharacters={true}
            defaultTitle={config.title}
            titleTemplate={`%s | ${config.name}`}
            titleAttributes={{ itemprop: 'name', lang: 'en-us' }}
          />
          <Header dispatch={dispatch} draweropened={app.draweropened} />
          <main className="app__main">
            <Switch>
              <RoutePublic path="/" exact component={Home} dispatch={dispatch}/>
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </ConnectedRouter>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(App);

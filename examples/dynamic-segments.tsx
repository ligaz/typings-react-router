/// <reference path="../typings/main.d.ts" />
/// <reference path="../react-router.d.ts" />

import React from 'react';
import { render } from 'react-dom';
import {
	IRouterProps,
	Router,
	ILinkProps,
	Link,
	IndexLink,
	IRouterContext,
	IRouter,
	RouterContext,
	IRouteProps,
	Route,
	PlainRoute,
	IRedirectProps,
	Redirect,
	IndexRoute,
	IIndexRouteProps,
	IndexRedirect,
	IInjectedProps,
	browserHistory,
	hashHistory,
	createMemoryHistory,
	useRouterHistory,
	IMatchArgs,
	match,
	createRoutes
} from '../react-router'

class App extends React.Component<React.Props<any>,{}> {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/user/123" activeClassName="active">Bob</Link></li>
          <li><Link to="/user/abc" activeClassName="active">Sally</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

class User extends React.Component<IInjectedProps, {}> {
  render() {
    const { userID } = this.props.params

    return (
      <div className="User">
        <h1>User id: {userID}</h1>
        <ul>
          <li><Link to={`/user/${userID}/tasks/foo`} activeClassName="active">foo task</Link></li>
          <li><Link to={`/user/${userID}/tasks/bar`} activeClassName="active">bar task</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

class Task extends React.Component<IInjectedProps,{}> {
  render() {
    const { userID, taskID } = this.props.params

    return (
      <div className="Task">
        <h2>User ID: {userID}</h2>
        <h3>Task ID: {taskID}</h3>
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="user/:userID" component={User}>
        <Route path="tasks/:taskID" component={Task} />
        <Redirect from="todos/:taskID" to="tasks/:taskID" />
      </Route>
    </Route>
  </Router>
), document.getElementById('example'))

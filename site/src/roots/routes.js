/**
 * root routes
 * @author renmaomin@126.com
 */
import React from 'react';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import pages from '../pages';

export default () => (
  <div style={{ height: '100%' }}>
    <Switch>
      <Route path="/components/button" component={pages.Button} />
      <Route path="/components/icon" component={pages.Icon} />
      <Route path="/components/toast" component={pages.Toast} />
      <Route path="/components/alert" component={pages.Alert} />
      <Route path="/components/switch" component={pages.Switch} />
      <Route path="/components/inputFiled" component={pages.InputFiled} />
      <Route path="/components/radio" component={pages.Radio} />
      <Route path="/components/introduce" component={pages.Introduce} />
      <Route path="/index" component={pages.Index} />
      <Route path="/" exact render={() => <Redirect to="/index" />} />
    </Switch>
  </div>
);

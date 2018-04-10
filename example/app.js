import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import '../src/styles/index.less';
import '../src/styles/examp-page.less';

import App from './components/app';
import Button from './components/button';
import Mask from './components/mask';
import City from './components/city';
import Cartype from './components/cartype';
import Home from './components/home';
import Switch from './components/switch';
import Picker from './components/picker';
import DataPicker from './components/datapicker';
import Inputs from './components/inputs';
import Load from './components/load';
import Slider from './components/slider';
import Dialog from './components/dialog';
import FadeInUp from './components/fadeinup';
import FadeIn from './components/fadein';
import Ringloading from './components/ringloading';
import Radar from './components/radar';
import InfiniteLoader from './components/infiniteloader';
import Search from './components/search';
import SwipeMove from './components/swipemove';
import SwipeAction from './components/swipeaction';
import Layouts from './components/layout';
import CarRecord from './components/record';
import Passenger from './components/passenger';
import Driver from './components/driver';
import Focus from './components/focus';
import Verification from './components/verification';
import Rule from './components/rule';
import TextLink from './components/textlink';
import CssTransform from './components/csstransform';
import PositionTransform from './components/positiontransform';
import DialogLayout from './components/dialogLayout';
import Popover from './components/popover';
import Star from './components/star';
import Label from './components/label';
import NavBar from './components/navbar';
import Badge from './components/badge';
import Toast from './components/toast';
import Result from './components/result';
import Stepper from './components/stepper';
import Travel from './components/travel';
import NoticeBar from './components/noticebar';
import List from './components/list';
import PermissionsCard from './components/permissionscard';
import Tabs from './components/tabs';
import Grid from './components/grid';
import Icon from './components/icon';
import Checkbox from './components/checkbox';
import Radio from './components/radio';
import Input from './components/input';
import CanvasChart from './components/canvaschart';
import Upload from './components/upload';
import LocaleProvider from './components/localeProvider';

const BasicExample = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/mask" component={Mask} />
      <Route path="/city" component={City} />
      <Route path="/cartype" component={Cartype} />
      <Route path="/button" component={Button} />
      <Route path="/home" component={Home} />
      <Route path="/switch" component={Switch} />
      <Route path="/picker" component={Picker} />
      <Route path="/inputs" component={Inputs} />
      <Route path="/input" component={Input} />
      <Route path="/load" component={Load} />
      <Route path="/slider" component={Slider} />
      <Route path="/dialog" component={Dialog} />
      <Route path="/fadeinup" component={FadeInUp} />
      <Route path="/fadein" component={FadeIn} />
      <Route path="/ringloading" component={Ringloading} />
      <Route path="/radar" component={Radar} />
      <Route path="/infiniteloader" component={InfiniteLoader} />
      <Route path="/search" component={Search} />
      <Route path="/swipemove" component={SwipeMove} />
      <Route path="/swipeaction" component={SwipeAction} />
      <Route path="/layout" component={Layouts} />
      <Route path="/record" component={CarRecord} />
      <Route path="/passenger" component={Passenger} />
      <Route path="/driver" component={Driver} />
      <Route path="/focus" component={Focus} />
      <Route path="/verification" component={Verification} />
      <Route path="/rule" component={Rule} />
      <Route path="/textlink" component={TextLink} />
      <Route path="/datapicker" component={DataPicker} />
      <Route path="/csstransform" component={CssTransform} />
      <Route path="/positiontransform" component={PositionTransform} />
      <Route path="/dialogLayout" component={DialogLayout} />
      <Route path="/popover" component={Popover} />
      <Route path="/star" component={Star} />
      <Route path="/label" component={Label} />
      <Route path="/navbar" component={NavBar} />
      <Route path="/badge" component={Badge} />
      <Route path="/toast" component={Toast} />
      <Route path="/result" component={Result} />
      <Route path="/stepper" component={Stepper} />
      <Route path="/travel" component={Travel} />
      <Route path="/noticebar" component={NoticeBar} />
      <Route path="/list" component={List} />
      <Route path="/permissionscard" component={PermissionsCard} />
      <Route path="/tabs" component={Tabs} />
      <Route path="/grid" component={Grid} />
      <Route path="/icon" component={Icon} />
      <Route path="/checkbox" component={Checkbox} />
      <Route path="/radio" component={Radio} />
      <Route path="/canvaschart" component={CanvasChart} />
      <Route path="/upload" component={Upload} />
      <Route path="/localeProvider" component={LocaleProvider} />
    </Route>
  </Router>
);
export default BasicExample;

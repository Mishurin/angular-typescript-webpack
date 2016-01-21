import 'angular';

import {MainPageComponent} from './components/page/MainPageComponent';

angular.module('app.common', [])
    .directive('page', () => new MainPageComponent());

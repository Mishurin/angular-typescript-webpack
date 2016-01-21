import "angular";

import '../common/angular/index';

import '../test-feature/index';

require('../../styles/main.scss');

require('./styles/screen.scss');

angular.module('app', ['app.common']);

angular.bootstrap(document, ['app'], {
    strictDi: true
});

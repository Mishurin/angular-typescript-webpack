import "angular";

import "../test-feature/index";

require("../../styles/main.scss");

require("./styles/screen.scss");

angular.module("app", []);

angular.bootstrap(document, ["app"], {
    strictDi: true
});

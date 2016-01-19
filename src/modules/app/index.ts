import "../test-feature/index";
import "angular";
require("toastr/toastr.js");
require("../../styles/main.scss");
require("font-awesome/css/font-awesome.css");
require("bootstrap/dist/css/bootstrap.css");
require("./styles/screen.scss");
require("toastr/build/toastr.css");

angular.module("app", []);
angular.bootstrap(document, ["app"], {
    strictDi: true
});

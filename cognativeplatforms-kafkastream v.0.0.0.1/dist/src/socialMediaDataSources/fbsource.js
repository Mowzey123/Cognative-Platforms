"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FB = require('facebook-ts');
var fbsource = /** @class */ (function () {
    function fbsource() {
        this.secret = '';
        this.clientid = '';
        this.secret = '7f87e1b221a5e57a38752ab1d3388d48';
        this.clientid = '2130035657219002';
    }
    fbsource.prototype.setFaceBookSettings = function () {
        FB.settings.setSecret(this.secret);
        FB.settings.setClientId(this.clientid);
    };
    fbsource.prototype.getAccesToken = function () {
        this.setFaceBookSettings();
        FB.accessToken('d5ed4484ea6f8ef268a2d1cbb2cabc31').then(function (token) {
            console.log(token);
        }, function (err) {
            console.log(err);
        });
    };
    fbsource.prototype.getFBUser = function (facebookid) {
        FB.settings.setClientId(this.clientid);
        FB.settings.setSecret(this.secret);
        FB.getUser(facebookid).then(function (user) {
            console.log(user);
        }, function (err) {
            console.log(err);
        });
    };
    return fbsource;
}());
var fb = new fbsource();
exports.default = fb;
//# sourceMappingURL=fbsource.js.map
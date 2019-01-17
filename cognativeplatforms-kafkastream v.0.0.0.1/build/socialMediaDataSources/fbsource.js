"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FB = require('facebook-ts');
class fbsource {
    constructor() {
        this.secret = '';
        this.clientid = '';
        this.secret = '7f87e1b221a5e57a38752ab1d3388d48';
        this.clientid = '2130035657219002';
    }
    setFaceBookSettings() {
        FB.settings.setSecret(this.secret);
        FB.settings.setClientId(this.clientid);
    }
    getAccesToken() {
        this.setFaceBookSettings();
        FB.accessToken('d5ed4484ea6f8ef268a2d1cbb2cabc31').then((token) => {
            console.log(token);
        }, (err) => {
            console.log(err);
        });
    }
    getFBUser(facebookid) {
        FB.settings.setClientId(this.clientid);
        FB.settings.setSecret(this.secret);
        FB.getUser(facebookid).then(user => {
            console.log(user);
        }, (err) => {
            console.log(err);
        });
    }
}
const fb = new fbsource();
exports.default = fb;

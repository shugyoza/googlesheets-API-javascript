"use strict"
import {_} from "./inputs.js";

// grab the body node
const body = document.querySelector("body");

// create the main node
const main = document.createElement("main");

// create authorize button
const btnAuthorize = document.createElement(_.button.authorize.tag);
    btnAuthorize.id = _.button.authorize.id;
    btnAuthorize.setAttribute("onClick", "handleAuthClick()");
    btnAuthorize.innerText = _.button.authorize.text;
    btnAuthorize.style.visibility = "hidden";

// create log out button
const btnLogOut = document.createElement(_.button.logOut.tag);
    btnLogOut.id = _.button.logOut.id;
    btnLogOut.setAttribute("onClick", "handleLogOutClick()");
    btnLogOut.innerText = _.button.logOut.text;
    btnLogOut.style.visibility = "hidden";

const pre = document.createElement(_.content.tag);
    pre.id = _.content.id;
    pre.setAttribute("style", "white-space: pre-wrap");


// render DOM on client
body.appendChild(main);
    main.appendChild(btnAuthorize);
    main.appendChild(btnLogOut);

    main.appendChild(pre);

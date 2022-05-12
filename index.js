"use strict"
import {_} from "./inputs.js";

// script type="text/javascript"
// // exported gapiLoaded
// // exported gisLoaded
// // exported handleAuthClick
// // exported handleLogOutClick

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = _.goog.clientID; // "<YOUR_CLIENT_ID>";
const API_KEY = _.goog.apiKey; // "<YOUR_API_KEY>";

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = _.goog.discoveryDocs;

// Authorization scopes required by the API: multiple scopes can be
// // included, separated by spaces
const SCOPES = _.goog.scopes;

let tokenClient;
let gapiInited = false;
let gisInited = false;


// Callback after api.js is loaded.
function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
}

// Callback affter the API client is loaded. Loads the discovery doc to initialize the API
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
}

// Callback after Google Identity Services are loaded.
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: "" // defined later
    });
    gisInited = true;
    maybeEnableButtons();
}

// Enables user interaction after all libraries are loaded
function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById(_.button.authorize.id).style.visibility = "visible";
    }
}

// Log in the user upon button click
function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        document.getElementById(_.button.logOut.id).style.visibility = "visible";
        document.getElementById(_.button.authorize.id).innerText = "Refresh";
        await listMajors();
    }

    if (gapiLoaded.client.getToken() === null) {
        // Prompt the user to select a Google Account and asked for consent to share their data
        // // when establishing a new session.
        tokenClient.requestAccessToken({prompt: "consent"});
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({prompt: ""});
    }
}

// Log out the user upon button click
function handleLogOutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken("");
        document.getElementById(_.content.id).innerText = "";
        document.getElementById(_.button.authorize.id).innerText = "Authorize";
        document.getElementById(_.button.logOut.id).style.visibility = "hidden";
    }
}

// Print the names and majors of students in a sample spreadsheet:
// // "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit"
async function listMajors() {
    let response;
    let contentText = document.getElementById(_.content.id).innerText;
    try {
        // Fetch first 10 files
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: _.goog.spreadsheetId,
            range: _.goog.range
        });
    } catch (err) {
        contentText = err.message;
        return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
        contentText = "No values found.";
        return;
    }
    // Flatten to string to display
    const output = range.values.reduce((str, row) => `${str}${row[0]}, ${row[4]}\n`, 'Name, Major:\n');
    contentText = output;
}

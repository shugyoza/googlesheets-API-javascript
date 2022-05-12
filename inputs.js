"use strict"
export const _ = {

    goog: {
        clientID: "<fill in here>",
        apiKey: "<fill in here>",
        discoveryDocs: 'https://sheets.googleapis.com/$discovery/rest?versions=v4',
        scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly',
        spreadsheetId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
        range: "Class Data!A2:E"
    },

    button: {
        authorize: {
            tag: "button",
            id: "authorize_button",
            text: "Authorize"
        },
        logOut: {
            tag: "button",
            id: "logout_button",
            text: "Log Out"
        }
    },
    content: {
        tag: "pre",
        id: "content"
    }
}

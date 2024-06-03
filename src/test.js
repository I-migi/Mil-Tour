const express = require("express");
const router = express.Router();
const request = require("request");
const converter = require("xml-js");



let url = 'https://openapi.mnd.go.kr//xml/DS_MND_GUN_WLFRINSTLTN_SRNDT/1/17/'

router.get("/", (req, res) => {
    request(
        {
            url: url,
            method:"GET",
        },

        (error, response, body) => {
            const xmlToJson = converter.xml2json(body);
            res.send(xmlToJson);
        }
    );
});

module.exports = router;
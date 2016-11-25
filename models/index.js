const express = require('express')
const path = require('path')
const fs = require("fs")

module.exports = exports = {}
let files = fs.readdirSync(path.resolve('models'))

for(const f of files) {
    if(f !== 'index.js') {
        module.exports[f.split('.')[0]] = require(path.resolve(`models/${f}`))
    }
}

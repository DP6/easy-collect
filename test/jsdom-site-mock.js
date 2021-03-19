const jsdom = require('jsdom');
const fs = require('fs');
const virtualConsole = new jsdom.VirtualConsole();
const { JSDOM } = jsdom;

const dom = {}; //new JSDOM(fs.readFileSync('./.././test/src/site/index.html').toString(), { virtualConsole });

module.export = dom;
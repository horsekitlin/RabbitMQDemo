const scrape = require('html-metadata');
 
const url = "https://cjpf1688.cc/";
 
scrape(url).then(function(metadata){
    console.log(metadata);
    console.log(metadata.general.appleTouchIcons);
});
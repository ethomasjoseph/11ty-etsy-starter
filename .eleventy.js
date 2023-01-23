const htmlmin = require('html-minifier')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
//const pluginRss = require("@11ty/eleventy-plugin-rss");

// look for config values: https://www.11ty.dev/docs/config
module.exports = function(eleventyConfig) {
    /* *** Plugins *** */

    //eleventyConfig.addPlugin(pluginRss);

    //eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // highlight codeblocks
    eleventyConfig.addPlugin(syntaxHighlight);

    
    /* *** Passthrough file copy *** */
    eleventyConfig.addPassthroughCopy({
        "./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
        "./node_modules/prismjs/themes/prism.min.css":"./static/styles/prism.css",
    });
    // Copy Image Folder to /_site
    eleventyConfig.addPassthroughCopy({"src/static/img": "static/img"});

    // Copy favicon to route of /_site
    eleventyConfig.addPassthroughCopy({"src/favicon.ico": ""});

    
    /* *** Transformations *** */

    // Merge data instead of overriding
    eleventyConfig.setDataDeepMerge(true);

    // html transformation
    eleventyConfig.addTransform("htmlmin", function(content) {
        // Prior to Eleventy 2.0: use this.outputPath instead
        if( this.page.outputPath && this.page.outputPath.endsWith(".html") ) {
          let minified = htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true
          });
          return minified;
        }
    
        return content;
     });

    return {
        pathPrefix: process.env.WEB_PATH_PREFIX || '',
        dir: {
            input: 'src', // default = . (current directory)
            layouts: '_layouts'
        }
    };
};
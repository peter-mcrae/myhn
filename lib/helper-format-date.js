/**
 * Created by lmarkus on 1/5/14.
 */

'use strict';

// Load the MomentJS Library
var moment = require('moment');

//We require that dustjs, and the dustjs-helpers have been loaded. The way we invoke this function will ensure that.
(function (dust) {

    //Create a helper called 'formatDate'
    dust.helpers.formatDate = function (chunk, context, bodies, params) {


        //Retrieve the date value from the template parameters.
        var date = dust.helpers.tap(params.date, chunk, context);

        //Retrieve the format string from the template parameters.
        var format = dust.helpers.tap(params.format, chunk, context);

        //Parse the date object using MomentJS
        var m = moment(new Date(date));

        //Set the language in which the date should be formatted
       // m.lang(lang);

        //Format the string
        var output = m.format(format);

        //Write the final value out to the template
        return chunk.write(output);
    };

})(typeof exports !== 'undefined' ? module.exports = require('dustjs-helpers') : dust);
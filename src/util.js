/**
 * Created by areshytko on 12.01.17.
 */


function getURLParams(search_string) {

    var parse = function(params, pairs) {
        var pair = pairs[0];
        var parts = pair.split('=');
        var key = decodeURIComponent(parts[0]);
        var value = decodeURIComponent(parts.slice(1).join('='));

        if (typeof params[key] === "undefined") {
            params[key] = value;
        } else {
            params[key] = [].concat(params[key], value);
        }

        return pairs.length == 1 ? params : parse(params, pairs.slice(1))
    };

    return search_string.length == 0 ? {} : parse({}, search_string.substr(1).split('&'));
}


const zip = (rows) => 0 == rows.length ? [] : rows[0].map( (_,i) => rows.map(row => row[i]));


const mustBeDefined = () => { throw Error("Undefined error. The value must be defined by the client code.") };


export { getURLParams, zip, mustBeDefined };

import { Cookies } from 'js-cookie';

const csrfFetch = async (url, options = {}) => {
    // set options.headers to an empty object if there is no headers
    if(!options.headers) options.headers = {};
    //alternate: options.headers = options.headers || {}

    // set options.method to 'GET' if there is no method
    if(!options.method) options.method = 'GET';
    //alternate: options.method = options.method || 'GET'

    // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json", and set the "XSRF-TOKEN" header to the value of the
    // "XSRF-TOKEN" cookie
    if(options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json'
        options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
    }

    // Make the fetch call passing in the url and the options
    const res = await window.fetch(url, options);

    if (res.status >=400) throw res;

    return res
}

export default csrfFetch

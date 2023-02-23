import Cookies from 'js-cookie';

export const csrfFetch = async (url, options = {}) => {
    // set options.headers to an empty object if there is no headers
    // alternate: if(!options.headers) options.headers = {};
    options.headers = options.headers || {}

    // set options.method to 'GET' if there is no method
    //alternate: if(!options.method) options.method = 'GET';
    options.method = options.method || 'GET'

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

export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}

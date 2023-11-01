async function postData(url, data) {
    const result = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            'Content-type' : 'application/json'
        }
    });

    if (!result.ok) {
        throw Error(result.statusText);
    }

    return await result;
};

async function getData(url, params) {
    url = url + '?' + stringifyParams(params);

    const result = await fetch(url);

    if (!result.ok) {
        throw Error(result.statusText);
    }

    return await result;
};

function stringifyParams(obj) {
    return Object.keys(obj)
        .filter(key => obj[key])
        .map(key => key + '=' + encodeURIComponent(obj[key]))
        .join('&');
}

function isExpiredTime(key, limit) {
    const localStorageInitTime = localStorage.getItem(key);
    if (localStorageInitTime === null || (+new Date() - localStorageInitTime > limit * 1000)) {
        return true;
    } else if((+new Date() - localStorageInitTime < limit * 1000)) {
        return false;
    }
}

function checkCookieExist(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    return cookieName in cookie;
}

export {postData, getData, isExpiredTime, checkCookieExist};
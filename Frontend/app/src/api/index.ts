import axios from "axios";

export const $api = axios.create({
    baseURL: `${process.env.REACT_APP_BASEURL}`,
});

export const config = () => {
    return {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Expose-Headers': '*',
        'Access-Control-Allow-Origin': '*'
    }
}

$api.interceptors.response.use(function (response) {

    return response;
}, function (error) {
    if (error.response != null) {
        const numberStatus: number = Math.round(error.response.status / 100);
        switch (numberStatus) {
            case 4:
                switch (error.response.status) {
                    case 400:
                        window.location.replace(`/error?code=${error.response.status}`);
                        break;
                    case 401:
                    case 403:

                        window.location.replace("/");
                        break;
                    case 404:
                    case 405:
                        window.location.replace(`/error?code=${error.response.status}`);
                        break;
                }
                break;
            case 5:

                break;
            default:

                break;
        }
    }
    return Promise.reject(error);
});
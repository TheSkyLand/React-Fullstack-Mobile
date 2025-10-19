import axios from "axios";

export const $api = axios.create({
    baseURL: `http://localhost:3001`,
});

export const config = () => {
    return {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Expose-Headers': '*',
        'Access-Control-Allow-Origin': '*'
    }
}

$api.interceptors.response.use(function (response) {
    // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
    // Здесь можете сделать что-нибудь с ответом
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
                        // Переход. Если не прошёл авторизацию
                        window.location.replace("/");
                        break;
                    case 404:
                    case 405:
                        // window.location.replace(`/error?code=${error.response.status}`);
                        break;
                }
                break;
            case 5:
                // if (error.response.status >= 500 && error.response.status <= 505) {
                //     window.location.replace(`/error?code=${error.response.status}`);
                // }
                break;
            default:
                // window.location.replace("/error");
                break;
        }
    }

    // if (error.response == null) {
    //     window.location.replace("/error");
    //     return;
    // }

    // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
    // Здесь можете сделать что-то с ошибкой ответа
    return Promise.reject(error);
});
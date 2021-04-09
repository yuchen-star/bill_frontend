import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/users';

function userUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getUsers() {
    return http.get(apiEndpoint);
}

export function saveUser(user) {
    if (user._id) {
        const body = {...user};
        delete body._id;
        return http.put(userUrl(user._id), body);
    }
    
    return http.post(apiEndpoint, user);
}

export function deleteUser(id) {
    return http.delete(userUrl(id));
}

export function register(user) {
    return http.post(apiEndpoint, {
        name: user.username,
        password: user.password,
        invitationCode: user.invitationCode
    });
}
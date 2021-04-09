import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/bills';

function billUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getBills() {
    return http.get(apiEndpoint);
}

export function getBillsById(id) {
    return http.get(billUrl(id));
}

export function getBill(billId) {
    return http.get(billUrl(billId));
}

export function saveBill(bill) {
    if (bill._id) {
        const body = { ...bill };
        delete body._id;
        return http.put(billUrl(bill._id), body);
    }

    return http.post(apiEndpoint, bill);
}

export function deleteBill(billId) {
    return http.delete(billUrl(billId));
}
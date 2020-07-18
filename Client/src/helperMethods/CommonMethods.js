import { AxiosConstant } from '../constants/AxiosConstants';

export const GetImagePath = (urlEnd) => {
    return `${AxiosConstant.apiUrl}${urlEnd.split('\\').join('/')}`
}
export const stringFormatter = String.prototype.format = function () {
    var a = this;
    for (var k in arguments) {
        a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
    }
    return a
};
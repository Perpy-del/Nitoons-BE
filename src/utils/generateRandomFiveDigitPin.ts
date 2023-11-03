import crypto from 'crypto';
import moment from 'moment';

export default class UserPinController {
    /**
     * Handles generating five digit token
     */

    static generateFiveDigitPin(expiryInMins: number) {
        const fiveDigitPin = crypto.randomInt(10000, 99999).toString();
        const dateNow = moment();
        const expiryTime = moment(dateNow).add(expiryInMins, 'minutes').format("DD/MM/YYYY: HH:mm:ss");
        return { fiveDigitPin, expiryTime };
    }

    static checkIfPinIsExpired(pinData: any): boolean {
        const dateNow = moment();
        return dateNow.isAfter(pinData.expiryTime)
    }
}
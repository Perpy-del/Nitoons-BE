import crypto from 'crypto';
import moment from 'moment';

export default class UserPinController {
  /**
   * Handles generating five digit token
   */

  static generateFiveDigitPin(expiryInMins: number) {
    const fiveDigitPin = crypto.randomInt(10000, 99999);
    const dateNow = moment();
    const expiryTime = moment(dateNow)
      .add(expiryInMins, 'minutes').toDate();
    return { fiveDigitPin, expiryTime };
  }

  static checkIfPinIsExpired(expiryTime: Date): boolean {
    const dateNow = moment();
    const pinExpired = dateNow.isAfter(expiryTime);

    return pinExpired;
  }
}

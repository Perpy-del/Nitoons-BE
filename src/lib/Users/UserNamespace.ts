import UserModel from '../Users/models/userModel'

export default class UserNamespace {
  public static async addAndLoginUser(userDetails: { email: string }) {
    return UserModel.create({
      email: userDetails.email,
    })
  }

  public static async getUser(userDetails: { email: string }) {
    return UserModel.findOne({
      email: userDetails.email,
    })
  }
}

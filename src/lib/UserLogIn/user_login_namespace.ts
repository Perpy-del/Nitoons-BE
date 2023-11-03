import UserModel from "../../models/UserModel/userModel";

const addAndLoginUser = async (props: {
    email: string
}) => {
    return UserModel.create({
        email: props.email
    })
}

const getUser = async (props: {
    email: string
}) => {
    return UserModel.findOne({
        email: props.email
    })
}

export const UserNamespace = {
    addAndLoginUser,
    getUser
}
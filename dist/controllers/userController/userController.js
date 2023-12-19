"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateRandomPin_1 = __importDefault(require("../../utils/generateRandomPin"));
const dotenv_1 = __importDefault(require("dotenv"));
const sendgrid_namespace_1 = __importDefault(require("../../utils/sendgrid_namespace"));
const responses_namespace_1 = __importDefault(require("../../utils/responses_namespace"));
const UserNamespace_1 = __importDefault(require("../../lib/Users/UserNamespace"));
const jwtHandler_1 = require("../middlewares/jwtHandler");
const otpNamespace_1 = __importDefault(require("../../lib/Users/otpNamespace"));
const index_1 = require("../../config/index");
dotenv_1.default.config();
class UserController {
    static async loginUser(req, res) {
        const { email } = req.body;
        const existingEmail = await UserNamespace_1.default.getUser({
            email: req.body.email,
        });
        const { randomPin, expiryTime } = generateRandomPin_1.default.generatePin(5);
        const mailOptions = {
            to: email,
            from: index_1.config.sendgridSender,
            subject: 'Welcome to Nitoons',
            text: 'Verify your Email',
            template: './template/sendPin.handlebars',
            payload: { verificationPin: randomPin },
        };
        try {
            if (existingEmail) {
                const { _id, email } = existingEmail;
                const userId = _id;
                otpNamespace_1.default.addNewPin({
                    otp: randomPin,
                    expiryTime,
                    userId,
                });
                await (0, sendgrid_namespace_1.default)(mailOptions);
                const data = {
                    userId: _id,
                    email: email,
                };
                return responses_namespace_1.default.sendSuccessMessage(res, data, res.status(200).statusCode, 'User pin generated and mail sent successfully');
            }
            const user = await UserNamespace_1.default.addAndLoginUser({
                email: req.body.email,
            });
            otpNamespace_1.default.addNewPin({
                otp: randomPin,
                expiryTime,
                userId: user._id,
            });
            const data = {
                userId: user._id,
                email: user.email,
            };
            await (0, sendgrid_namespace_1.default)(mailOptions);
            return responses_namespace_1.default.sendSuccessMessage(res, data, res.status(200).statusCode, 'User pin generated and mail sent successfully');
        }
        catch (error) {
            console.log('Error logging in user', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error generating pin and sending email');
        }
    }
    static async validateUser(req, res) {
        let { user_id, otp } = req.body;
        const modelExist = await otpNamespace_1.default.getPin({
            userId: user_id,
            otp,
        });
        console.log(modelExist);
        try {
            // Check if the pin is expired
            if (generateRandomPin_1.default.checkIfPinIsExpired(modelExist?.expiry_time)) {
                console.log(modelExist?.expiry_time.getSeconds());
                return responses_namespace_1.default.BadUserRequestError(res, 'Verification pin has expired. Click on Resend pin to generate another pin.');
            }
            // Check if the pin is used
            else if (await otpNamespace_1.default.getPinIsUsed({ userId: user_id, otp })) {
                return responses_namespace_1.default.BadUserRequestError(res, 'This pin has already been used. Click on Resend pin to generate another pin');
            }
            // Check if the pin is incorrect
            else if (modelExist?.otp !== otp) {
                return responses_namespace_1.default.BadUserRequestError(res, 'Incorrect pin. Check your mail and input a valid pin.');
            }
            // Pin is valid, generate a token and return it, then update otp's is_used to true
            else {
                const token = (0, jwtHandler_1.newToken)(user_id);
                res.json({ token });
                await otpNamespace_1.default.updatePinIsUsed({
                    otp,
                    userId: user_id,
                });
                console.log('Token sent and user logged in successfully');
            }
        }
        catch (error) {
            console.log('Error logging in user', error, error && error.message);
            return responses_namespace_1.default.sendErrorMessage(req, res, error, res.status(500).statusCode, 'Error logging in user');
        }
    }
    // VALIDATING USER PROTECTED ROUTE
    static async protectedRoute(req, res) {
        res.status(200).json({
            message: 'Protected route accessed successfully',
            status: 'Success',
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map
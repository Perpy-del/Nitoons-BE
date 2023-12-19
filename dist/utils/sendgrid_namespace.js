"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sgMail = require("@sendgrid/mail");
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = require("../config/index");
sgMail.setApiKey(index_1.config.sendgridApiKey);
const sendMail = async (props) => {
    try {
        const templateSource = fs_1.default.readFileSync(path_1.default.join(__dirname, props.template), 'utf-8');
        const loginPinTemplate = handlebars_1.default.compile(templateSource);
        const mailTemplate = {
            to: props.to,
            from: props.from,
            subject: props.subject,
            text: props.text,
            html: loginPinTemplate(props.payload),
        };
        await sgMail.send(mailTemplate);
    }
    catch (err) {
        console.log(err);
        if (err.response) {
            console.log(err.response.body);
        }
    }
};
// sendMail(
//     to: 'recipient@example.com',
//     from: 'sender@example.com',
//     subject: 'Your Subject',
//     text: 'Your plain text content',
//     html: '<p>Your HTML content</p>',
// );
exports.default = sendMail;
//# sourceMappingURL=sendgrid_namespace.js.map
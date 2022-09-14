"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyActivity = exports.verify = void 0;
const verify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Object.assign({}, req.body);
    const typecompany = ["Software", "Hardware", "Network"];
    const Verifynull = () => {
        return (data.name_company === null ||
            data.name_company_eng === null ||
            data.address === null ||
            data.idprovince === null ||
            data.tel === null ||
            data.email === null ||
            data.detail_company === null ||
            data.number_of_employee === null ||
            data.fname_manager === null ||
            data.lname_manager === null ||
            data.rank === null ||
            data.department === null ||
            data.website === null ||
            !typecompany.includes(data.type_company_1));
    };
    const Verifybank = () => {
        return (data.name_company.trim() == '' ||
            data.name_company_eng.trim() == '' ||
            data.address.trim() == '' ||
            data.tel.trim() == '' ||
            data.email.trim() == '' ||
            data.detail_company.trim() == '' ||
            data.number_of_employee.trim() == '' ||
            data.fname_manager.trim() == '' ||
            data.lname_manager.trim() == '' ||
            data.rank.trim() == '' ||
            data.department.trim() == '' ||
            data.website.trim() == '');
    };
    if (!Verifynull()) {
        if (!Verifybank()) {
            next();
        }
        else {
            return res.status(400).json({ message: 'Please fill in the blank' });
        }
    }
    else {
        return res.status(400).json({ message: 'Please check the data not null' });
    }
});
exports.verify = verify;
const verifyActivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Object.assign({}, req.body);
    const statusactivity = ['pass', 'progress', 'fail'];
    const Verifynull = () => {
        return (data.idstudent === null ||
            data.idactivity === null ||
            !statusactivity.includes(data.status_activity));
    };
    const Verifybank = () => {
        return (data.status_activity.trim() == '');
    };
    if (!Verifynull()) {
        if (!Verifybank()) {
            next();
        }
        else {
            return res.status(400).json({ message: 'Please fill in the blank' });
        }
    }
    else {
        return res.status(400).json({ message: 'Please check the data not null or status activity not pass, progress, fail' });
    }
});
exports.verifyActivity = verifyActivity;

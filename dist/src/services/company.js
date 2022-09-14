"use strict";
class companyData {
}
companyData.getCompanyData = (company, province) => {
    let datacompany = [];
    company.forEach(e => {
        province.forEach(p => {
            if (e.idprovince == p.idprovince) {
                datacompany.push({
                    idcompany: e.idcompany,
                    name_company: e.name_company,
                    name_company_eng: e.name_company_eng,
                    address: e.address,
                    idprovince: p.idprovince,
                    tel: e.tel,
                    email: e.email,
                    detail_company: e.detail_company,
                    number_of_employee: e.number_of_employee,
                    fname_manager: e.fname_manager,
                    lname_manager: e.lname_manager,
                    rank: e.rank,
                    department: e.department,
                    work_time: e.work_time,
                    period: e.period,
                    welfare: e.welfare,
                    website: e.website,
                    type_company_1: e.type_company_1,
                    type_company_2: e.type_company_2,
                    type_company_3: e.type_company_3,
                    region: p.region,
                    date_create: e.createdDate,
                    date_update: e.updatedDate,
                });
            }
        });
    });
    return datacompany;
};
module.exports = companyData;

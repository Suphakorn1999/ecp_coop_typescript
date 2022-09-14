"use strict";
class FM10_14verrify {
}
FM10_14verrify.datafm10_14 = (formdata, fm10_14) => {
    let data = [];
    formdata.forEach((element) => {
        let fm = fm10_14.filter((item) => item.idfm10_14data == element.idfm10_14data);
        data.push({
            idfm10_14data: element.idfm10_14data,
            fname_student: element.fname_student,
            lname_student: element.lname_student,
            name_branch: element.name_branch,
            name_faculty: element.name_faculty,
            name_company: element.name_company,
            fname_assessor: element.fname_assessor,
            lname_assessor: element.lname_assessor,
            name_position: element.name_position,
            department: element.department,
            other_Comments: element.other_Comments,
            fm10_14: [],
        });
    });
    return data;
};
FM10_14verrify.pushfm = (fm10_14, fm10_14coop, data) => {
    data.forEach((d) => {
        fm10_14coop.forEach((a) => {
            fm10_14.forEach((e) => {
                if (d.idfm10_14data == a.idfm10_14data &&
                    e.idfm10_14 == a.idfm10_14) {
                    d.fm10_14.push({
                        topic_name: e.topic_name,
                        point: a.point,
                    });
                }
            });
        });
    });
    return data;
};
FM10_14verrify.datatotalpoint = (formdata, fm10_14) => {
    let data = [];
    formdata.forEach((element) => {
        let fm = fm10_14.filter((item) => item.idfm10_14data == element.idfm10_14data);
        data.push({
            idfm10_14data: element.idfm10_14data,
            fname_student: element.fname_student,
            lname_student: element.lname_student,
            name_branch: element.name_branch,
            name_faculty: element.name_faculty,
            name_company: element.name_company,
            fname_assessor: element.fname_assessor,
            lname_assessor: element.lname_assessor,
            name_position: element.name_position,
            department: element.department,
            other_Comments: element.other_Comments,
            totalpoint: '',
        });
    });
    return data;
};
FM10_14verrify.pushtotalpoint = (fm10_14, data) => {
    data.forEach((d) => {
        fm10_14.forEach((e) => {
            if (d.idfm10_14data == e.idfm10_14data) {
                d.totalpoint = e.dataValues.total_point;
            }
        });
    });
    return data;
};
module.exports = FM10_14verrify;

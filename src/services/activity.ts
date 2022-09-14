class activityStudent {
    static dataactivity = (student:any[],activityStudent:any[]) => {
        let data:any[] = [];
        student.forEach(element => {
            let activity = activityStudent.filter(item => item.idstudent == element.student_id);
            data.push({
              idstudent: element.idstudent,
              student_id: element.student_id,
              fname_student: element.fname_student,
              lname_student: element.lname_student,
              activity: activity,
            });
        });
        return data;
    }

    static pushactivity = (activity:any[],activityStudent:any[],data:any[]) => {
        data.forEach(d => {
            activityStudent.forEach(a => {
                activity.forEach(e => {
                    if(d.idstudent == a.idstudent && e.idactivity == a.idactivity){
                        d.activity.push({
                            idactivity: e.idactivity,
                            name_activity: e.name_activity,
                            status_activity: a.status_activity,
                        });
                    }
                })
            })
        })
        return data;
    }
}

module.exports = activityStudent;
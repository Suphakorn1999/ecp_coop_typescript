import express from 'express';
import { RequestHandler } from 'express';
import { AssignmentFile } from '../models/assignmentFileModel';
import { File } from '../models/fileModel';
import { Student } from '../models/studentModel';

export const getFile: RequestHandler = async (req, res, next) => {
    const id = req.body.user.id
    const file = await File.findAll({where:{idstudent:id},
      attributes: [
        'idfile',
        'name_file',
        'path_file',
        'type_file',
        'date_file',
      ],
      include: [
        {
          model: Student,
          attributes: [
            'student_id',
            'prename_student',
            'fname_student',
            'lname_student',
          ],
        },
        { model: AssignmentFile },
      ],
    });
    if (file.length > 0) {
        return res.status(200).json({ message: 'File fetched successfully', data: file });
    } else {
        return res.status(400).json({ message: 'File not found' });
    }
}
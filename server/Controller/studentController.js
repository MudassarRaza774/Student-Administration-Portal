const Student = require("../Database/model");
const mongoose = require("mongoose");

const getStudents = async (req, res) => {
  const students = await Student.find({})
  res.status(200).json(students);
};

const getStudentById = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ json: "problem occured in ID" })
  }
  const students = await Student.findById(id)
  if (!students) {
    return res.status(404).json({ json: "no student found with this id" })
  }

  res.status(200).json(students);
}

//create a new student
const createStudent = async (req, res) => {
  const {
    name, gender, pdob, Groups
  } = req.body
  try {
    const newStudent = await Student.create({ name, gender, pdob, Groups })
    res.status(200).json(newStudent)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//deleting a specific student
const deleteStudent = async (req, res) => {
  const { id } = req.params
  const newId = id.split(',')

  const deletion = await Student.deleteMany({ _id: { $in: newId } });
  if (!deletion) {
    return res.status(404).json({ error: "Student not found or already deleted" })
  } else {
    res.status(200).json({ message: "given id deleted" })
  }
}

//updating a specific Student
const updateStudent = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "id is not valid" })
  }
  const student = await Student.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  )
  if (!student) {
    return res.status(400).json({ error: "For some reason student data is unable to update" })
  }
  res.status(200).json({ message: "Record Updated Successfully" })
}
//400: bad request
//401: unauthorazied
//403: forbidden
//404: not found
//500: internal server error

module.exports = { getStudents, getStudentById, createStudent, deleteStudent, updateStudent };

const express = require("express")
const router = express.Router()

const {
    getStudents, getStudentById, createStudent, deleteStudent, updateStudent
} = require("../Controller/studentController")

router.get('/allStudents/', getStudents)
router.get('/allStudents/:id', getStudentById)
router.post('/createStudent', createStudent)
router.delete('/deleteStudent/:id', deleteStudent)
router.patch('/updateStudent/:id', updateStudent)

module.exports = router
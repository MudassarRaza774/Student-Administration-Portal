import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Button from '@mui/material/Button';
import { Avatar, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

const columns = [
    {
        field: 'avatar', headerName: '', width: 85, renderCell: (params) => {
            return (
                <div>
                    <Avatar src={params.value} />
                </div>
            )
        }
    },
    { field: 'Name', headerName: 'Name', width: 150 },
    { field: 'Gender', headerName: 'Gender', width: 100 },
    { field: 'PDOB', headerName: 'Date of Birth', width: 120 },
    { field: 'Groups', headerName: 'Groups', width: 250 },
];

const initialData = { id: "", name: "", gender: "", pdob: "2000-01-01", Groups: [] }
let checkBoxes = []

function DataTable({ search, checkBoxFilter }) {
    let totalStudents = 0, checkCount = []
    const [popupInfo, setPopupInfo] = useState({
        "title": "New Student", "description": "Add new Student in database",
        "buttonName": "Add Student"
    })
    const [studendRecord, setStudentRecord] = useState([])
    const [formData, setFormData] = useState(initialData)
    const [loadData, setLoadData] = useState(false)
    const [open, setOpen] = useState(false);
    const [showButtons, setShowButtons] = useState(checkCount)
    totalStudents = studendRecord.length

    useEffect(() => {
        fetch('/project/allStudents')
            .then(res => res.json())
            .then(data => {
                setStudentRecord(data)
            })
    }, [loadData])


    const handleClickOpen = (value) => {
        if (value === "New Student") {
            setPopupInfo({
                "title": "New Student", "description": "Add new Student in database",
                "buttonName": "Add Student"
            })
        } else if (value === "Update Student") {
            setPopupInfo({
                "title": "Update Student", "description": "Update the Selected Student",
                "buttonName": "Update Student"
            })
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData(initialData)
        checkBoxes = []
    };

    const handleSubmit = async (e) => {
        if (formData._id) {
            setOpen(false);
            const data = await fetch(`/project/updateStudent/${formData._id}`, {
                method: "PATCH",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!data && data.status === 400) {
                window.alert("Record Updation Failed")
            } else {
                loadData ? setLoadData(false) : setLoadData(true)
                window.alert("Record Update Successfully")
                setFormData(initialData)
            }
        } else {
            checkBoxes = []
            setOpen(false);
            const data = await fetch('/project/createStudent', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (data.status === 404 && !data) {
                window.alert("Student Addition failed")
            } else {
                loadData ? setLoadData(false) : setLoadData(true)
                window.alert("Student Added Successfully")
                setFormData(initialData)
            }
        }

    };

    const images = ["gamer.png", "man.png", "beard.png"]

    const rows = studendRecord.filter((values) => {
        return (
            search === "" ? values : values.name.toLowerCase().includes(search.toLowerCase())
        )
    }).filter((values) => {
        let answer = false
        if (checkBoxFilter.length > 0) {
            for (let i = 0; i < checkBoxFilter.length; i++) {
                answer = values.Groups.includes(checkBoxFilter[i])
                if (!answer) {
                    return false
                }
            }
        }
        return values
    })
        .map((values, index) => {
            return {
                id: values._id,
                avatar: images[index % 3],
                Name: values.name,
                Gender: values.gender,
                PDOB: values.pdob,
                Groups: values.Groups
            }
        })
    const addNewStudent = (e) => {
        let { value, id } = e.target
        if (id === undefined) {
            id = "gender"
        } else if (id === "Groups") {
            if (checkBoxes.includes(value)) {
                checkBoxes.splice(checkBoxes.indexOf(value), 1)
            } else {
                checkBoxes.push(value)
                value = checkBoxes
            }
        }
        setFormData({ ...formData, [id]: value })
    }

    const deleteRecord = () => {
        const confirm = window.confirm("Are you sure you want to Delete selected record?")
        if (confirm) {
            const data = fetch(`/project/deleteStudent/${[showButtons]}`, {
                method: "DELETE"
            })
            if (data) {
                loadData ? setLoadData(false) : setLoadData(true)
            }
        }

    }

    const updataRecord = () => {
        const answer = studendRecord.filter((values) => {
            return values._id === showButtons[0]
        })
        setFormData(answer[0])
        handleClickOpen("Update Student")
    }

    const { name, gender, pdob } = formData
    return (
        <>
            <div style={{ margin: "15px 0px 20px 0px", display: "flex", justifyContent: "space-between" }}>
                <div>
                    <PersonOutlineOutlinedIcon style={{ marginBottom: "-6" }} /> {totalStudents} students
                    <Button variant='contained' onClick={() => handleClickOpen("New Student")} startIcon={<CreateOutlinedIcon />} style={{ marginLeft: "7px" }} > New student </Button>
                </div>
                {showButtons.length > 0 ?
                    <div>
                        {showButtons.length === 1 ? <Button variant='outlined' color='success' onClick={updataRecord}>Update</Button> : ""}
                        <span> </span>
                        <Button variant='outlined' color='error' onClick={deleteRecord}>Delete</Button>
                    </div> : <div></div>
                }
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={value => {
                        setShowButtons(value)
                    }
                    }
                />
            </div>
            <form>
                <Dialog open={open} maxWidth="lg" fullWidth={true} >
                    <DialogTitle>{popupInfo.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {popupInfo.description}
                        </DialogContentText>
                        <TextField
                            value={name} onChange={(e) => addNewStudent(e)} margin="dense"
                            autoComplete='off' id="name" label="Name" type="text" fullWidth variant="outlined" />
                        <TextField
                            margin="dense" id="pdob" onChange={(e) => addNewStudent(e)}
                            autoComplete='off' value={pdob} label="Date of Birth" type="date" fullWidth variant="outlined" />

                        <FormControl fullWidth margin='dense' >
                            <InputLabel id="gender">Gender</InputLabel>
                            <Select
                                // value={gender}
                                label="Gender"
                                onChange={(e) => addNewStudent(e)}
                            >
                                <MenuItem value={'Male'} >Male</MenuItem>
                                <MenuItem value={"Female"} >Female</MenuItem>
                                <MenuItem value={"Other"} >Other</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography marginTop='5px' variant='body1'>Groups</Typography>
                        <FormGroup>
                            <Grid container spacing={0}>
                                <Grid item xs={2}>
                                    <FormControlLabel control={<Checkbox size='small' value="Typography" id='Groups' onChange={(e) => addNewStudent(e)} />} label={<Typography variant="body2">Typography</Typography>} />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel control={<Checkbox size='small' value="Biologist" id='Groups' onChange={(e) => addNewStudent(e)} />} label={<Typography variant="body2">Biologists</Typography>} />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel control={<Checkbox size='small' value="Chemistry Capital" id='Groups' onChange={(e) => addNewStudent(e)} />} label={<Typography variant="body2">Chemistry Capital</Typography>} />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel control={<Checkbox size='small' value="Web Designer" id='Groups' onChange={(e) => addNewStudent(e)} />} label={<Typography variant="body2">Web Designer</Typography>} />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel control={<Checkbox size='small' value="Black Magicians" id='Groups' onChange={(e) => addNewStudent(e)} />} label={<Typography variant="body2">Black Magicians</Typography>} />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel control={<Checkbox size='small' value="Lame Gamer Boys" id='Groups' onChange={(e) => addNewStudent(e)} />} label={<Typography variant="body2">Lame Gamer Boys</Typography>} />
                                </Grid>
                            </Grid>
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                        <Button type='submit' onClick={handleSubmit} variant="outlined" color="success">{popupInfo.buttonName}</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </>
    );
}
export default DataTable
import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function FilterBar({ setSearch, checkBoxFilter, setCheckBoxFilter }) {


    const checkboxFilter = (value) => {
        const currentIndex = checkBoxFilter.indexOf(value)
        const newCatagories = [...checkBoxFilter]
        if (currentIndex === -1) {
            newCatagories.push(value)
        } else {
            newCatagories.splice(currentIndex, 1)
        }
        setCheckBoxFilter(newCatagories)
    }
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ margin: "10px 0px 20px 0px" }}>
                <span style={{ opacity: "0.7" }}>Search for Name</span>
                <br />
                <input onChange={(e) => { setSearch(e.target.value) }} placeholder="Search" />
            </div>
            <div>
                <span style={{ opacity: "0.7" }} >Filters for Study Group</span>
            </div>
            <div style={{ margin: "7px 0px 0px 10px ", fontSize: "5px" }}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox sx={{ '&.Mui-checked': { color: "#ff7961" } }} size="small" />} onChange={() => { checkboxFilter("Typography") }} label="Typography" />
                    <FormControlLabel control={<Checkbox sx={{ '&.Mui-checked': { color: "#ff7961" } }} size="small" />} onChange={() => { checkboxFilter("Biologist") }} label="Biologist" />
                    <FormControlLabel control={<Checkbox sx={{ '&.Mui-checked': { color: "#ff7961" } }} size="small" />} onChange={() => { checkboxFilter("Chemistry Capital") }} label="Chemistry Capital" />
                    <FormControlLabel control={<Checkbox sx={{ '&.Mui-checked': { color: "#ff7961" } }} size="small" />} onChange={() => { checkboxFilter("Web Designer") }} label="Web Designer" />
                    <FormControlLabel control={<Checkbox sx={{ '&.Mui-checked': { color: "#ff7961" } }} size="small" />} onChange={() => { checkboxFilter("Black Magicians") }} label="Black Magicians" />
                    <FormControlLabel control={<Checkbox sx={{ '&.Mui-checked': { color: "#ff7961" } }} size="small" />} onChange={() => { checkboxFilter("Lame Gamer Boys") }} label="Lame Gamer Boys" />
                </FormGroup>
            </div>

        </div>
    )
}

export default FilterBar


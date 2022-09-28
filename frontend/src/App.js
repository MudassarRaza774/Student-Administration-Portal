import React, { useState } from "react"
import './App.css';
import Grid from '@mui/material/Grid';
import DataTable from './Components/DataGrid';
import FilterBar from './Components/FilterBar';

function App() {

  const [search, setSearch] = useState('')
  const [checkBoxFilter, setCheckBoxFilter] = useState([])
  return (
    <>
      <div style={{ marginTop: "20px"}}>
        <div style={{ textAlign: "center", color: "orange", fontSize: "35px", fontFamily: "monospace" }}>
          <b>SAF</b>
        </div>
        <Grid container spacing={0}>
          <Grid item lg={3} xs={12} >
            <FilterBar setSearch={setSearch} checkBoxFilter={checkBoxFilter} setCheckBoxFilter={setCheckBoxFilter} />
          </Grid>
          <Grid item lg={9} xs={12}>
            <DataTable search={search} checkBoxFilter={checkBoxFilter} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;

import * as React from 'react';
import {
    Link
  } from 'react-router-dom';
  import { 
    Typography,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    Stack,
  } from '@mui/material';

function createData(id: string, name: string, enab: string, hit: number) {
  return { id, name, enab, hit };
}
  
const rows = [
  createData('1', 'test1', 'wiki.fandom.com', 5),
  createData('2', 'test2', '3 wikis', 10),
];
  
export default  function Filterlist() {
  const [filterData, setFilterData] = React.useState(rows);

  return (
    <>
    <Typography component="h1" variant="h4">Filters</Typography>
    <Stack direction="row" spacing={1}>
      <Typography>
        <strong>{0} Enabled</strong>
      </Typography>
      <Typography>{0} Disabled</Typography>
    </Stack>
    <TableContainer component={Paper} variant="outlined">
      <Table size="small" aria-label="Filter list">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Enabled on</TableCell>
            <TableCell>Hit count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterData.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
              <Typography component={Link} to={`${row.id}`} variant="body1" className="links" color="inherit">{row.id}</Typography>
              </TableCell>
              <TableCell>
                <Typography component={Link} to={`${row.id}`} variant="body1" className="links" color="inherit">{row.name}</Typography>
              </TableCell>
              <TableCell>{row.enab}</TableCell>
              <TableCell>{row.hit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

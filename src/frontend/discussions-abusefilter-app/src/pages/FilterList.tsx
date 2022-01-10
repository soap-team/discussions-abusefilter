import * as React from 'react';
import {
  Link as RouterLink,
} from 'react-router-dom';
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Link,
} from '@mui/material';

function createData(id: string, filterName: string, lastEdit: string, wikis: string[], hits: number) {
  return { id, filterName, lastEdit, wikis, hits };
}

const rows = [
  createData('1', 'test1', 'Noreplyz', ['community'], 5),
  createData('2', 'test2', 'Noreplyz', ['community', 'noreply'], 10),
  createData('3', 'test3', 'Noreplyz', ['avatar', 'noreply', 'noreply', 'noreply', 'noreply'], 10),
];

export default function Filterlist() {
  const [filterData] = React.useState(rows);

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
              <TableCell>Filter</TableCell>
              <TableCell>Last edited by</TableCell>
              <TableCell>Wikis</TableCell>
              <TableCell>Hits</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    <Link component={RouterLink} to={row.id} className="tableLink" color="inherit" underline="none">{row.filterName}</Link>
                  </Typography>
                </TableCell>
                <TableCell>{row.lastEdit}</TableCell>
                <TableCell>{row.wikis.length > 2 ? `${row.wikis[0]}, +${row.wikis.length - 1} more` : row.wikis.join(', ')}</TableCell>
                <TableCell>{row.hits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

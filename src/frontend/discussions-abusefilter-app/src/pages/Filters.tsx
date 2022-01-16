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
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { fandomPurple } from 'themes/Theme';

function createData(id: string, filterName: string, lastEdit: string, wikis: string[], hits: number) {
  return { id, filterName, lastEdit, wikis, hits };
}

const rows = [
  createData('1', 'test1', 'Noreplyz', ['community'], 5),
  createData('2', 'test2', 'Noreplyz', ['community', 'noreply'], 10),
  createData('3', 'test3', 'Noreplyz', ['avatar', 'noreply', 'noreply', 'noreply', 'noreply'], 10),
];

const headings = [
  'ID',
  'Filter',
  'Last edited by',
  'Wikis',
  'Hits',
];

export default function Filters() {
  const [filterData] = React.useState(rows);
  const theme = useTheme();

  return (
    <Box>
      <Typography component="h1" variant="h4">Filters</Typography>
      <Stack direction="row" spacing={1}>
        <Typography sx={{ fontWeight: 700 }}>{0} Enabled</Typography>
        <Typography>{0} Disabled</Typography>
      </Stack>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small" aria-label="Filters">
          <TableHead sx={{ backgroundColor: fandomPurple }}>
            <TableRow>
              {headings.map((heading) =>
                <TableCell key={heading} sx={{
                  color: theme.palette.getContrastText(theme.palette.secondary.main),
                }}>
                  {heading}
                </TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    <Link component={RouterLink} to={row.id} underline="none">{row.filterName}</Link>
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
    </Box>
  );
}

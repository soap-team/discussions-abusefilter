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
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { fandomPurple } from 'themes/Theme';
// import { localMode } from 'App';
import { LocalBackendInterface } from 'interfaces/LocalBackendInterface';
import type { FilterMetadata } from '@shared/filters';

// missing hits
// function createData(id: string, title: string, editedBy: string, wikis: string[], description: string) {
//   return { id, title, editedBy, wikis, description };
// }

// const rows: FilterMetadata[] = [
//   createData('1', 'test1', 'Noreplyz', ['community'], 5),
//   createData('2', 'test2', 'Noreplyz', ['community', 'noreply'], 10),
//   createData('3', 'test3', 'Noreplyz', ['avatar', 'noreply', 'noreply', 'noreply', 'noreply'], 10),
// ];

const headings = [
  'ID',
  'Filter',
  'Last edited by',
  'Wikis',
  'Hits',
];

export default function Filters() {
  const [filterData, setFilterData] = React.useState([] as FilterMetadata[]);
  const theme = useTheme();

  React.useEffect(() => {
    // eslint-disable-next-line no-constant-condition
    if (true) {
      LocalBackendInterface.getInstance().getFilters()
        .then(res => setFilterData(res));
    }
    LocalBackendInterface.getInstance().getFilters().then(res=>console.log(res));
  }, []);

  return (
    <Box>
      <Typography component="h1" variant="h4">Filters</Typography>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'end' }}>
          <Typography sx={{ fontWeight: 700 }}>{0} Enabled</Typography>
          <Typography>{0} Disabled</Typography>
        </Stack>
        <Button component={RouterLink} to="new" variant="outlined" size="small">New filter</Button>
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
                    <Link component={RouterLink} to={row.id} underline="none">{row.title}</Link>
                  </Typography>
                </TableCell>
                <TableCell>{row.editedBy}</TableCell>
                <TableCell>{row.wikis.length > 2 ? `${row.wikis[0]}, +${row.wikis.length - 1} more` : row.wikis.join(', ')}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

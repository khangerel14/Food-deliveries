import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';
import { useTable } from 'src/hooks/useTable';

import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps, UsersResponse } from '../user-table-row';

// ----------------------------------------------------------------------

export function UserView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [users, setUsers] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
      const fetchUsers = async () => {
        try {
          if (token) {
            const response = await axios.get<UsersResponse>(
              'http://localhost:8000/api/users/adminUsers',
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setUsers(response.data);
          } else {
            console.log("Invalid token or token is empty")
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      };

    fetchUsers();
  }, []);

  const dataFiltered: UserProps[] = applyFilter({
    inputData: users?.data || [],
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const totalCount = users?.totalCount || 0;

  const notFound = !dataFiltered.length && !!filterName;

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Users
        </Typography>
      </Box>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={users?.data.length || 0}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(checked, users?.data.map((user) => user.id) || [])
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'auth0Id', label: 'Auth0Id' },
                  { id: 'createdAt', label: 'CreatedAt' },
                  { id: 'updatedAt', label: 'UpdatedAt' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}
                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, users?.data.length || 0)}
                />
                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          component="div"
          page={table.page}
          count={totalCount}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

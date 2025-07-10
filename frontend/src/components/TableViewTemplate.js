import React, { useState } from 'react'
import { StyledTableCell, StyledTableRow } from './styles';
import { Table, TableBody, TableContainer, TableHead, TablePagination, Paper } from '@mui/material';
import styled from 'styled-components';

const TableViewTemplate = ({ columns, rows, title = "Data View" }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    return (
        <TableWrapper>
            <TableHeader>
                <TableTitle>{title}</TableTitle>
                <TableSubtitle>Displaying {rows.length} items</TableSubtitle>
            </TableHeader>
            
            <StyledTableContainer component={Paper} elevation={3}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column, index) => (
                                <StyledTableCell
                                    key={index}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length === 0 ? (
                            <StyledTableRow>
                                <StyledTableCell colSpan={columns.length} align="center">
                                    <EmptyState>
                                        <EmptyIcon>📊</EmptyIcon>
                                        <EmptyText>No data to display</EmptyText>
                                        <EmptySubtext>There are no records available at this time.</EmptySubtext>
                                    </EmptyState>
                                </StyledTableCell>
                            </StyledTableRow>
                        ) : (
                            rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, rowIndex) => {
                                    return (
                                        <StyledTableRow 
                                            hover 
                                            role="checkbox" 
                                            tabIndex={-1} 
                                            key={row.id || rowIndex}
                                        >
                                            {columns.map((column, index) => {
                                                const value = row[column.id];
                                                return (
                                                    <StyledTableCell key={index} align={column.align}>
                                                        {
                                                            column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value
                                                        }
                                                    </StyledTableCell>
                                                );
                                            })}
                                        </StyledTableRow>
                                    );
                                })
                        )}
                    </TableBody>
                </Table>
            </StyledTableContainer>
            
            {rows.length > 0 && (
                <StyledTablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                    labelRowsPerPage="Items per page:"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                />
            )}
        </TableWrapper>
    )
}

export default TableViewTemplate

const TableWrapper = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(127, 86, 218, 0.1);
  border: 1px solid rgba(127, 86, 218, 0.05);
`;

const TableHeader = styled.div`
  padding: 24px 24px 16px 24px;
  border-bottom: 1px solid rgba(127, 86, 218, 0.1);
`;

const TableTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #550080;
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
`;

const TableSubtitle = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  font-weight: 400;
`;

const StyledTableContainer = styled(TableContainer)`
  && {
    max-height: 600px;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(127, 86, 218, 0.05);
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(127, 86, 218, 0.3);
      border-radius: 4px;
      
      &:hover {
        background: rgba(127, 86, 218, 0.5);
      }
    }
  }
`;

const StyledTablePagination = styled(TablePagination)`
  && {
    background: rgba(255, 255, 255, 0.8);
    border-top: 1px solid rgba(127, 86, 218, 0.1);
    padding: 16px 24px;
    
    .MuiTablePagination-selectLabel,
    .MuiTablePagination-displayedRows {
      color: #6c757d;
      font-weight: 500;
    }
    
    .MuiTablePagination-select {
      color: #550080;
      font-weight: 600;
    }
    
    .MuiIconButton-root {
      color: #7f56da;
      
      &:hover {
        background-color: rgba(127, 86, 218, 0.1);
      }
      
      &.Mui-disabled {
        color: #adb5bd;
      }
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.6;
`;

const EmptyText = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #550080;
  margin: 0 0 8px 0;
`;

const EmptySubtext = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  max-width: 300px;
  line-height: 1.5;
`;
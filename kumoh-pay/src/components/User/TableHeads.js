import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const TableHeads = (props) => {
    const createSortHandler = (property) => (event) => {
        props.onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
          { props.headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="center"
              sortDirection={ props.orderBy === headCell.id ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === headCell.id}
                direction={props.orderBy === headCell.id ? props.order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {props.orderBy === headCell.id ? (
                  <span className={props.classes.visuallyHidden}>
                    {props.order === "desc" ? "sorted descending" : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell>상세정보</TableCell>
          <TableCell>사용자삭제</TableCell>
        </TableRow>
      </TableHead>
    );
  }
  export default TableHeads;
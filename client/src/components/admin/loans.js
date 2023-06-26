import React,{useMemo} from 'react'
import './members.css'
import Data from './mockup'
import {useTable} from 'react-table'
function Loans() {
  const data= useMemo (() => Data ,[])
  const columns=useMemo(() => [
    {
      Header:"NAME",
      accessor:"name"
    },
    {
      Header:"EMAIL",
      accessor:"email"
    },
    {
      Header:"ADDRESS",
      accessor:"address"
    },
    {
      Header:"CONTACTNUMBER",
      accessor:"contactNumber"
    }
  ],[]);

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =useTable ({columns, data})
  return (
    <>
    <h2>Users</h2>
    <div className='container'>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) =>(
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) =>(
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map((row) =>{
              prepareRow(row)
              return(
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) =>(
                  <td {...cell.getCellProps()}>
                      {cell.render("Cell")} 
                  </td>
            ))}
                </tr>
              )
            })}
          </tbody>
      </table>
    </div>
    </>
    )}

export default Loans
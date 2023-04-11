import styled from '@emotion/styled'
import { Button, Dialog, DialogTitle, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { FC, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import { IForm } from '../../../models/formModel'
import Icon from '../../shared/Icon'
import BasicModal from '../../shared/BasicModal'
import FormEdit from './FormEdit'
import dayjs from 'dayjs'

const StyledForms = styled.div`
`

const StyledButton = styled(Button)`
  margin-bottom: 15px;
`

const Forms: FC<Props> = () => {
  const [show, setShow] = useState<boolean>(false)
  const [form, setForm] = useState<IForm|null>(null)
  const { loaded, error, handleReload, ...fetch } = useFetch('api/form')
  const data: IForm[] = fetch.data?.records || []
  return (
    <StyledForms>
      {show && 
        <BasicModal title={form ? "Edit" : "Create"} open={show} handleClose={() => setShow(false)}>
          <FormEdit form={form} onSubmit={() => {setShow(false); handleReload()}} />
        </BasicModal>
      }
      <StyledButton color="success" variant="contained" onClick={() => setShow(true)}>
        <Icon>add</Icon>&nbsp;Add record
      </StyledButton>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Start</TableCell>
              <TableCell align="right">End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">
                  <Link component="button" onClick={() => {setShow(true); setForm(row)}}>
                    {row.title}
                  </Link>
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.start ? dayjs(row.start).format('MM/DD/YYYY hh:mm A') : ''}</TableCell>
                <TableCell align="right">{row.end ? dayjs(row.end).format('MM/DD/YYYY hh:mm A') : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledForms>
  )
}

interface Props {
}

export default Forms
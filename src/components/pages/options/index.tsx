import styled from '@emotion/styled'
import { Button, Dialog, DialogTitle, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { FC, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import Icon from '../../shared/Icon'
import BasicModal from '../../shared/BasicModal'
import { IOption } from '../../../models/optionModel'
import OptionEdit from './OptionEdit'

const StyledOptions = styled.div`
`

const StyledButton = styled(Button)`
  margin-bottom: 15px;
`

const Options: FC<Props> = () => {
  const [show, setShow] = useState<boolean>(false)
  const [option, setOption] = useState<IOption|null>(null)
  const { loaded, error, handleReload, ...fetch } = useFetch('api/question_option')
  const data: IOption[] = fetch.data?.records || []
  return (
    <StyledOptions>
      {show && 
        <BasicModal title={option ? "Edit" : "Create"} open={show} handleClose={() => setShow(false)}>
          <OptionEdit option={option} onSubmit={() => {setShow(false); handleReload()}} />
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
              <TableCell align="right">Question</TableCell>
              <TableCell align="right">Label</TableCell>
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
                <TableCell align="right">{row.idQuestion?.label}</TableCell>
                <TableCell align="right">
                  <Link component="button" onClick={() => {setShow(true); setOption(row)}}>
                    {row.label}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledOptions>
  )
}

interface Props {
}

export default Options
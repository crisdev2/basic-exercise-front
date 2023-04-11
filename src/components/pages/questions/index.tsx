import styled from '@emotion/styled'
import { Button, Dialog, DialogTitle, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { FC, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import { IQuestion } from '../../../models/questionModel'
import Icon from '../../shared/Icon'
import BasicModal from '../../shared/BasicModal'
import QuestionEdit from './QuestionEdit'
import dayjs from 'dayjs'

const StyledQuestions = styled.div`
`

const StyledButton = styled(Button)`
  margin-bottom: 15px;
`

const Questions: FC<Props> = () => {
  const [show, setShow] = useState<boolean>(false)
  const [question, setQuestion] = useState<IQuestion|null>(null)
  const { loaded, error, handleReload, ...fetch } = useFetch('api/question')
  const data: IQuestion[] = fetch.data?.records || []
  return (
    <StyledQuestions>
      {show && 
        <BasicModal title={question ? "Edit" : "Create"} open={show} handleClose={() => setShow(false)}>
          <QuestionEdit question={question} onSubmit={() => {setShow(false); handleReload()}} />
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
              <TableCell align="right">Form</TableCell>
              <TableCell align="right">Label</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Required</TableCell>
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
                <TableCell align="right">{row.idForm?.title}</TableCell>
                <TableCell align="right">
                  <Link component="button" onClick={() => {setShow(true); setQuestion(row)}}>
                    {row.label}
                  </Link>
                </TableCell>
                <TableCell align="right">{row.idQuestionType?.name}</TableCell>
                <TableCell align="right">{row.required ? 'True' : 'False'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledQuestions>
  )
}

interface Props {
}

export default Questions
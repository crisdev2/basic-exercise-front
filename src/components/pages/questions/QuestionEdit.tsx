import styled from '@emotion/styled'
import { FC } from 'react'
import { IForm } from '../../../models/formModel'
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import axios from 'axios'
import { IQuestion } from '../../../models/questionModel'
import { useFetch } from '../../../hooks/useFetch'
import { IQuestionType } from '../../../models/questionTypeModel'

const StyledQuestionEdit = styled.div`
`

const StyledForm = styled.form`
`

const QuestionEdit: FC<Props> = ({ question, onSubmit }) => {

  const fetchForms = useFetch('api/form')
  const forms: IForm[] = fetchForms.data?.records || []

  const fetchQuestionTypes = useFetch('api/question_type')
  const questionTypes: IQuestionType[] = fetchQuestionTypes.data?.records || []

  const handlePersist = async (path: string, values: IQuestion) => {
    let response;
    if (!values.id) {
      response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/${path}`, values)
    } else {
      response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/${path}/${values.id}`, values)
    }
    return response
  }
  
  const handleDelete = async (path: string) => {
    const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/${path}/${question?.id}`)
    if (onSubmit) onSubmit()
    return response
  }

  const formik = useFormik({
    initialValues: {
      id: question?.id || null,
      idForm: question?.idForm?.id || null,
      idQuestionType: question?.idQuestionType?.id || null,
      label: question?.label || '',
      required: question?.required,
    },
    validationSchema: yup.object({
      idForm: yup
        .number()
        .required('Form is required'),
      idQuestionType: yup
        .number()
        .required('Type is required'),
      label: yup
        .string()
        .required('Label is required'),
      required: yup
        .boolean(),
    }),
    onSubmit: async (values) => {
      await handlePersist('api/question', values as IQuestion)
      if (onSubmit) onSubmit()
    },
  })

  return (
    <StyledQuestionEdit>
      <StyledForm onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item sm={6}>
            <FormControl>
              <InputLabel id="idForm-label">Form</InputLabel>
              <Select
                fullWidth
                label="idForm-label"
                id="idForm"
                name="idForm"
                value={formik.values.idForm}
                onChange={formik.handleChange}
                error={formik.touched.idForm && Boolean(formik.errors.idForm)}
              >
                {forms.map((row) => (
                  <MenuItem value={Number(row.id)} key={row.id}>{row.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl>
              <InputLabel id="idQuestionType-label">Question Type</InputLabel>
              <Select
                fullWidth
                label="idQuestionType-label"
                id="idQuestionType"
                name="idQuestionType"
                value={formik.values.idQuestionType}
                onChange={formik.handleChange}
                error={formik.touched.idQuestionType && Boolean(formik.errors.idQuestionType)}
              >
                {questionTypes.map((row) => (
                  <MenuItem value={Number(row.id)} key={row.id}>{row.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl>
              <TextField
                fullWidth
                id="label"
                name="label"
                label="Label"
                value={formik.values.label}
                onChange={formik.handleChange}
                error={formik.touched.label && Boolean(formik.errors.label)}
                helperText={formik.touched.label && formik.errors.label}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl>
              <FormControlLabel
                label="Required?"
                control={
                  <Switch
                    id="required"
                    name="required"
                    value={formik.values.required}
                    checked={formik.values.required}
                    onChange={formik.handleChange}
                  />
                }
              />
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
          {!!question &&
            <Grid item sm={12}>
              <Button color="error" variant="contained" fullWidth onClick={() => handleDelete('api/question')}>
                Delete
              </Button>
            </Grid>
          }
        </Grid>
      </StyledForm>
    </StyledQuestionEdit>
  )
}

interface Props {
  question: IQuestion | null
  onSubmit: () => void
}

export default QuestionEdit
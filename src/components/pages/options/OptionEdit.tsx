import styled from '@emotion/styled'
import { FC } from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { IOption } from '../../../models/optionModel'
import { useFetch } from '../../../hooks/useFetch'
import { IQuestion } from '../../../models/questionModel'

const StyledOptionEdit = styled.div`
`

const StyledForm = styled.form`
`

const OptionEdit: FC<Props> = ({ option, onSubmit }) => {

  const fetchQuestions = useFetch('api/question')
  const questions: IQuestion[] = fetchQuestions.data?.records || []

  const handlePersist = async (path: string, values: IOption) => {
    let response;
    if (!values.id) {
      response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/${path}`, values)
    } else {
      response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/${path}/${values.id}`, values)
    }
    return response
  }
  
  const handleDelete = async (path: string) => {
    const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/${path}/${option?.id}`)
    if (onSubmit) onSubmit()
    return response
  }

  const formik = useFormik({
    initialValues: {
      id: option?.id || null,
      idQuestion: option?.idQuestion?.id || null,
      label: option?.label || '',
    },
    validationSchema: yup.object({
      idQuestion: yup
        .number()
        .required('Form is required'),
      label: yup
        .string()
        .required('Label is required'),
    }),
    onSubmit: async (values) => {
      await handlePersist('api/question_option', values as IOption)
      if (onSubmit) onSubmit()
    },
  })

  return (
    <StyledOptionEdit>
      <StyledForm onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item sm={6}>
            <FormControl>
              <InputLabel id="idQuestion-label">Question</InputLabel>
              <Select
                fullWidth
                label="idQuestion-label"
                id="idQuestion"
                name="idQuestion"
                value={formik.values.idQuestion}
                onChange={formik.handleChange}
                error={formik.touched.idQuestion && Boolean(formik.errors.idQuestion)}
              >
                {questions.map((row) => (
                  <MenuItem value={Number(row.id)} key={row.id}>{row.label}</MenuItem>
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
          <Grid item sm={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
          {!!option &&
            <Grid item sm={12}>
              <Button color="error" variant="contained" fullWidth onClick={() => handleDelete('api/question_option')}>
                Delete
              </Button>
            </Grid>
          }
        </Grid>
      </StyledForm>
    </StyledOptionEdit>
  )
}

interface Props {
  option: IOption | null
  onSubmit: () => void
}

export default OptionEdit
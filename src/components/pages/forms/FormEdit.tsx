import styled from '@emotion/styled'
import { FC } from 'react'
import { IForm } from '../../../models/formModel'
import { Button, FormControl, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import axios from 'axios'

const StyledFormEdit = styled.div`
`

const StyledForm = styled.form`
`

const FormEdit: FC<Props> = ({ form, onSubmit }) => {

  const handlePersist = async (path: string, values: IForm) => {
    let response;
    if (!values.id) {
      response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/${path}`, values)
    } else {
      response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/${path}/${values.id}`, values)
    }
    return response
  }
  
  const handleDelete = async (path: string) => {
    const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/${path}/${form?.id}`)
    if (onSubmit) onSubmit()
    return response
  }

  const formik = useFormik({
    initialValues: {
      id: form?.id || null,
      title: form?.title || '',
      description: form?.description || '',
      start: form?.start ? dayjs(form.start).format('DD/MM/YYYY HH:mm:ss') : '',
      end: form?.end ? dayjs(form.end).format('DD/MM/YYYY HH:mm:ss') : '',
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .required('Title is required'),
      description: yup
        .string()
        .required('Description is required'),
      start: yup
        .string()
        .required('Start is required'),
      end: yup
        .string()
        .required('End is required'),
    }),
    onSubmit: async (values) => {
      await handlePersist('api/form', values)
      if (onSubmit) onSubmit()
    },
  })

  return (
    <StyledFormEdit>
      <StyledForm onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item sm={6}>
            <FormControl>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <DateTimePicker
              label="Start"
              value={dayjs(formik.values.start)}
              onChange={(value) => formik.setFieldValue('start', value?.format('DD/MM/YYYY HH:mm:ss'))}
            />
          </Grid>
          <Grid item sm={6}>
            <DateTimePicker
              label="End"
              value={dayjs(formik.values.end)}
              onChange={(value) => formik.setFieldValue('end', value?.format('DD/MM/YYYY HH:mm:ss'))}
            />
          </Grid>
          <Grid item sm={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
          {!!form &&
            <Grid item sm={12}>
              <Button color="error" variant="contained" fullWidth onClick={() => handleDelete('api/form')}>
                Delete
              </Button>
            </Grid>
          }
        </Grid>
      </StyledForm>
    </StyledFormEdit>
  )
}

interface Props {
  form: IForm | null
  onSubmit: () => void
}

export default FormEdit
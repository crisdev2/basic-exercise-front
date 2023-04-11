import styled from '@emotion/styled'
import { Grid, Skeleton } from '@mui/material'

const StyledContent = styled.div`
`

const Content = () => {
  const loaded = false
  return (
    <StyledContent>
      {
        loaded ? 
        <>
          <>Layout content...</>
        </>
        :
        <>
          <Grid container spacing={8}>
            {[...Array(6)].map((item, index) => (
              <Grid item key={index} md={4}>
                <Skeleton variant="rounded" width="100%" height="200px">
                </Skeleton>
              </Grid>
            ))}
          </Grid>
        </>
      }
    </StyledContent>
  )
}

export default Content
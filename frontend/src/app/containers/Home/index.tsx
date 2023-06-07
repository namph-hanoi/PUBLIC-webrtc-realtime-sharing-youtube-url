import React from 'react'
import Header from '../../components/Header'
import { Container, Grid, Paper } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllSharings, selectGlobalState } from '../Global/globalSlice';
import styles from './styles.module.scss';

interface ISharingItem {
    id: number,
    link: string,
    title: string,
    description: string,
    thumbnail_link: string,
    owner: {
        id: number,
        email: string
    }
}

const rawStringToJSX = (descriotion: string) => {
  const lines =  descriotion.split("\\n");

  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
}

function HomePage() {
  const dispatch = useAppDispatch();
  const { listOfSharing } = useAppSelector(selectGlobalState);

  React.useEffect(() => {
    dispatch(getAllSharings());
  }, []);

  return (
    <div className={`${styles.wrap}`}>
      <Header></Header>
      <Container maxWidth="sm">
        <div className='flex flex-col pt-10'>
        {
          !listOfSharing.length ? (
            <p>There is no sharing yet</p>
          ) : (
            listOfSharing.map((sharingItem: ISharingItem) => (
              <Paper className='p-2 mb-5'>
                <a target="_blank" href={sharingItem.link}>
                  <Grid container>
                    <Grid item md={6} xs={12}>
                      <img src={sharingItem.thumbnail_link} />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <div className={`${styles.desc_wrap}`}>
                        <div className={`${styles.desc_content}`}>
                          <b>{sharingItem.title}</b>
                          <br/>
                          <p><b>Description:</b></p>
                          {/* Title and description */}
                          <>{rawStringToJSX(sharingItem.description)}</>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </a>
              </Paper>
            ))
          )
        }
          </div>
      </Container>
    </div>
  )
};

export default React.memo(HomePage);

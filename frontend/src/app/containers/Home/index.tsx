import React from 'react'
import Header from '../../components/Header'
import { Container, Grid } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllSharings, selectGlobalState } from '../Global/globalSlice';
import styles from './styles.module.css';

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
      <Container>
        {
          !listOfSharing.length ? (
            <p>There is no sharing yet</p>
          ) : (
            <div className='flex flex-col'>
            {listOfSharing.map((sharingItem: ISharingItem) => (
                <a target="_blank" href={sharingItem.link}>
                  <Grid container>
                    <Grid item md={6} xs={12}>
                      <img src={sharingItem.thumbnail_link} />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <div className={`${styles.desc_wrap}`}>
                        <div className={`${styles.desc_content}`}>
                          <p>{sharingItem.title}</p>
                          <p>Description:</p>
                          {/* Title and description */}
                          <>{rawStringToJSX(sharingItem.description)}</>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </a>
            ))}
            </div>
          )
        }


      </Container>
    </div>
  )
};

export default React.memo(HomePage);

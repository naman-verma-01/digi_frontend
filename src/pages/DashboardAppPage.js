import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const navigate = useNavigate()
  const theme = useTheme();
  const [totalUsers, setTotalUsers] = useState(0)
  // const [totalAmount, setTotalAmount] = useState(0)


  useEffect(() => {

    getInvoices()
  })

  const getInvoices = async () => {
    let res;

    const token = localStorage.getItem('accessToken')


    res = await fetch(`https://digi-backend.vercel.app/getAllUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    })

    res = await res.json();


    // let allInvoices = res.data.map((element) => element.invoiceData)
    // allInvoices = allInvoices.flat()


    // const totalAmountofInvoice = res.data.reduce((arr, element) => arr + element.amount,0)

    setTotalUsers(res.data.length)
    // setTotalAmount(totalAmountofInvoice)
  }
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Hi, Naman Verma<br />Welcome back
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          namanvermaca@gmail.com
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Total Users" total={totalUsers} icon={'icon-park-outline:order'} />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Total Invoice Amount" total={totalAmount} color="info" icon={'fluent-mdl2:completed'} />
          </Grid> */}


          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Users"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Udaipur',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Delhi',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Bangalore',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Users"
              chartData={[
                { label: 'Delhi', value: 34 },
                { label: 'Mumbai', value: 23 },
                { label: 'Bangalore', value: 6 },
                { label: 'Jaipur', value: 32 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}

import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getAcviteByDate } from '../../../apis';
import HighLightCard from './HighLightCard/HighLightCard';

const HighLightStyled = styled.div`
    height:20vh;
`
export default function HighLight({ report }) {
    const [newData, setNewData] = useState([]);
    console.log('data', newData);
    const data = report && report.length ? report[report.length - 1] : [];
    const summary = [
        {
            title: 'Số ca nhiễm',
            count: data.Confirmed,
            type: 'confirmed'
        },
        {
            title: 'Số ca khỏi',
            count: data.Recovered,
            type: 'recovered'
        },
        {
            title: 'Số ca tử vong',
            count: data.Deaths,
            type: 'death'
        }
    ];
    useEffect(() => {
        getAcviteByDate().then((res) => setNewData(res))
    }, [])
    return (
        <HighLightStyled>
            <Grid container spacing={3}>
                {
                    summary.map(sum => {
                        return <Grid item sm={4} xs={12}>
                            <HighLightCard title={sum.title} count={sum.count} type={sum.type} />
                        </Grid>
                    })
                }
            </Grid>
        </HighLightStyled>
    )
}

import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import HighMaps from '../../Charts/HighMaps/HighMaps';
import LineChart from '../../Charts/LineChart/LineChart'

const SummaryStyled = styled.div`
    height:40vh;
    margin-top: 5px;
`;


export default function Summary({ report, selectedCountryId }) {
    const [mapData, setMapData] = useState({});
    useEffect(() => {
        if (selectedCountryId) {
            import(`@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`).then(res => setMapData(res));

        }
    }, [selectedCountryId])
    return (
        <SummaryStyled>
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <LineChart data={report} />
                </Grid>
                <Grid item sm={4} xs={12}>
                    <HighMaps mapData={mapData} />
                </Grid>
            </Grid>
        </SummaryStyled>
    )
}

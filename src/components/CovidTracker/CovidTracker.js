
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container, Typography } from '@material-ui/core'
import { getCountries, getReportByCountry } from '../../apis'
import CountrySelector from './CountrySelector/CountrySelector'
import HighLight from './HighLight/HighLight'
import Summary from './Summary/Summary';
import 'moment/locale/vi';
import '@fontsource/roboto';
moment.locale('vi');
export default function CovidTracker() {
    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState();
    const [report, setReport] = useState([]);
    const AppStyled = styled.div`
        height: 100vh;
    `;
    useEffect(() => {
        getCountries().then(res => {
            setCountries(res.data);
            setSelectedCountryId('vn');
        });
    }, [])
    const handleOnChange = (e) => {
        setSelectedCountryId(e.target.value);

    }
    useEffect(() => {
        if (selectedCountryId) {
            const { Slug } = countries.find(country => country.ISO2.toLowerCase() === selectedCountryId);
            // call api
            getReportByCountry(Slug).then(res => {
                // xoa di item cuoi cung trong array
                res.data.pop();
                setReport(res.data)
            })
        }

    }, [countries, selectedCountryId])
    return (
        <AppStyled>
            <Container>
                <Typography variant="h2" component="h2">Số liệu covid 19</Typography>
                <Typography>{moment().format('LLL')}</Typography>
                <CountrySelector value={selectedCountryId} countries={countries} handleOnChange={handleOnChange} />
                <HighLight report={report} />
                <Summary report={report} selectedCountryId={selectedCountryId} />
            </Container>
        </AppStyled>
    )
}

import { FormControl, FormHelperText, InputLabel, makeStyles, NativeSelect } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const CountryStyled = styled(FormControl)`
    height:10vh;
`
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: `${theme.spacing(3)}px 0`
    }
}))
export default function CountrySelector({ value, handleOnChange, countries }) {
    const styles = useStyles();
    countries.sort((a, b) => a.Country.localeCompare(b.Country))
    return (
        <CountryStyled className={styles.formControl}>
            <InputLabel htmlFor="country-selector" shrink>Quốc Gia</InputLabel>
            <NativeSelect
                value={value}
                onChange={handleOnChange}
                inputProps={{
                    name: 'country',
                    id: 'country-selector'
                }}>
                {countries.map((country) => {
                    return <option key={country.ISO2} value={country.ISO2.toLowerCase()}>{country.Country}</option>
                })}
            </NativeSelect>
            <FormHelperText>
                Lựa chọn quốc gia
            </FormHelperText>
        </CountryStyled>
    )
}

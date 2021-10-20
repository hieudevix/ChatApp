import axios from 'axios';

export const getCountries = async () => {

    const result = await axios({
        url: 'https://api.covid19api.com/countries',
        method: 'GET'
    });
    return result;
}

export const getReportByCountry = async (country) => {
    const result = await axios({
        url: `https://api.covid19api.com/dayone/country/${country}`,
        method: 'GET'
    })
    return result
}

export const getAcviteByDate = async () => {
    const result = await axios({
        url: `https://api.covid19api.com/summary`,
        method: 'GET'
    })
    return result
}
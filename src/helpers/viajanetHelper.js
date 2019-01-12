import moment from 'moment';

import ViajanetApi from '../api/viajanetApi';

const REQUEST_DATE_MASK = "YYYY-MM-DD";

const getViajanetBestPriceSync = async data => {
  let body = {
    LoadLocations: false,
    LoadAirCompanies: false,
    OnlyBestAirCompany: false,
    ResultsAmount: 100
  };

  body.Origin = data.originIATA;
  body.Destination = data.destinationIATA;
  body.StartDeparture = data.departureDate;
  body.IsRoundTrip = data.isRoundTrip;

  if (data.isRoundTrip) {
    body.TripDays = data.tripDays;
  }

  const promise = await ViajanetApi.getBestPriceTrip(body);

  return promise;
}

const fetchBestPricesInMonth = data => {
  const currentDate = moment();
  let startDate;
  let promiseArray = [];

  if (data.month === currentDate.month() && data.year === currentDate.year()) {
    startDate = moment();
  } else {
    startDate = moment(`${data.year}-${data.month+1}-01`, REQUEST_DATE_MASK);
  }

  let requestBody = {
    originIATA: data.originIATA,
    destinationIATA: data.destinationIATA,
    isRoundTrip: data.isRoundTrip
  }

  while(startDate.month() === data.month) {
    requestBody.departureDate = startDate.format(REQUEST_DATE_MASK);

    if (data.isRoundTrip) {
      requestBody.tripDays = [data.minDays, data.maxDays];
    }

    const promise = getViajanetBestPriceSync(requestBody);
    promiseArray.push(promise);

    startDate = startDate.add(1, 'day');
  }

   return Promise.all(promiseArray);
}

export default fetchBestPricesInMonth;
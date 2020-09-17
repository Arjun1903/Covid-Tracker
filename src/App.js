import React, { useState,useEffect } from 'react';
import './App.css';
import {Select ,FormControl,MenuItem, Card, CardContent} from "@material-ui/core";
import Table from './Component/Table'
import InfoBox from './Component/InfoBox'
import Map from './Component/Map'
import {sortData , prettyPrintStat} from './util'
import LineGraph from './Component/LineGraph'
import 'leaflet/dist/leaflet.css'

// "https://disease.sh/v3/covid-19/countries" 
// https://disease.sh/v3/covid-19/all
//  "https://disease.sh/v3/covid-19/countries[COUNTRY_CODE]" 




function App() {
const [countries,setCountries]=useState([]);
const [country,setCountry]=useState('Worldwide')
const [countryInfo,setCountryInfo]=useState({})
const [tableData,setTableData]=useState([])
const [mapCenter,setMapCenter] =useState({lat:34.80746,lng:-40.4796})
const [mapZoom,setMapZoom]=useState(3)
const [mapCountries,setMapCountries] =useState([])
const [casesType,setCasesType]=useState("cases")




useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all")
  .then(response =>response.json())
  .then(data =>{
    setCountryInfo(data)
  })
}, [])



useEffect(() => {

 const getCountriesData = async() =>{
await fetch("https://disease.sh/v3/covid-19/countries")
.then((response)=>response.json())
.then((data)=>{
const countries=data.map((country)=>(
{
name:country.country,
value:country.countryInfo.iso2
}))
const sortedData=sortData(data)
setMapCountries(data)
setTableData(sortedData)
setCountries(countries)
}
)}
getCountriesData()

}, [])





const onCountryChange = async(event) =>{

const countryCode=event.target.value;

setCountry(countryCode)

const url=countryCode ==='Worldwide' ? 'https://disease.sh/v3/covid-19/all'
:`https://disease.sh/v3/covid-19/countries/${countryCode}`

await fetch(url)
.then((response)=>response.json())
.then(data =>{
setCountry(countryCode)
setCountryInfo(data)

setMapCenter([data.countryInfo.lat,data.countryInfo.long])
setMapZoom(4)

})}


return (
    <div className="app">
      <div className="app_left">
      <div className="app_header">
     <h1>Covid-19 Tracker</h1>    
     <FormControl className="app_dropdown">
<Select
varient="outlined"
value={country}
onChange={onCountryChange}
> 
<MenuItem value="Worldwide">Worldwide</MenuItem>
{countries.map((country) =>(
<MenuItem value={country.value}>{country.name}</MenuItem>
))}
</Select>   
     </FormControl>
     </div>




<div className="app_stats">




<InfoBox  
isRed
active={casesType==="cases"}
 onClick={e =>setCasesType('cases')}
title="Coronavirus Cases" 
cases ={prettyPrintStat(countryInfo.todayCases)} 
total={prettyPrintStat(countryInfo.cases)}/>

<InfoBox  
active={casesType==="recovered"}
onClick={e =>setCasesType('recovered')}
title="Recoverd" 
cases={prettyPrintStat(countryInfo.todayRecovered)}
 total={prettyPrintStat(countryInfo.recovered)}/>

<InfoBox 
isRed
active={casesType==="deaths"}
 onClick={e =>setCasesType('deaths')}
title="Deaths" 
cases={prettyPrintStat(countryInfo.todayDeaths)} 
total={prettyPrintStat(countryInfo.deaths)}/>

</div>



<Map  
casesType={casesType}
center={mapCenter} 
zoom={mapZoom} 
countries={mapCountries}
/>
</div>

<Card className="app_right">
<CardContent>

<h3>Worldwide new {casesType}</h3>
<LineGraph casesType={casesType} />



</CardContent>
</Card>

<Card className="app_right">
<CardContent>
<Table countries={tableData}/>
</CardContent>
</Card>

    </div>
  );
}

export default App;

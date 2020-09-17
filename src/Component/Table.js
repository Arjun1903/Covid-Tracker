import React from 'react'
import '../Css/table.css'
import numeral from 'numeral'

function Table({ countries }) {

    
    return (
        <div className="table_name">
 <table border="0" cellpadding="0" cellspacing="0" class="scroll">
 <thead>
    <tr >
    
    <th>Country</th>
   
    <th >Total Cases</th>
    <th >Recovered</th>
    <th>Deaths</th>
    <th >Active  Cases</th>
    <th>Criticals</th>
    <th>today Cases</th>
    <th>today Deaths</th>
    <th>today Recovered</th>
    <th>Total Population</th>
       
    </tr>
    </thead>
  <tbody>
{
countries.map((props) => (

          
           <tr>
           <td className="table_country">{props.country}</td>
          
           <td><strong>{numeral(props.cases).format("0,0")}</strong></td>
           <td><strong>{props.recovered==0?'N/A' :numeral(props.recovered).format("0,0")}</strong></td>
           <td><strong>{props.deaths==0?'N/A':numeral(props.deaths).format("0,0")}</strong></td>
           <td><strong>{props.active==0?'N/A':numeral(props.active).format("0,0")}</strong></td>
           <td><strong>{props.critical==0?'N/A':numeral(props.critical).format("0,0")}</strong></td>
           <td><strong>{props.todayCases==0?'N/A':numeral(props.todayCases).format("0,0")}</strong></td>
           <td><strong>{props.todayDeaths==0?'N/A':numeral(props.todayCases).format("0,0")}</strong></td>
           <td><strong>{props.todayRecovered==0?'N/A':numeral(props.todayCases).format("0,0")}</strong></td>
           <td><strong>{numeral(props.population).format("0,0")}</strong></td>

      </tr>
       
))}

</tbody>
</table>       
        </div>

)
}

export default Table

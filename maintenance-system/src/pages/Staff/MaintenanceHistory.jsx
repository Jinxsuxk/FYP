import {useEffect,useState} from "react";

import {
getHistory
}
from "../../services/historyService";


function MaintenanceHistory(){


const [history,setHistory]=useState([]);


useEffect(()=>{

loadHistory();

},[]);



async function loadHistory(){

const data=await getHistory();

setHistory(data);

}



return(

<div>

<h1>
Maintenance History
</h1>


<table border="1">

<thead>

<tr>
<th>
Equipment
</th>

<th>
Issue
</th>

<th>
Notes
</th>

</tr>

</thead>


<tbody>

{
history.map(item=>(

<tr key={item.id}>


<td>
{
item.maintenance_request
?.equipment
?.equipment_name
}
</td>


<td>
{
item.maintenance_request
?.issue_description
}
</td>


<td>
{
item.repair_notes
}
</td>


</tr>

))

}

</tbody>

</table>


</div>

)

}


export default MaintenanceHistory;
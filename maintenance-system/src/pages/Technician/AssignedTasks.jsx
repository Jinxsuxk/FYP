import { useEffect, useState } from "react";

import { supabase } from "../../supabase/client";

import {
    getAssignedTasks,
    updateRequestStatus
}
from "../../services/technicianService";


function AssignedTasks(){


const [tasks,setTasks]=useState([]);

const [technicianId,setTechnicianId]=useState("");



useEffect(()=>{

    loadTasks();

},[]);



async function loadTasks(){

    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();


    setTechnicianId(user.id);


    const data =
        await getAssignedTasks(user.id);


    setTasks(data);

}



async function handleUpdate(
    requestId,
    status
){


    let notes = "";


    if(status==="Completed"){

        notes = prompt(
            "Enter repair notes:"
        );

    }


    await updateRequestStatus(
        requestId,
        status,
        notes,
        technicianId
    );


    alert(
        "Status updated"
    );


    loadTasks();

}



return (

<div>

<h1>
Assigned Maintenance Tasks
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
Status
</th>

<th>
Action
</th>

</tr>

</thead>



<tbody>


{
tasks.map((task)=>(

<tr key={task.id}>


<td>

{
task.maintenance_request
?.equipment
?.equipment_name
}

</td>


<td>

{
task.maintenance_request
?.issue_description
}

</td>


<td>

{
task.maintenance_request
?.status
}

</td>


<td>


{
task.maintenance_request?.status
==="Assigned"
&&

<button
onClick={()=>
handleUpdate(
task.request_id,
"In Progress"
)
}
>
Start Work
</button>

}



{
task.maintenance_request?.status
==="In Progress"
&&

<button
onClick={()=>
handleUpdate(
task.request_id,
"Completed"
)
}
>
Complete
</button>

}



</td>


</tr>


))

}


</tbody>


</table>


</div>

);


}


export default AssignedTasks;
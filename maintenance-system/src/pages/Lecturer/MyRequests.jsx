import {
useEffect,
useState
}
from "react";

import Layout
from "../../components/Layout";

import {
supabase
}
from "../../supabase/client";

import {
getMyRequests
}
from "../../services/maintenanceService";

import StatusBadge from "../../components/StatusBadge"

function MyRequests() {
    const [requests,setRequests]
=
useState([]);

useEffect(()=>{

loadRequests();

},[]);



async function loadRequests(){

const {
data:{
user
}
}
=
await supabase.auth.getUser();



const data =
await getMyRequests(
user.id
);

setRequests(data);

}

return (
    <Layout>

<div
className="
max-w-7xl
mx-auto
"
>

<h1
className="
text-3xl
font-bold
mb-6
"
>
My Requests
</h1>

<div
className="
bg-white
rounded-xl
shadow-sm
border
overflow-hidden
"
>

<table
className="
w-full
"
>

<thead
className="
bg-slate-100
"
>

<tr>

<th
className="
text-left
p-4
"
>
Equipment
</th>

<th
className="
text-left
p-4
"
>
Issue
</th>

<th
className="
text-left
p-4
"
>
Priority
</th>

<th
className="
text-left
p-4
"
>
Status
</th>

</tr>

</thead>

<tbody>

{
requests.map(
(request)=>(

<tr
key={request.id}
className="
border-t
"
>

<td
className="
p-4
"
>
{
request.equipment
?.equipment_name
}
</td>

<td
className="
p-4
"
>
{
request.issue_description
}
</td>

<td
className="
p-4
"
>
{
request.priority
}
</td>

<td
className="
p-4
"
>
<StatusBadge
status={request.status}
/>
</td>

</tr>

))
}

</tbody>

</table>

</div>

</div>

</Layout>
)
}

export default MyRequests;
import {useEffect,useState} from "react";
import {
    getEquipment,
    addEquipment,
    deleteEquipment
}
from "../../services/equipmentService";


function Equipment(){


const [equipment,setEquipment]=useState([]);


const [form,setForm]=useState({

equipment_name:"",
equipment_type:"",
serial_number:"",
location:"",
status:"Working"

});



async function loadEquipment(){

const data=await getEquipment();

setEquipment(data);

}



useEffect(()=>{

loadEquipment();

},[]);



async function handleSubmit(e){

e.preventDefault();


await addEquipment(form);


loadEquipment();


}



return(

<div>

<h1>Equipment Management</h1>


<form onSubmit={handleSubmit}>


<input
placeholder="Equipment Name"
onChange={(e)=>
setForm({
...form,
equipment_name:e.target.value
})
}
/>


<input
placeholder="Type"
onChange={(e)=>
setForm({
...form,
equipment_type:e.target.value
})
}
/>


<input
placeholder="Serial Number"
onChange={(e)=>
setForm({
...form,
serial_number:e.target.value
})
}
/>


<input
placeholder="Location"
onChange={(e)=>
setForm({
...form,
location:e.target.value
})
}
/>


<button>
Add Equipment
</button>


</form>



<h2>Equipment List</h2>


{
equipment.map(item=>(

<div key={item.id}>

<p>
{item.equipment_name}
-
{item.location}
-
{item.status}
</p>


<button
onClick={()=>deleteEquipment(item.id)}
>
Delete
</button>


</div>


))
}



</div>

)

}


export default Equipment;
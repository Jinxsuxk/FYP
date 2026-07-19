import {
    useEffect,
    useState
}
from "react";


import Layout from "../components/Layout";


import {
    getNotifications,
    markAsRead
}
from "../services/notificationService";


import {
    supabase
}
from "../supabase/client";



function Notifications(){


const [notifications,setNotifications]
=
useState([]);



useEffect(()=>{

    loadNotifications();

},[]);



async function loadNotifications(){


    const {
        data:{
            user
        }
    }
    =
    await supabase.auth.getUser();



    const data =
    await getNotifications(
        user.id
    );


    setNotifications(data);


}



async function handleRead(id){


    await markAsRead(id);


    loadNotifications();


}



return (

<Layout>


<h1>
Notifications
</h1>



<table border="1">


<thead>

<tr>

<th>
Message
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
notifications.map(
(notification)=>(


<tr
key={notification.id}
>


<td>

{notification.message}

</td>


<td>

{
notification.is_read
?
"Read"
:
"Unread"
}

</td>


<td>


{
!notification.is_read
&&

<button
onClick={()=>
handleRead(
notification.id
)
}
>

Mark Read

</button>

}


</td>


</tr>


)

)

}


</tbody>


</table>


</Layout>

);


}


export default Notifications;
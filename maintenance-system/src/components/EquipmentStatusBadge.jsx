function EquipmentStatusBadge({
    status
}) {

    const colors = {

        Working:
        "bg-green-100 text-green-800",

        "Under Repair":
        "bg-yellow-100 text-yellow-800",

        Damaged:
        "bg-red-100 text-red-800"

    };



    return (

        <span
            className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
            ${colors[status]}
            `}
        >

            {status}

        </span>

    );

}

export default EquipmentStatusBadge;
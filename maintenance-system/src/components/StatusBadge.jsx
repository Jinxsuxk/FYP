function StatusBadge({ status }) {

    const colors = {

        Pending:
            "bg-yellow-100 text-yellow-800",

        Assigned:
            "bg-blue-100 text-blue-800",

        "In Progress":
            "bg-purple-100 text-purple-800",

        Completed:
            "bg-green-100 text-green-800"

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

export default StatusBadge;
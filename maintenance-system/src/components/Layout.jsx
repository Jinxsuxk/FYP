import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


function Layout({children}){


    return (

        <div
            className="
            flex
            min-h-screen
            bg-slate-100
            "
        >

            <Sidebar />


            <div
                className="
                flex-1
                "
            >

                <Topbar />


                <main
                    className="
                    p-6
                    "
                >

                    {children}

                </main>


            </div>


        </div>

    );

}


export default Layout;
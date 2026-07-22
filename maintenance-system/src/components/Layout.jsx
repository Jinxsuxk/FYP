import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F4F5FB]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
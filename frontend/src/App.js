import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./modules/Admin/AdminDashboard";
import Home from "./common/Home/Home";
import AdminLogin from "./modules/Admin/AdminLogin";

import Users from "./modules/OrderInventory/users";
import Order from "./modules/OrderInventory/Order";
import Submit from "./modules/OrderInventory/Submit";
import SubInventory from "./modules/Inventory/SubInventory";

import Services from "./modules/RepairAdmin/Services";
import Breakdown from "./modules/RepairAdmin/Breakdowns";
import RepairVeh from "./modules/RepairAdmin/RepairVeh";
import AddServices from "./modules/RepairAdmin/AddServices";
import UpdateServices from "./modules/RepairAdmin/UpdateServices";
import AddRepairs from "./modules/RepairAdmin/AddRepairs";
import UpdateRepairs from "./modules/RepairAdmin/UpdateRepairs";
import BreakdownNotification from "./modules/RepairAdmin/BreakdownNotification";

import DriverHome from "./modules/Driver/MaintenanceHome";
import DriverBreakdowns from "./modules/Driver/DriverBreakdowns";
import DriverRepairs from "./modules/Driver/DriverRepairs";
import DriverServices from "./modules/Driver/DriverServices";
import AddBreakdown from "./modules/Driver/AddBreakdowns";
import UpdateBreakdown from "./modules/Driver/UpdateBreakdowns";
import UpdateDriverServices from './modules/Driver/UpdateDriverServices';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminDashboard />} />{" "}
        <Route path="/*" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/Users" element={<Users />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/Submit" element={<Submit />} />
        <Route path="/SubInventory" element={<SubInventory />} />

        <Route path="/test" element={<DriverHome />} />
        <Route path="/BreakdownDr" element={<DriverBreakdowns />} />
        <Route path="/RepairDr" element={<DriverRepairs />} />
        <Route path="/ServiceDr" element={<DriverServices />} />
        <Route path="/ServiceDr/:id" element={<UpdateDriverServices />} />
        <Route path="/addBreakdown" element={<AddBreakdown />} />
        <Route path="/Breakdown/:id" element={<UpdateBreakdown />} />

        <Route path="/Service" element={<Services />} />
        <Route path="/Repair" element={<RepairVeh />} />
        <Route path="/Breakdown" element={<Breakdown />} />
        <Route path="/addServices" element={<AddServices />} />
        <Route path="/Service/:id" element={<UpdateServices />} />
        <Route path="/addRepairs" element={<AddRepairs />} />
        <Route path="/Repair/:id" element={<UpdateRepairs />} />
        <Route path="/BreakdownNotification" element={<BreakdownNotification />}
        
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

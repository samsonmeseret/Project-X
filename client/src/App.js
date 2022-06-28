import React,{useContext} from "react";
import MaterialTable from "material-table";
import tableIcons from "./Icons";
import UserTable from "./components/UsersTable";
import Login from "./pages/Login";
import AuthContext from "./context/AuthProvider";
const App = ()=>{
  const {auth} = useContext(AuthContext)
    return (
      <>{auth.token? <UserTable/>: <Login/>}
      {/* <UserTable/> */}
      {/* <Login/> */}
      </>
    );
  }


export default App;

import { Route, Switch } from "wouter";
import Landing from "../pages/Landing/Landing.page";
import Login from "../pages/Login/Login.page";
import Register from "../pages/Register/Register";
import HomePage from "../pages/Home/Home";
import Weather from "../pages/Meteorologia/Meterologia.page";
import Inventario from "../pages/Gestion/Gestion.page";
import Profile from "../pages/Profile/Profile.page";

export const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <Route path={"/inventario"} component={Inventario} />
      <Route path="/home" component={HomePage} />
      <Route path="/Meteorologia" component={Weather} />
      <Route path="/Perfil" component={Profile}/>
    </Switch>
  );
};

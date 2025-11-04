import { Route, Switch } from 'wouter';
import Landing from '../pages/Landing/Landing.page';
import Login from "../pages/Login/Login.page";
import Register from "../pages/Register/Register";


export const AppRouter = () =>{
    return(
        <Switch>
            <Route path="/" component={Landing}/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Switch>
    )
}
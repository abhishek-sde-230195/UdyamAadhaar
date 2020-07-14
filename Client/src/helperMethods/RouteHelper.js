import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Login from '../components/auth/login';
import SignUp from '../components/auth/signup';
import VerifyAccount from '../components/auth/VerifyAccount';
import NotFound from '../components/layout/NotFound';
import SpreadSheetComponent from '../components/grid/SpreadSheetComponent';
import MsmeRegistrationComponent from '../components/msmeRegistration/MsmeRegistrationComponent';

const RouteHelper = () => {
    return ( 
        <Switch>
            <Route exact path='/' component={MsmeRegistrationComponent}  />
            <Route exact path='/signin' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/verifyaccount' component={VerifyAccount}  />
            <Route exact path='/data/sheet' component={SpreadSheetComponent} />
            <Route component={NotFound} />
        </Switch>
     );
}
 
export default RouteHelper;
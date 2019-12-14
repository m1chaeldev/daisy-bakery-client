import React, { PureComponent } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history'

// import AuthorizedRoute from '../components/Authorized'
import Home from "../views/pages/Home";
import NotFound from "../views/pages/NotFound";

class RouterConfig extends PureComponent {
  render() {
    return (
      <BrowserRouter history={createBrowserHistory}>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/index" component={Home} />
            <Route path="*" component={NotFound} />

            {/* <Route path="/blocks" component={ExploreBlocks} />
            <Route path="/rich-list" component={ExploreRichList} />
            <Route path="/address-detail" component={AddressDetail} />
            <Route path="/address/:address" component={ExploreAddress} />
            <Route path="/block/:hash" component={BlockDetail} />
            <Route path="/transaction/:txId" component={TransactionDetail} /> */}

          {/* <AuthorizedRoute 
              path='/app'
              component={}
              authority
            /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouterConfig;

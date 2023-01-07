import "./App.css";
import LoginPage from "./pages/login/login";
import { Switch, Route, Redirect } from 'react-router-dom'

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Categories from "./pages/categories/categories";

const App = ()=>{
  return (<>
      <div className="container">
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/categories" component={Categories} />
            <Redirect to={"/login"} />
            
        </Switch>
        <ToastContainer
          position="bottom-left"
          autoClose={7000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  )
}

export default App;

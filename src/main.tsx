import * as React from "react"
import { createRoot } from "react-dom/client"
import {
  createBrowserRouter, createRoutesFromElements, RouterProvider, Route
} from "react-router-dom";

import App from "./components/App"
import LoginForm from "./components/LoginForm/LoginForm"
import SignUp from "./components/SignUp"
import Success from "./components/Success";
import NotFound from "./components/404"
import Start from "./components/Start";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={ <App/> } errorElement={ <NotFound/> } >
      <Route path="/" element={ <Start/> } />
      <Route path="/login" element={ <LoginForm/> }/>
      <Route path="/signup" element={ <SignUp/> }/>
      <Route path="/restore_password" element={ <SignUp/> }/>
      <Route path="/success" element={ <Success/> }/>
    </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={ router }/>
  </React.StrictMode>
)

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ComHeader from "./Page/Components/ComHeader/ComHeader";
import Search from "./Page/Authenticator/Search";
import FormStart from "./Page/Authenticator/Form";



export const routers = createBrowserRouter([ 
  { 
    path: "*", 
    element: <p>123</p>, 
  }, 
  { 
    path: "/", 
    element: <ComHeader/>, 
  }, 
  { 
    path: "/Search", 
    element: <Search/>, 
  }, 
  { 
    path: "/form", 
    element: <FormStart/>, 
  }, 
]); 

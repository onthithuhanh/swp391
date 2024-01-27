import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ComHeader from "./Page/Components/ComHeader/ComHeader";


export const routers = createBrowserRouter([ 
  { 
    path: "*", 
    element: <p>123</p>, 
  }, 
  { 
    path: "/", 
    element: <ComHeader/>, 
  }, 
]); 

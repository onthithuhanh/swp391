import React from "react";
import { createBrowserRouter } from "react-router-dom";


export const routers = createBrowserRouter([ 
  { 
    path: "*", 
    element: <p>123</p>, 
  }, 
  { 
    path: "/home", 
    element: <p>home</p>, 
  }, 
]); 

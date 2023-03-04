import React from "react";
import Side from "../Side/Side";
import TotalContacts from "../TotalContacts/TotalContacts";
import "./Main.css"
import { useState } from "react";


const Main = ()=>{

    const [update,setUpdate]=useState(0)
    
    return <>
    <div className="main">
        <div className="sidebar">
            <Side />
        </div>
        <div className="mainbar">
            <TotalContacts update={update}/>
        </div>
    </div>
    
    </>
}

export default Main
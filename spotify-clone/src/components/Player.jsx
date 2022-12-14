import React from "react";
import Body from "./Body";
import Footer from "./Footer";
import "./player.css";
import Sidebar from "./Sidebar";

function Player({spotify}) {
    return (
        <div className="player">
            <div className="player__body">
            <Sidebar />
            <Body spotify={spotify}/>
            <Footer />
            </div>
        </div>
    )
}

export default Player;
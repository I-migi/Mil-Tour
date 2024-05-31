import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const {kakao} = window;

function Home() {


    useEffect(() => {
        //현재위치로 뜨게 함
        const container = document.getElementById('map');
        navigator.geolocation.getCurrentPosition(
            (position) => {

                const {latitude, longitude} = position.coords;
                const options = {
                    center: new kakao.maps.LatLng(latitude, longitude),
                    level: 3
                };
                const map = new kakao.maps.Map(container, options);
            }
        )
    });
    // useEffect(() => {
    //
    //     const container = document.getElementById('map');
    //
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             const {latitude, longitude} = position.coords;
    //             const options = {
    //                 center: new kakao.maps.LatLng(latitude, longitude),
    //                 level: 3,
    //             };
    //
    //             const map = new kakao.maps.Map(container, options);
    //         }
    //
    //     )
    // }

    return (
         <div className="container mt-5">
            <div id = "map" style={{
                width: '500px',
                height : '500px'
            }}></div>

         </div>
    );
}

export default Home;
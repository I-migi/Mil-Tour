import React, {useEffect} from "react";
import { Link } from "react-router-dom";


const {kakao} = window;

function Home() {


    useEffect(() => {

        const container = document.getElementById('map');
        const options = {
            center : new kakao.maps.LatLng(33.450701, 126.570667),
            level : 3
        };
        const map = new kakao.maps.Map(container,options)

    }, [])



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
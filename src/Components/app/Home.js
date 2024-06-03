import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { TweenMax } from "../../../node_modules/gsap/dist/gsap";
import XMLParser from 'react-xml-parser';
import "../../css/mapcontainer.css";
const {kakao} = window;

// { isPlay }
const Home = ( ) => {

    let [array, setArray] = useState([]);
    const [data, setData] = useState(null)

    const playRef = useRef();

    const callApi = async () => {
        axios
            .get("http://localhost:5000/api")
            .then(res => {console.log(res.data.elements[0].elements)


                setArray(res.data)
                setData(res)
                // return array.map((res) => <div key = {res.elements}>{res.rel_instltnnm}</div>);

            });
    };

    useEffect(() =>{
        callApi();
    }, []);

    useEffect(() => {
        const pullUpPageContent = playRef.current;
        // if (isPlay) {
            TweenMax.to(pullUpPageContent, {
                y: "-100%",
                delay: 1.8,
            });
        // }
    }, );
    // [isPlay]




    const [keyword, setKeyword] = useState('');
    const [places, setPlaces] = useState([]);
    const [pagination, setPagination] = useState(null);
    const mapContainer = useRef(null);
    const markers = useRef([]);
    const mapRef = useRef(null);

    const ps = new kakao.maps.services.Places();
    const infowindow = new kakao.maps.InfoWindow({zIndex: 1});

    const searchPlaces = () => {
        if(!keyword.trim()) {
            alert('키워드를 입력해주세요');
            return;
        }
        ps.keywordSearch(keyword, placesSearchCB);
    }

    const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
            displayPlaces(data);
            setPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
        }
    }


    const displayPlaces = (placesData) => {
        removeMarker();
        const newMarkers = placesData.map((place, index) => {
            const placePosition = new kakao.maps.LatLng(place.y, place.x);
            const marker = addMarker(placePosition, index);
            kakao.maps.event.addListener(marker, 'mouseover', () => {
                displayInfowindow(marker, place.place_name);
            });
            kakao.maps.event.addListener(marker, 'mouseout', () => {
                infowindow.close();
            });
            return marker;
        });
        markers.current = newMarkers;
        setPlaces(placesData);
    }

    const addMarker = (position, idx) => {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
        const imageSize = new kakao.maps.Size(36, 37);
        const imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691),
            spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10),
            offset: new kakao.maps.Point(13, 37)
        };
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
        const marker = new kakao.maps.Marker({
            position: position,
            image: markerImage
        });
        marker.setMap(mapRef.current);
        return marker;
    }

    const removeMarker = () => {
        markers.current.forEach(marker => marker.setMap(null));
        markers.current = [];
    }

    const displayInfowindow = (marker, title) => {
        const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
        infowindow.setContent(content);
        infowindow.open(mapRef.current, marker);
    };




    // useEffect(() => {
    //     //현재위치로 뜨게 함
    //     const container = document.getElementById('map');
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //
    //             const {latitude, longitude} = position.coords;
    //             const options = {
    //                 center: new kakao.maps.LatLng(latitude, longitude),
    //                 level: 3
    //             };
    //             const map = new kakao.maps.Map(container, options);
    //         }
    //     )
    // });

    // useEffect(() => {
    //     const mapOptions = {
    //         center: new kakao.maps.LatLng(37.561233, 126.974494),
    //         level: 3
    //     };
    //     mapRef.current = new kakao.maps.Map(mapContainer.current, mapOptions);
    //
    // }, [keyword]);
    //



    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                const mapOptions = {
                    center: new kakao.maps.LatLng(latitude, longitude),
                    level: 3
                };
                mapRef.current = new kakao.maps.Map(mapContainer.current, mapOptions);
                // mapRef.current = new kakao.maps.Map(mapContainer.current, mapOptions);

            }

    )

    }, [keyword]);





    return (


        <div className="container mt-5">

            <div ref={playRef}>

                <div>

                {data && <textarea value={JSON.stringify(data)} readOnly={true}/>}
                </div>


            </div>



            <h2>검색</h2>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="키워드를 입력하세요"
            />
            <button onClick={searchPlaces}>검색</button>

            <div ref={mapContainer} style={{width: '600px', height: '400px'}}></div>
            <ul>
                {places.map((place, index) => (
                    <li key={index} className="item">
                        <span className={`markerbg marker_${index + 1}`}></span>
                        <div className="info">
                            <h5>{place.place_name}</h5>
                            {place.road_address_name ?
                                <>
                                    <span>{place.road_address_name}</span>
                                    <span className="jibun gray">{place.address_name}</span>
                                </> :
                                <span>{place.address_name}</span>
                            }
                            {place.phone && <span className="tel">{place.phone}</span>}
                        </div>
                    </li>
                ))}
            </ul>
            {pagination && [...Array(pagination.last)].map((_, i) => (
                <button key={i} onClick={() => pagination.gotoPage(i + 1)}>
                    {i + 1}
                </button>
            ))}
        </div>


    );
}

export default Home;
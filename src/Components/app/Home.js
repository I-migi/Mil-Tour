import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { TweenMax } from "../../../node_modules/gsap/dist/gsap";
import XMLParser from 'react-xml-parser';
import "../../css/mapcontainer.css";
const {kakao} = window;

// { isPlay }
const Home = ({ } ) => {

    const [elements, setElements] = useState([]);
    const [data, setData] = useState(null)

    let [listmap, setListmap] = useState([]);
    const playRef = useRef();



  //  const listmap = [];
    const callApi = async () => {
        axios
            .get("http://localhost:5000/api")
            .then(res => {console.log(res.data.elements[0].elements)
                                      //   .elements[1].elements[4].elements[0].text


                setElements(res.data.elements[0].elements);
                setData(res)
                // return array.map((res) => <div key = {res.elements}>{res.rel_instltnnm}</div>); 33.273145!4d126.3947426
                setListmap([{id : "1", text:res.data.elements[0].elements[1].elements[4].elements[0].text, lat:38.240902, lng:128.574014}
                    ,  {id : "2", text:res.data.elements[0].elements[4].elements[4].elements[0].text, lat:38.475512, lng:128.439788}
                    ,  {id : "3", text:res.data.elements[0].elements[10].elements[4].elements[0].text, lat:36.301366, lng:126.522550}
                        , {id : "4", text:res.data.elements[0].elements[11].elements[4].elements[0].text,lat:36.301366, lng:126.522550}
                        , {id : "5", text:res.data.elements[0].elements[13].elements[4].elements[0].text,lat:37.781305, lng:128.934902}
                        ,{id : "6", text:res.data.elements[0].elements[15].elements[4].elements[0].text,lat:33.273145, lng:126.3947426}]
                    );
                //     {id : "1", text:res.data.elements[0].elements[1].elements[4].elements[0].text},
                // ,  {id : "2", text:res.data.elements[0].elements[4].elements[4].elements[0].text}
                // ,  {id : "3", text:res.data.elements[0].elements[6].elements[4].elements[0].text}
                //     , {id : "4", text:res.data.elements[0].elements[8].elements[4].elements[0].text}
                //     , {id : "5", text:res.data.elements[0].elements[10].elements[4].elements[0].text}
                //     ,{id : "6", text:res.data.elements[0].elements[12].elements[4].elements[0].text}
                // ,{id : "7", text:res.data.elements[0].elements[13].elements[4].elements[0].text}
                // ,{id : "8", text:res.data.elements[0].elements[15].elements[4].elements[0].text}];

                console.log(res.data.elements[0].elements);

            });
    };

    useEffect(() =>{
        callApi();
    }, []);






    // useEffect(() => {
    //     const pullUpPageContent = playRef.current;
    //     // if (isPlay) {
    //         TweenMax.to(pullUpPageContent, {
    //             y: "-100%",
    //             delay: 1.8,
    //         });
    //     // }
    // }, );
    // // [isPlay]




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
    //
    //     let container = document.getElementById("map")
    //
    //     let mapOptions = {
    //         center: new kakao.maps.LatLng(37.561233, 126.974494),
    //         level: 3
    //     };
    //     mapRef.current = new kakao.maps.Map(mapContainer.current, mapOptions);
    //
    // }, [keyword]);

    //
    // let latitude = 0;
    // let longitude = 0;



    useEffect(() => {
        // const container = document.getElementById("map")
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let {latitude, longitude} = position.coords;
               let mapOptions = {
                    center: new kakao.maps.LatLng(latitude, longitude),
                    level: 3
                };
                mapRef.current = new kakao.maps.Map(mapContainer.current, mapOptions);
                // mapRef.current = new kakao.maps.Map(mapContainer.current, mapOptions);

            }

    )

        // navigator.geolocation.watchPosition((pos) => {
        //     setPosition({lat : pos.coords.latitude, lng : pos.coords.longitude});
        // })

        // var lating = map.getCenter();
    }, [keyword]);


    // const [pos, setPosition] = useState({
    //     lat : 38.240902,
    //     lng : 128.574014,
    // });
    // let lat = 38.240902;
    // let lng = 128.574014;


    // setPosition(lat, lng);
    function panTo(e,s)  {


        let moveLatLon = new kakao.maps.LatLng(e, s);

        mapRef.current.panTo(moveLatLon);

    }


    // if(!elements) {
    //     return null;
    // }



    return (


        <div className="container">

            <div ref={playRef} id ="div_list">

                <ul>

                    {listmap.map((list) => {
                            return (
                                <li key={list.id}>
                                    <button onClick={() => panTo(list.lat, list.lng)} >
                                        {list.text}
                                    </button>

                                </li>);
                        }
                    )
                    }

                </ul>

            </div>

            {/*<li key={list.id}>*/}
            {/*    <Link to={list.text}>*/}
            {/*        {list.text}*/}
            {/*    </Link>*/}

            {/*</li>*/}

            <div id="div_map">

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
        </div>


    );

}

export default Home;
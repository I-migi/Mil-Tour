import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {Map, MapMarker } from 'react-kakao-maps-sdk'
import { TweenMax } from "../../../node_modules/gsap/dist/gsap";
import XMLParser from 'react-xml-parser';
import "../../css/mapcontainer.css";

const {kakao} = window;



// { isPlay }
const Home = ({ } ) => {

    const [elements, setElements] = useState([]);
    // const [data, setData] = useState(null)

    let [listmap, setListmap] = useState([]);
    const playRef = useRef();


    const [keyword, setKeyword] = useState('');
    const [places, setPlaces] = useState([]);
    const [pagination, setPagination] = useState(null);
    const markers = useRef([]);
    const mapRef = useRef(null);
    const mapContainer = useRef(null);
    let ps = new kakao.maps.services.Places();
    const infowindow = new kakao.maps.InfoWindow({zIndex: 1})



    useEffect(() => {
        //현재위치로 뜨게 함
        const container = document.getElementById("map");
        navigator.geolocation.getCurrentPosition(
            (position) => {

                const {latitude, longitude} = position.coords;
                const options = {
                    center: new kakao.maps.LatLng(latitude, longitude),
                    level: 5,
                };
                mapRef.current = new kakao.maps.Map(mapContainer.current, options);
                ps = new kakao.maps.services.Places(mapRef.current);



            }

        )

    },[keyword]);


    listmap.forEach((list) => {
        new kakao.maps.Marker( {
            map: mapRef.current,
            position: new kakao.maps.LatLng(list.lat, list.lng),
            title: list.text,
        });
    });

    const tour_places = [
        {id: "1", text: "중문관광단지", lat: 33.253344, lng: 126.433671},
        {id: "2", text: "천제연폭포", lat: 33.2526950, lng: 126.4183617},
        {id: "3", text: "카멜리아힐", lat: 33.2901402, lng: 126.3683652},
        {id: "4", text: "청간정콘도", lat: 38.260828, lng: 128.556878},
        {id: "5", text: "범바위", lat: 38.2133875, lng: 128.5757456},
        {id: "6", text: "영금정", lat: 38.2118394, lng: 128.6015298},
        {id: "7", text: "김일성별장", lat: 38.4735546, lng: 128.4416089},
        {id: "8", text: "이승만대통령 기념관", lat: 38.4709743, lng: 128.4367671},
        {id: "9", text: "화진포해수욕장", lat: 38.4822043, lng: 128.4361714},
        {id: "10", text: "송정해변", lat: 37.7768141, lng: 128.9380472},
        {id: "11", text: "강문해변", lat: 37.7939, lng: 128.9172},
        {id: "12", text: "경포천", lat: 37.7925466, lng: 128.9060585},
        {id: "13", text: "대천해수욕장", lat: 36.3135, lng: 126.5218},
        {id: "14", text: "머드광장", lat: 36.3150024, lng: 126.5103896},
        {id: "15", text: "노을광장", lat: 36.3054986, lng: 126.5163596}
    ]


    const imageSrc1 = '/img/tour_marker.png';
    const imageSize1 = new kakao.maps.Size(36, 37);
    const imgOptions1 = {
        // spriteSize: new kakao.maps.Size(36, 691),
        // spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10),
        offset: new kakao.maps.Point(13, 37)
    };
    const markerImage1 = new kakao.maps.MarkerImage(imageSrc1, imageSize1, imgOptions1);
    // const marker1 = new kakao.maps.Marker({
    //     position: position,
    //     image: markerImage1
    // });

    tour_places.forEach((list) => {
        new kakao.maps.Marker( {
            map: mapRef.current,
            position: new kakao.maps.LatLng(list.lat, list.lng),
            title: list.text,
            image: markerImage1,

        });
    });
    //  const listmap = [];
    const callApi = async () => {
        axios
            .get("http://localhost:5000/api")
            .then(res => {
                // console.log(res.data.elements[0].elements)
                                      //   .elements[1].elements[4].elements[0].text


                setElements(res.data.elements[0].elements);
                // setData(res)
                // return array.map((res) => <div key = {res.elements}>{res.rel_instltnnm}</div>); 33.273145!4d126.3947426
                setListmap([{id : "1", text:res.data.elements[0].elements[1].elements[4].elements[0].text, lat:38.240902, lng:128.574014}
                    ,  {id : "2", text:res.data.elements[0].elements[4].elements[4].elements[0].text, lat:38.475512, lng:128.439788}
                    ,  {id : "3", text:res.data.elements[0].elements[10].elements[4].elements[0].text, lat:36.301366, lng:126.522550}
                        , {id : "4", text:res.data.elements[0].elements[13].elements[4].elements[0].text,lat:37.781305, lng:128.934902}
                        ,{id : "5", text:res.data.elements[0].elements[15].elements[4].elements[0].text,lat:33.273145, lng:126.3947426}]
                    );
                // console.log(res.data.elements[0].elements);



            });
    };

    useEffect(() =>{
        callApi();
    }, []);
    //



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

    //
    const searchPlaces = () => {
        if(!keyword.trim()) {
            alert('키워드를 입력해주세요');
            return;
        }
        ps.keywordSearch(keyword, placesSearchCB, {useMapBounds : true});
        // ps.categorySearch("FD6", placesSearchCB, {useMapBounds : true});
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


    //
    const displayPlaces = (placesData) => {
        removeMarker();
        const newMarkers = placesData.map((place, index) => {
            const placePosition = new kakao.maps.LatLng(place.y, place.x);
            const marker = addMarker(placePosition, index);

            const bounds = new kakao.maps.LatLngBounds();

                bounds.extend(placePosition);

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

        // mapContainer.setBounds(bounds);
    }
    //
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
         // markers.push(marker);

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


    // const addCategoryClickEvent = () => {
    //     const category = document.getElementById('category'),
    //     children = category.children;
    //
    //     for (var i=0; i<children.length; i++) {
    //         children[i].onclick = onClickCategory;
    //     }
    // }

//     const onClickCategory = () => {
//         var id = this.id,
//             className = this.className;
//
//         placeOverlay.setMap(null);
//
//         if (className === 'on') {
//             currCategory = '';
//             changeCategoryClass();
//             removeMarker();
//         } else {
//             currCategory = id;
//             changeCategoryClass(this);
//             searchPlaces();
//         }
//     }
//
// // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
//     const changeCategoryClass = (el) => {
//         var category = document.getElementById('category'),
//             children = category.children,
//             i;
//
//         for ( i=0; i<children.length; i++ ) {
//             children[i].className = '';
//         }
//
//         if (el) {
//             el.className = 'on';
//         }
//     }







    function panTo(e,s)  {


        let moveLatLon = new kakao.maps.LatLng(e, s);

        mapRef.current.panTo(moveLatLon);

    }



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

    // const [state, setState] = useState({
    //     center: {
    //         lat: 38.240902,
    //         lng: 128.574014
    //     },
    //     // isPanto : false,
    // })

    // useEffect(() => {
    //     // const container = document.getElementById("map")
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //
    //             setState((prev) => ({
    //                 ...prev,
    //                 center: {
    //                     lat: position.coords.latitude,
    //                     lng : position.coords.longitude,
    //                 },
    //                 isPanto : true,
    //
    //             }));
    //            //  let {latitude, longitude} = position.coords;
    //            // let mapOptions = {
    //            //      center: new kakao.maps.LatLng(latitude, longitude),
    //            //      level: 3
    //            //  };
    //            //
    //            // setState = {latitude,longitude};
    //            //
    //             mapRef.current = new kakao.maps.Map(mapContainer.current);
    //             // mapRef.current = new kakao.maps.Map(mapContainer.current, mapOptions);
    //
    //         }
    //
    // )
    //
    //     // navigator.geolocation.watchPosition((pos) => {
    //     //     setPosition({lat : pos.coords.latitude, lng : pos.coords.longitude});
    //     // })
    //
    //     // var lating = map.getCenter();
    // });


    // const [pos, setPosition] = useState({
    //     lat : 38.240902,
    //     lng : 128.574014,
    // });



    let [search, setSearch] = useState([]);
    // setPosition(lat, lng);

    // const searchPlaces = (keyword) => {
    //     if(!state.center) return;
    //     const ps = new kakao.maps.services.Places();
    //
    //     let options = {
    //         location : new kakao.maps.LatLng(state.center.lat, state.center.lng),
    //         radius: 5000,
    //         sort: kakao.maps.services.SortBy.DISTANCE,
    //     };
    //
    //     ps.keywordSearch(
    //         keyword,
    //         (data, status, _pagination) => {
    //             if (status == kakao.maps.services.Status.OK) {
    //                 setSearch(data);
    //             }
    //         },
    //         options,
    //     );
    //
    // };

    // if(!elements) {
    //     return null;
    // }



    return (


        <div className="mapcontainer">


            <div ref={playRef} className="div_list">

                <ul>

                    {listmap.map((list) => {
                            return ( //panTo(list.lat, list.lng)
                                <li key={list.id} className="li_list">
                                    <button onClick={() => panTo(list.lat, list.lng)} className="listbutton">
                                        {list.text}
                                    </button>

                                </li>);
                        }
                    )
                    }

                </ul>

            </div>


            <div className= "search">
                <h2>검색</h2>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="키워드를 입력하세요"
                />
                <button onClick={searchPlaces}>검색</button>
            </div>

            <div ref={mapContainer} className={"map"} style={{width: '700px', height: '500px'}}></div>


            {/*<Map center={state.center} isPanto = {state.isPanto}*/}
            {/*     style={{width: '100%', height: 'calc(100vh - 109px)', marginTop: '48px'}} level={3}>*/}


            {/*{search.map((data) => (*/}
            {/*    <MapMarker*/}
            {/*        key = {data.id}*/}
            {/*        position = {{lat : data.y, lng : data.x}}*/}
            {/*        impage = {{*/}
            {/*            src: 'https://cdn-icons-png.flaticon.com/128/2098/2098567.png',*/}
            {/*            size: {*/}
            {/*                width: 35,*/}
            {/*                height: 35,*/}
            {/*            },*/}

            {/*        }}*/}
            {/*    />*/}
            {/*))}*/}
            {/*<button>*/}
            {/*    {KEYWORD_LIST.map((keywordObj) => (*/}
            {/*        <button key={keywordObj.id} type='button' onClick={() => searchPlaces(keywordObj.value)}>*/}
            {/*            {keywordObj.value + keywordObj.emoji}*/}
            {/*        </button>*/}
            {/*    ))}*/}
            {/*</button>*/}

            {/*</Map>*/}

            <div className="search_list">

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


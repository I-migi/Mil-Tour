import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

import "../../css/header.css"

function Header() {
    const { auth, setAuth } = useContext(AuthContext);

    return (
        // style ="background-color : #0FA958;"
        // navbar-light sticky-top
         <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <div
                        className="navbar-collapse collapse justify-content-between"
                        id="navbar-content"
                    >
                        <ul className="navbar-nav" id = "list">
                            {/* 메인 화면 */}
                            <li className="nav-item" id ="tour">
                                <Link className="nav-link" to="/">
                                    <i className="fas fa-home"></i> 홈
                                </Link>
                            </li>
                            {/*/!* 맛집 화면 *!/*/}
                            {/*<li className="nav-item" id ="food">*/}
                            {/*    <Link className="nav-link" to="/food" id ="food_text">*/}
                            {/*        <i className="fas fa-food"></i> 맛집*/}
                            {/*    </Link>*/}
                            {/*</li>*/}
                            {/*/!* 맛집 화면 *!/*/}
                            {/*<li className="nav-item" id ="zzim">*/}
                            {/*    <Link className="nav-link" to="/zzim" id ="zzim_text">*/}
                            {/*        <i className="fas fa-zzim"></i> 찜*/}
                            {/*    </Link>*/}
                            {/*</li>*/}


                        </ul>
                        <ul className="navbar-nav">
                            {auth ? (
                                <>
                                    {/* 회원 정보 */}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/checkpwd">
                                            {/*<i className="fas fa-sign-out-alt"></i> {auth} 님 반갑습니다 <i className="fab fa-ello"></i>{" "} &nbsp;{" "}*/}
                                        </Link>
                                        &nbsp;
                                    </li>

                                    {/* 로그아웃 */}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout">
                                            <i className="fas fa-sign-out-alt"></i> 로그아웃
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {/* 로그인 */}
                                    <li className="nav-item" id="login">
                                        <Link className="nav-link" to="/login" id="logintext">
                                            로그인
                                        </Link>
                                    </li>

                                    {/* 회원가입 */}
                                    <li className="nav-item" id = "signup">
                                        <Link className="nav-link" to="/join" id ="signuptext">
                                            회원가입
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
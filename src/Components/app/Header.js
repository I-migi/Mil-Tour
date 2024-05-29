import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Header() {
    const { auth, setAuth } = useContext(AuthContext);

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
                <div className="container">
                    <div
                        className="navbar-collapse collapse justify-content-between"
                        id="navbar-content"
                    >
                        <ul className="navbar-nav mr-auto">
                            {/* 메인 화면 */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    <i className="fas fa-home"></i> Home
                                </Link>
                            </li>
                            
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {auth ? (
                                <>
                                    {/* 회원 정보 */}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/checkpwd">
                                            <i className="fas fa-sign-out-alt"></i> {auth} 님 반갑습니다 <i className="fab fa-ello"></i>{" "} &nbsp;{" "}
                                        </Link>
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
                                    <div className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            로그인
                                        </Link>
                                    </div>

                                    {/* 회원가입 */}
                                    <div className="nav-item">
                                        <Link className="nav-link" to="/join">
                                            회원가입
                                        </Link>
                                    </div>
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
import { Routes, Route } from "react-router-dom";

import Home from "../app/Home"
import Join from "../member/Join"
import Login from "../member/Login"
import Logout from "../member/Logout"
import Update from "../member/MemberUpdate"
import MemberUpdate from "../member/MemberUpdate";
import CheckPwd from "../member/CheckPwd";
import Food from "../main/Food";
import Zzim from "../main/Zzim";

function Router() {

    return(

        <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/join" element={<Join />}></Route>
            <Route path="/checkpwd" element={<CheckPwd />}></Route>
            <Route path="/update" element={<MemberUpdate />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/food" element={<Food />}></Route>
            <Route path="/zzim" element={<Zzim />}></Route>

        </Routes>
    );
}
export default Router;
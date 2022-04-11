import React from "react";
import { AiOutlineMenu, AiOutlineRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import { RiEmotionNormalLine } from "react-icons/ri";
import { RiNewspaperLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";

const Container = styled.div`
display: flex;
flex-direction: column;
width: 20%;
.link {
    text-decoration: none;
    margin: 10px 0;
    display: flex;
    padding: 5px;
    align-items: center;
    transition: all 0.5s;
    span {
        margin-left: 10px;
    }
    &:hover {
        background-color: #00000023;
    }
}
.active {
    background-color: #009845;
    color: #ffffff;
    &:hover {
        background-color: #009845af;
    }
}

#side-header {
display: flex;
justify-content: space-between;
align-items: center;
}
`;

const Sidebar = ({
    expanded,
    onClickBurgerMenu,
}) => {

const location = useLocation();
console.log(location, expanded, 'check location');
    return (<Container>
        <div id="side-header">
            <h3>My mid app</h3>
            {expanded ? <AiOutlineMenu size={24} color={'pink'} onClick={e => onClickBurgerMenu(!expanded)} />:
            <AiOutlineRight size={24} color={'pink'} onClick={e => onClickBurgerMenu(!expanded)}/>}
        </div>
        <NavLink to="/home">
        <img src={`https://picsum.photos/${expanded ? '200': '50'}`} alt="whaterver" />
        </NavLink>
        <NavLink className="link" to="/home">
           <FaHome /> <span>Home</span>
        </NavLink>
        <NavLink className="link" to="/basic">
            <RiEmotionNormalLine /> <span>Basic</span>
        </NavLink>
        <NavLink className="link" to="/expenses">
            <RiNewspaperLine /><span>Expenses</span>
        </NavLink>
        <NavLink className="link" to="/billing">
            <RiBillFill /><span>Billing</span>
        </NavLink>
    </Container>)
};

export default Sidebar;
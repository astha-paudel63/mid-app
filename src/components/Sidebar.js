import React from "react";
import { AiOutlineMenu, AiOutlineRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import { RiEmotionNormalLine } from "react-icons/ri";
import { RiNewspaperLine } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import logo1 from '../pic/logo1.gif';
import logo2 from '../pic/logo2.gif';

const Container = styled.div`
display: flex;
flex-direction: column;
position: fixed;
width: ${props => props.expanded ? "20%": "5%"};
.link {
    text-decoration: none;
    margin: 10px 0;
    display: flex;
    padding: 5px;
    align-items: center;
    transition: all 0.5s;
    span {
        margin-left: 10px;
        color: #000000;
    }
    &:hover {
        background-color: #00000023;
    }
}
.active {
    color: #ffffff;
    &:hover {
        background-color: #008a9854;
    }
}

#side-header {
display: flex;
justify-content: space-between;
align-items: center;
}
transition: all 0.5s;
`;

const Sidebar = ({
    expanded,
    onClickBurgerMenu,
}) => {

const location = useLocation();
console.log(location, expanded, 'check location');
    return (<Container expanded={expanded}>
        <div id="side-header">
            {expanded && <h3>mid app</h3>}
            {expanded ? <AiOutlineMenu size={24} color={'pink'} onClick={e => onClickBurgerMenu(!expanded)} />:
            <AiOutlineRight size={30} color={'pink'} onClick={e => onClickBurgerMenu(!expanded)}/>}
        </div>
        <NavLink to="/home" title="hello">
        <img className="App-logo" src={expanded ?logo1:logo2} alt="whaterver" />
        </NavLink>
        <NavLink className="link" to="/home" title="Back Home">
           <FaHome color={"black"} size={expanded ? 20: 30} /> {expanded && <span>Home</span>}
        </NavLink>
        <NavLink className="link" to="/basic" title="Basic List">
            <RiEmotionNormalLine color={"black"} size={expanded ? 20: 30} /> {expanded ? <span>Basic</span>:null}
        </NavLink>
        <NavLink className="link" to="/expenses" title="Expenses">
            <RiNewspaperLine  color={"black"} size={expanded ? 20: 30} />{expanded && <span>Expenses</span>}
        </NavLink>
        <NavLink className="link" to="/billing" title="Billing List">
            <RiBillFill color={"black"} size={expanded ? 20: 30} />{expanded && <span>Billing</span>}
        </NavLink>
        <NavLink className="link" to="/Settings" title="Settings">
            <AiFillSetting color={"black"} size={expanded ? 20: 30} />{expanded && <span>Settings</span>}
        </NavLink>
    </Container>)
};

export default Sidebar;
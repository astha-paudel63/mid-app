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
        <img className="App-logo" src={`https://picsum.photos/${expanded ? '200': '40/50'}`} alt="whaterver" />
        </NavLink>
        <NavLink className="link" to="/home" title="Back Home">
           <FaHome size={expanded ? 20: 30} /> {expanded && <span>Home</span>}
        </NavLink>
        <NavLink className="link" to="/basic" title="Basic List">
            <RiEmotionNormalLine size={expanded ? 20: 30} /> {expanded ? <span>Basic</span>:null}
        </NavLink>
        <NavLink className="link" to="/expenses" title="Expenses">
            <RiNewspaperLine size={expanded ? 20: 30} />{expanded && <span>Expenses</span>}
        </NavLink>
        <NavLink className="link" to="/billing" title="Billing List">
            <RiBillFill size={expanded ? 20: 30} />{expanded && <span>Billing</span>}
        </NavLink>
        <NavLink className="link" to="/Settings" title="Settings">
            <RiBillFill size={expanded ? 20: 30} />{expanded && <span>Settings</span>}
        </NavLink>
    </Container>)
};

export default Sidebar;
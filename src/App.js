// import logo from "./logo.svg";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cssTransition } from "react-toastify";
// import "./modal.css";
import "./App.css";
import Counter from "./components/Counter";
import React, { useState,useContext } from "react";
import { isElementOfType } from "react-dom/test-utils";
import { useEffect, useRef, Fragment } from "react";
import ExpensesList from "./components/ExpensesList";
import BasicList from "./components/BasicList";
import Settings from "./components/Settings";
import BillingList from "./components/BillingList";
import { FaHome } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import { RiEmotionNormalLine } from "react-icons/ri";
import { RiNewspaperLine } from "react-icons/ri";

import { Routes, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Provider } from "./context/usercontext";
import { Provider as ThemeProvider } from "./context/themecontext";

function App() {
  const [selected, setSelected] = useState("basicc"); //control by setSelected
  const [hovered, setHovered] = useState("");
  const [hoveredList, setHoveredList] = useState([]);
  // const
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="App">
      <Provider>
      <ThemeProvider>
      <Sidebar expanded={sidebarExpanded} onClickBurgerMenu={setSidebarExpanded} />
      <div className={`content ${sidebarExpanded ? 'expanded':'contracted'}`}>
      {/* <div className="navigation-header">
        <div className="welcome"> */}
          {/* <Link to="/">
            <h1>welcome to my first app</h1>
          </Link> */}
        {/* </div> */}
        {/* <h1>Welcome to React Router!</h1> */}
        {/* <div className="navigation">
          <div className="billing">
            <div title="B">
              <Link
                to="/billing"
                // onMouseEnter={(e) => setHovered("billing")}
                // onMouseEnter={(e) => setHovered("billing")}
                // name="check"
                // onMouseEnter={(e) => setHoveredList([...hoveredList, 'billing'])}
                onMouseEnter={e => console.log(e)}
                // onMouseLeave={(e) => setHovered()}
              >
                <span>
                  <RiBillFill color={hovered === "billing"?"blue": hoveredList.includes("billing")?"white":"black"} size={40} />
                </span>
              </Link>
            </div>
          </div>
          <div className="basic">
            <div title="B">
              <Link
                to="/basic" */}
                {/* // onMouseEnter={(e) => setHovered("basic")}
                // onMouseLeave={(e) => setHovered("")}
                onMouseEnter={(e) => setHoveredList([...hoveredList, 'basic'])}
              >
                <span>
                  <RiEmotionNormalLine
                    color={hovered === "basic" ? "green" : "black"}
                    size={40}
                  />
                </span>
              </Link>
            </div>
          </div>

          <div className="expenses">
            <div title="E">
              <Link
                to="/expenses"
                // onMouseEnter={(e) => setHovered("expenses")}
                // onMouseLeave={(e) => setHovered("")}
                onMouseEnter={(e) => setHoveredList([...hoveredList, 'expenses'])}
              >
                <span>
                  <RiNewspaperLine
                    color={hovered === "expenses" ? "purple" : "pink"}
                    size={hovered === "expenses" ? 50 : 40}
                  />
                </span>
              </Link>
            </div>
          </div>
           <div className="home">
            <div title="HOME">
              <Link
                to={hovered === "expenses" ?"/billing" :"/home"} 
                // onMouseEnter={(e) => setHovered("homee")}
                // onMouseLeave={(e) => setHovered("")}
                onMouseEnter={(e) => setHoveredList([...hoveredList, 'home'])}
              >
                <span>
                {hovered !== "expenses" &&<FaHome
                    color={hovered === "homee" ? "red" : "black"}
                    size={40}
                  />}
                </span>
              </Link>
            </div>
          </div>
        </div>
        
      </div> */}
      <Routes>
          <Route
            path="/"
            element={
              <BasicList
                name="React"
                age={20}
                location={"Lalitpur"}
                coOrdinates={{
                  longitude: 80,
                  latitude: 27,
                }}
                primes={[2, 3, 5, 7, 11, 13]}
              />
            }
          />
          <Route
            path="basic"
            element={
              <BasicList
                name="React"
                age={20}
                location={"Lalitpur"}
                coOrdinates={{
                  longitude: 80,
                  latitude: 27,
                }}
                primes={[2, 3, 5, 7, 11, 13]}
              />
            }
          />
          <Route path="billing" element={<BillingList />} />
          <Route path="expenses" element={<ExpensesList />} />
          <Route path="Settings" element={<Settings />} />
          <Route path="*" element={<Counter />} />
        </Routes>
    </div>
    </ThemeProvider>
    </Provider>
    </div>
  );
}
export default App;

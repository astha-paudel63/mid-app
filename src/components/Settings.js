import React, { useContext, useState, useRef } from "react";
import styled from "styled-components";
import { Context } from "../context/usercontext";
import { Context as ThemeContext } from "../context/themecontext";
import { THEMES } from "../constants/themes";

const Container = styled.div`
  width: 80%;
  background-color: ${(props) => THEMES[props.themeID].backgroundColor};
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  margin-left: 20%;
  .boxx {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    background-color: ${(props) => THEMES[props.themeID].backgroundColor};
    border-radius: 20px;
    padding: 20px 50px;
    margin: 50px 0;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    span,
    input,
    label {
      color: ${(props) => THEMES[props.themeID].color};
    }
    input {
      background-color: ${(props) => THEMES[props.themeID].backgroundColor};
    }
    .theme-option {
      margin: 15px 0;
      padding: 5px 10px;
      background-color: white;
      border-radius: 10px;
    }
    .selected.theme-option {
      background-color: green;
    }
    transition: all 0.5s;
  }
`;

const Settings = () => {
  const {
    data: { firstName, lastName, age, location },
    data,
    updateUser,
  } = useContext(Context);

  const {
    data: { appliedTheme },
    updateTheme,
  } = useContext(ThemeContext);

  const [userfirstname, setUserfirstname] = useState(firstName);
  const [userlastname, setUserlastname] = useState(lastName);
  const [userage, setUserage] = useState(age);
  const [userlocation, setUserlocation] = useState(location);
  const firstnameInputRef = useRef(null);
  const lastnameInputRef = useRef(null);

  const [selectedTheme, setSelectedTheme] = useState(appliedTheme);

  console.log(data, updateUser, "check context update");

  const handleClickSave = (e) => {
    console.log("check");
    updateUser({
      firstName: userfirstname,
      lastName: userlastname,
      age: userage,
      location: userlocation,
    });
  };

  const handleSaveTheme = (e) => {
    console.log(selectedTheme, "check save theme");
    updateTheme({
      appliedTheme: selectedTheme,
    });
  };

  const handlePressAtfirstnameInput = (e) => {
    if (e.code === "Enter") {
      lastnameInputRef?.current.focus();
    }
  };

  const handlePressAtlastnameInput = (e) => {
    if (e.code === "Enter") {
      handleClickSave();
      firstnameInputRef?.current.focus();
    }
  };

  return (
    <Container themeID={appliedTheme}>
      <div className="main-container">
        <div className="boxx">
          <span>Test</span>
          <div className="input">
            <label>Name</label>
            <input
              value={userfirstname}
              onChange={(e) => setUserfirstname(e.target.value)}
              ref={firstnameInputRef}
              onKeyDown={handlePressAtfirstnameInput}
            />
          </div>
          <div className="input">
            <label>Lastname</label>
            <input
              value={userlastname}
              onChange={(e) => setUserlastname(e.target.value)}
              ref={lastnameInputRef}
              onKeyDown={handlePressAtlastnameInput}
            />
          </div>
          {/* <label >
            Name
        </label>
        <input value={userfirstname} onChange={e => setUserfirstname(e.target.value)} />
        <label >
            Name
        </label>
        <input value={userfirstname} onChange={e => setUserfirstname(e.target.value)} />
        <label >
            Name
        </label>
        <input value={userfirstname} onChange={e => setUserfirstname(e.target.value)} />  */}
          <div className="add-btn">
            <button className="add-btn01" onClick={handleClickSave}>
              Save changes
            </button>
          </div>
        </div>

        <div className="boxx">
          <div>
            {THEMES.map((th) => (
              <button
                key={th.id}
                htmlFor={"theme" + th.id}
                className={`"theme-option" ${
                  selectedTheme === th.id ? "selected" : ""
                }`}
                onClick={(e) => setSelectedTheme(th.id)}
              >
                <span
                  style={{
                    color: th.color,
                    backgroundColor: th.backgroundColor,
                  }}
                >
                  {th.name}
                </span>
                <input
                  type="radio"
                  id={"theme" + th.id}
                  value={th.id}
                  checked={selectedTheme === th.id}
                />{" "}
                
              </button>
            ))}
          </div>
          <div className="add-btn">
            <button className="add-btn01" onClick={handleSaveTheme}>
              Save Theme
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Settings;

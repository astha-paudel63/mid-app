import "./App.css";
import "./Expenses.css";
import React, { useState, useRef } from "react";
import { isElementOfType } from "react-dom/test-utils";
import { useEffect } from "react";
import ExpensesItem from "./ExpensesItem";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cssTransition } from "react-toastify";
import Modal from "react-modal";
import moment from "moment";

Modal.setAppElement("#root");

function ExpensesList() {
  // const { name, location, coOrdinates: {latitude, longitude}, age, primes } = props;
  const [productName, setProductName] = useState("");
  const [pricep, productp] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [dates, setDates] = useState(new Date());
  const [quantity, setQuantity] = useState(0);
  const [editState, setEditState] = useState(false);
  const [selectedProduct, setSelectProduct] = useState(null);
  const [total, setTotal] = useState(0);
  const nameInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const [value, setValue] = useState(0);
  const [openmodal, setOpenmodal] = useState(false);

  const dateInputRef = useRef(null);
  useEffect(() => {
    console.log("changed!!!");
    if (!editState) {
      setProductName("");
      productp(0);
      setQuantity(0);
    }
  }, [editState]);

  const handleAddUpdateProduct = (e) => {
    if (!editState) {
      setExpenses([
        ...expenses,
        { id: Date(), name: productName, price: pricep, quantity: quantity },
      ]);
      localStorage.setItem(
        "expenses",
        JSON.stringify([
          ...expenses,
          { id: Date(), name: productName, price: pricep, quantity: quantity },
        ])
      );
      toast.success(
        "product " + productName + " created " + " priced RS. " + pricep
      );
    } else {
      setExpenses(
        expenses.map((p) => {
          if (p.id === selectedProduct.id) {
            return {
              ...p,
              name: productName,
              price: pricep,
              quantity: quantity,
            };
          }
          return p;
        })
      );
      localStorage.setItem(
        "expenses",
        JSON.stringify(
          expenses.map((p) => {
            if (p.id === selectedProduct.id) {
              return {
                ...p,
                name: productName,
                price: pricep,
                quantity: quantity,
              };
            }
            return p;
          })
        )
      );
      toast.success("Product Update");
      setEditState(false);
    }
    setProductName("");
    productp(0);
    setQuantity(0);
  };
  const handelRemoveProduct = (id) => {
    console.log(id, "e");
    setExpenses(expenses.filter((p) => p.id !== id));
    localStorage.setItem('expenses',JSON.stringify(expenses.filter((p) => p.id !== id )))
    setOpenmodal(false);
    setSelectProduct(null); //setselectproduct lai empty garayko cuz edit ma ni use vako xa
    toast.success("product REMOVE ");
  };
  const handleClickRemove = (pr) => {
    setOpenmodal(true); //modal lai open garayko
    setSelectProduct(pr); //product lai select garayko
  }; //delete garxa aba

  const handelLetEditProduct = (product) => {
    setEditState(true);
    setSelectProduct(product);
    setProductName(product.name);
    productp(product.price);
    setQuantity(product.quantity);
    nameInputRef?.current.focus();
  };
  const handelPressEnterName = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      priceInputRef?.current.focus();
    }
  };
  const handelPressEnterPrice = (e) => {
    if (e.code === "Enter") {
      quantityInputRef?.current.focus();
    }
  };
  const handelPressEnterquantity = (e) => {
    if (e.code === "Enter") {
      dateInputRef?.current.focus();
    }
  };
  const handelPressEnterdate = (e) => {
    if (e.code === "Enter") {
      handleAddUpdateProduct();
      nameInputRef?.current.focus();
    }
  };
  useEffect(() => {
    const a = localStorage.getItem("expenses");
    if (a) {
      setExpenses(JSON.parse(a));
    }
  }, []);
  return (
    <div className="App">
      <h1>Expenses</h1>
      <div className="product-container">
        {expenses.map((car) => (
          <ExpensesItem
            key={car.id}
            expenses={car}
            handelLetEditProduct={handelLetEditProduct}
            handleClickRemove={handleClickRemove}
          />
          // <li key={car.id}>
          //   <span>{moment(car.date).format("MMMM/DD/YYYY")}</span>
          //   <span>{car.name}</span>
          //   <span>{car.price}</span>
          //   <button onClick={(f) => handelLetEditProduct(car)}>Edit</button>
          //   <button onClick={(e) => handleClickRemove(car.id)}>X</button>
          // </li>
        ))}
      </div>
      <div className="total-wapper">
        <div className="total">
          <span className="total-name">total</span>
          <span className="total-number">
            {expenses.reduce((a, v) => a + +v.price * v.quantity, 0)}
          </span>
        </div>
      </div>
      <div className="input">
        <div className="name-wapper">
          <h2>Name</h2>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            ref={nameInputRef}
            onKeyPress={handelPressEnterName}
          />
        </div>
        <div className="price-wapper">
          <h2>Price</h2>
          <input
            type="number"
            value={pricep}
            onChange={(f) => productp(f.target.value)}
            ref={priceInputRef}
            onKeyPress={handelPressEnterPrice}
          />
        </div>
        <div className="quantity-wapper">
          <h2>Quantity</h2>
          <input
            type="number"
            value={quantity}
            onChange={(f) => setQuantity(f.target.value)}
            ref={quantityInputRef}
            onKeyPress={handelPressEnterquantity}
          />
        </div>
        <div className="date-wapper">
          <h2>date</h2>
          <input
            type="Date"
            value={dates}
            onChange={(f) => setDates(f.target.value)}
            ref={dateInputRef}
            onKeyPress={handelPressEnterdate}
          />
        </div>
      </div>
      <div className="add">
        <button onClick={handleAddUpdateProduct}>
          {editState ? "update" : "add"}
        </button>
      </div>
      <div className="cancel">
        {editState ? (
          <button onClick={(e) => setEditState(false)}>cancel</button>
        ) : null}
      </div>
      <ToastContainer
        draggable
        pauseOnHover
        position="bottom-right"
        newestOnTop
        autoClose={9000}
        transition={Slide}
      />
      <Modal
        isOpen={openmodal}
        shouldCloseOnEsc
        style={{
          overlay: {
            backgroundcolor: "grey",
          },
          content: {
            color: "#004cff99",
          },
        }}
      >
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="title">
                <h1>Do you want to delete?</h1>
            </div>
            <div className="body">
              <p> everything will be deleted and can not undo !</p>
            </div>
            <div className="footer">
              <button onClick={(e) => setOpenmodal(false)} id="cancelbtn">X</button>
              <button onClick={(e) => handelRemoveProduct(selectedProduct.id)}>
                yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ExpensesList;

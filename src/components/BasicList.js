import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cssTransition } from "react-toastify";
import "./modal.css";
import "./App.css";
import Counter from "./Counter";
import React, { useState } from "react";
import { isElementOfType } from "react-dom/test-utils";
import { useEffect, useRef } from "react";
import ExpensesList from "./ExpensesList";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { AiFillCar } from "react-icons/ai";
import Modal from "react-modal";

Modal.setAppElement("#root");
const cars = [
  {
    name: "BMW",
    price: 400,
  },
  {
    name: "Bentley",
    price: 300,
  },
  {
    name: "Tesla",
    price: 300,
  },
  {
    name: "Lamborghini",
    price: 300,
  },
  {
    name: "Mercedez",
    price: 300,
  },
  {
    name: "Porsche",
    price: 300,
  },
  {
    name: "Buggatti",
    price: 300,
  },
  {
    name: "Ferrari",
    price: 300,
  },
];

function BasicList({
  name,
  location,
  coOrdinates: { latitude, longitude },
  age,
  primes,
}) {
  // console.log(name, location, "ccheck props");
  // const { name, location, coOrdinates: {latitude, longitude}, age, primes } = props;
  const [productName, setProductName] = useState("");
  const [pricep, productp] = useState(0);
  const [products, setproducts] = useState([]);
  const [editState, setEditState] = useState(false);
  const [selectedProduct, setSelectProduct] = useState(null);
  const nameInput = useRef(null);
  const priceInput = useRef(null);
  const [openmodal, setOpenmodal] = useState(false);
  const Zoom = cssTransition({
    enter: "zoomIn",
    exit: "zoomOut",
    appendPosition: false,
    collapse: true,
    collapseDuration: 300,
  });

  useEffect(() => {
    console.log("changed!!!");
    if (!editState) {
      setProductName("");
      productp(0);
    }
  }, [editState]);

  const handleAddUpdateProduct = (e) => {
    if (!editState) {
      setproducts([
        ...products,
        { id: Date(), name: productName, price: pricep },
      ]);
      localStorage.setItem(
        "products",
        JSON.stringify([
          ...products,
          { id: Date(), name: productName, price: pricep },
        ])
      );
      toast.success(
        "product " + productName + " created " + " priced RS. " + pricep
      );
    } else {
      setproducts(
        products.map((p) => {
          if (p.id === selectedProduct.id) {
            return {
              ...p,
              name: productName,
              price: pricep,
            };
          }
          return p;
        })
      );
      localStorage.setItem(
        "products",
        JSON.stringify(
          products.map((p) => {
            if (p.id === selectedProduct.id) {
              return {
                ...p,
                name: productName,
                price: pricep,
              };
            }
            return p;
          })
        )
      );
      toast.success("product Updated");
      setEditState(false);
    }
    setProductName("");
    productp(0);
  };
  const handelRemoveProduct = (id) => {
    console.log(id, "e");
    setproducts(products.filter((p) => p.id !== id));
    localStorage.setItem(
      "products",
      JSON.stringify(products.filter((p) => p.id !== id))
    );
    toast("product " + productName + " removed" + " priced RS. " + pricep);
    setOpenmodal(false);
    setSelectProduct(null);
  };
  const handleClickRemove = (pr) => {
    setOpenmodal(true); //modal lai open garayko
    setSelectProduct(pr); //product lai select garayko
  };
  const handelLetEditProduct = (product) => {
    setEditState(true);
    setSelectProduct(product);
    setProductName(product.name);
    productp(product.price);
  };

  const handelPressEnterName = (e) => {
    if (e.code === "Enter") {
      priceInput?.current.focus();
    }
  };
  const handelPressEnterPrice = (e) => {
    if (e.code === "Enter") {
      handleAddUpdateProduct();
      nameInput?.current.focus();
    }
  };
  useEffect(() => {
    const a = localStorage.getItem("products");
    if (a) {
      setproducts(JSON.parse(a));
    }
  }, []);
  return (
    <div className="App">
      <h1>{name}</h1>
      <h1>{location}</h1>
      <h1>{latitude}' North</h1>
      <h1>{longitude}'East</h1>
      <h1>{age} years</h1>
      <h2>
        Primes: {primes} {primes.length} primes
      </h2>
      {/* <Counter /> */}
      {/* <ExpensesList /> */}
      <h1>Cars</h1>
      <AiFillCar color={"#fffff"} size={100} />
      <ol>
        {products.map((car) => (
          <li key={car.id}>
            <span>{car.name}</span>
            <span>{car.price}</span>
            <button onClick={(f) => handelLetEditProduct(car)}>Edit</button>
            <button onClick={(e) => handleClickRemove(car)}>
              <MdOutlineDeleteSweep color={"#fffff"} size={20} />
            </button>
          </li>
        ))}
      </ol>
      <div className="input">
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          ref={nameInput}
          onKeyPress={handelPressEnterName}
        />
        <input
          type="number"
          value={pricep}
          onChange={(f) => productp(f.target.value)}
          ref={priceInput}
          onKeyPress={handelPressEnterPrice}
        />
      </div>
      <button onClick={handleAddUpdateProduct}>
        {editState ? "update" : "add"}
      </button>
      {editState ? (
        <button onClick={(e) => setEditState(false)}>cancel</button>
      ) : null}
      <ToastContainer
        draggable
        pauseOnHover
        position="bottom-right"
        newestOnTop
        autoClose={9000}
        transition={Slide}
      />
      <Modal isOpen={openmodal} shouldCloseOnEsc>
        <div>
          <span>Do you want to delete?</span>
          <button onClick={(e) => setOpenmodal(false)}>X</button>
          <button onClick={(e) => handelRemoveProduct(selectedProduct.id)}>
            yes
          </button>
        </div>
      </Modal>
    </div>
  );
}
export default BasicList;

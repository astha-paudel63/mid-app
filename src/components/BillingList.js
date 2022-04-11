import React, { useEffect, useState, useRef } from "react";
import ReactSelect from "react-select";
import "./billing.css";
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteSweep  } from "react-icons/md";
import Counter from "./Counter";


const BillingList = () => {
  const [entries, setEntries] = useState([]);
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(Date());
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [edit, setEdit] = useState(null);
  const [subTotal, setSubtotal] = useState(0);
  const [discountRate, setDiscoutRate] = useState(3);
  const [vatRate, setVatRate] = useState(13);
  const productInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const enterInputRef = useRef(null);

  useEffect(() => {
    const productsRecorded = JSON.parse(localStorage.getItem("products"));
    if (productsRecorded) {
      setProducts(productsRecorded);
    }
  }, []);

  const handleAddUpdateEntry = (e) => {
    const productt = products.find((pr) => pr.id === product);
    if(!edit){
    setEntries([
      ...entries,
      {
        productId: product,
        productName: productt.name,
        price: productt.price,
        quantity,
      },
    ]);}
    else{
      entries.map((p)=>{
        if(p.id === products.id){
          return{
            ...p,
            productId: product,
            productName: productt.name,
            price: productt.price,
            quantity,
        }
      };
      return p;
    })
    }

  };
  const handelLetEditProduct = (product) => {
    setEdit(true);
    productInputRef?.current.focus();
  };
  const handelLetremoveProduct = (id) => {
    setProduct(products.filter((p) => p.id !== id));
    
  };
  const handelproductname = (e) => {
    if (e.code === "Enter") {
      quantityInputRef?.current.focus();
    }
  };
  const handelproductquantity = (e) => {
    if (e.code === "Enter") {
      enterInputRef?.current.focus();
    }
  };
  const handelproductenter = (e) => {
    if (e.code === "Enter") {
      productInputRef?.current.focus();
    }
  };

  console.log(products, product);
  return (
    <div className="body-wapper">
      <div className="entries-container">
        <div className="bill">
          <h1>BILL SYSTEM</h1>
        </div>
        <div className="entries-wapper">
          <div className="entries">
            <div className="productName">
              <h3>Product Name</h3>
            </div>
            <div className="quantity">
              <h3>Quantity</h3>
            </div>
            <div className="price">
              <h3>Price</h3>
            </div>
            <div className="totall">
              <h3>Total</h3>
            </div>
            <div className="edit"><h3>Edit</h3></div>
            <div className="remove"><h3>Remove</h3></div>
          </div>
          <div className="data">

          {entries.map((en) => (
            <div className="entries">
              <div className="productName">
                <span>{en.productName}</span>
              </div>
              <div className="quantity">
                <span>{+en.quantity}</span>
              </div>
              <div className="price">
                <span>{+en.price}</span>
              </div>
              <div className="totall">
                <span>{+en.price * +en.quantity}</span>
              </div>
              <div className="edit-product">
                <tooltip title="EDIT">
                  <button onClick={(f) => handelLetEditProduct}>
                    <MdEditNote color={"#fffff"} size={20} />
                  </button>
                </tooltip>
              </div>
              <div className="remove">
                <tooltip title="DELETE">
                  <button onClick={(e) => handelLetremoveProduct}>
                    <MdOutlineDeleteSweep color={"#fffff"} size={20} />
                  </button>
                </tooltip>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      <div className="summary-wapper">

     
      <div className="summary">
        <div className="subtotal">
          <span>subTotal</span>
          <span>{entries.reduce((a, v) => a + +v.price * +v.quantity, 0)}</span>
        </div>
        <div className="discount">
          <span>Discount amount</span>
          <span>
            {(entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
              discountRate) /
              100}
          </span>
        </div>
        <div className="Total">
          <span>Total</span>
          <span>
            {entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
              (1 - discountRate / 100).toFixed(1)}
          </span>
        </div>
        <div className="vat">
          <span>vat amount</span>
          <span>
            {(entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
              (1 - discountRate / 100).toFixed(1)*
              vatRate) /
              100}
          </span>
        </div>
        <div className="grand">
          <span>Grand Total</span>
          <span>
            {(
              entries.reduce((a, v) => a + +v.price * +v.quantity, 0) *
              (1 - discountRate / 100) *
              (1 + vatRate / 100)
            ).toFixed(2)}
          </span>
        </div>
      </div>
      </div>

      <div className="type">
        <div className="select">
          {/* <select value={product} onChange={(e) => setProduct(e.target.value)}>
            {products.map((p) => (
              <option id={p.name} key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select> */}
          <></>
          <h3> Product Name</h3>
          <ReactSelect
            options={products.map((p) => ({
              ...p,
              value: p.id,
              label: p.name,
            }))}
            onChange={(a) => setProduct(a.id)}
            // value={product}
            onKeyDown={handelproductname}
            placeholder="Select Product"
            ref={productInputRef}
          />
        </div>
        <div className="quantity">
          <h3>Quantity</h3>
          <input
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            ref={quantityInputRef}
            onKeyPress={handelproductquantity}
          />
          <Counter initialValue={quantity} onChange={setQuantity} />
        </div>
        <div className="add">
          <button
            onClick={handleAddUpdateEntry}
            ref={enterInputRef}
            onKeyPress={handelproductenter}
          >
            Add Entry
          </button>
        </div>
        <div className="intput-discount">
          <h3>Discount</h3>
          <input
            value={discountRate}
            type="number"
            onChange={(e) => setDiscoutRate(e.target.value)}
          />
        </div>
        <div className="input-vat">
          <h3>VAT</h3>
          <input
            value={vatRate}
            type="number"
            onChange={(e) => setVatRate(e.target.value)}
          />
        </div>
        <button onClick={handleAddUpdateEntry}>
        {edit ? "update" : "add"}
      </button>
      {edit ? (
        <button onClick={(e) => setEdit(false)}>cancel</button>
      ) : null}
      </div>
    </div>
  );
};

export default BillingList;

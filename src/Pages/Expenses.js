import React, { useState, useRef } from "react";
import Sidebar from "../Components/Sidebar";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { app } from "../Firebase";
import { collection, getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";

function Expenses() {
  const ExpenseNameRef = useRef();
  const ExpenseQuantityRef = useRef();
  const ExpenseAmountRef = useRef();
  const DateRef = useRef();
  const ItemRef = useRef();

  const auth = getAuth();
  const navigate = useNavigate();
  const db = getFirestore(app);
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

  const [show, setShow] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function setDocument() {
    const ExpenseName = ExpenseNameRef.current.value;
    const ExpenseQuantity = ExpenseQuantityRef.current.value;
    const ExpenseAmount = ExpenseAmountRef.current.value;
    const Date = DateRef.current.value;
    const Item = ItemRef.current.value;

    onAuthStateChanged(auth, (user) => {
      const UserId = user.uid;
      if (user) {
        const newExpense = doc(collection(db, "Expense-Data"));
        setDoc(newExpense, {
          UserId: UserId,
          ExpenseDocId: newExpense.id,
          ExpenseName: ExpenseName,
          ExpenseQuantity: ExpenseQuantity,
          ExpenseAmout: ExpenseAmount,
          Date: Date,
          Item: Item,
        })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorMessage);
          });
      }
    });
  }

  return (
    <div className="Expenses">
      <Sidebar />
      <div className="myExpenses">
        <Button variant="primary" onClick={handleShow}>
          Add Expenses
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <select ref={ItemRef}>
            <option value={"select"}>Select item</option>
            <option value={"Samsung Galaxy A13"}>Samsung Galaxy A13</option>
            <option value={"Samsung Galaxy A14"}>Samsung Galaxy A14</option>
            <option value={"Samsung Galaxy S23"}>Samsung Galaxy S23</option>
            <option value={"Samsung Galaxy Fold 4"}>Samsung Galaxy Fold 4</option>
          </select>
          <FormControl
            type="text"
            ref={ExpenseAmountRef}
            placeholder="Item Amount"
          />
          <FormControl
            type="text"
            ref={ExpenseNameRef}
            placeholder="Item Name"
          />
          <FormControl
            type="text"
            ref={ExpenseQuantityRef}
            placeholder="Item Quantity"
          />
          <FormControl
            type="date"
            ref={DateRef}
            placeholder="Transaction date"
          />
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={setDocument}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Amount</th>
              <th>Item ID</th>
              <th>Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Expenses;

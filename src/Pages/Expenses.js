

import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { app } from "../Firebase";
import { deleteDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  updateDoc
} from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import swal from "sweetalert";

function Expenses() {
  const ExpenseNameRef = useRef();
  const ExpenseQuantityRef = useRef();
  const ExpenseAmountRef = useRef();
  const DateRef = useRef();
  const ItemRef = useRef();

  const auth = getAuth();
  const navigate = useNavigate();
  const db = getFirestore(app);

  const [ExpenseList, setExpenseList] = useState([]);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const UserId = user.uid;

        const FetchData = async () => {
          let ExpenseItem = [];
          const queryDocument = query(
            collection(db, "Expense-Data"),
            where("UserId", "==", UserId)
          );
          const querySnapShot = await getDocs(queryDocument);
          querySnapShot.forEach((ExpenseDoc) => {
            ExpenseItem.push({ Id: ExpenseDoc.Id, ...ExpenseDoc.data() });
            setExpenseList([...ExpenseItem]);
          });  
        };
        FetchData();
      }
    });
  });
  

  // const handleDeleteExpense = async () => {
  
  //         await deleteDoc(doc(db, "Expense-Data"));
  //       }
  // handleDeleteExpense()
  
  const handleDeleteExpense = async () => {
  try {
    const expenseSnapshot = await getDocs(collection(db, "Expense-Data"));
    const expenseItem = [];

    expenseSnapshot.forEach((expenseDoc) => {
      expenseItem.push({ id: expenseDoc.id, ...expenseDoc.data() });
    });

    if (expenseItem.length>0) {
      const expenseToDelete = expenseItem[0]; // Select the first expense from the list
      
      await deleteDoc(doc(db, "Expense-Data", expenseToDelete.id));
      
      console.log('Expense deleted successfully!');
      console.log(expenseToDelete.id)
    } 
    else {
      console.log('No expenses found to delete.');
    }
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
};

// handleDeleteExpense();


  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/")
    }
  });

  const [show, setShow] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // UPDATE EXPENSE MODAL 
  const [update, UpdateShow] = useState(false);

  const handleUpdateClose = () => UpdateShow(false);
  const handleUpdateShow = () => UpdateShow(true);

  function updateExpense(ExpenseDocId){
    handleUpdateShow()
    const docId = ExpenseDocId
    
    window.updateExpense = function(){
      const ExpenseName = ExpenseNameRef.current.value;
        const ExpenseQuantity = ExpenseQuantityRef.current.value;
        const ExpenseAmount = ExpenseAmountRef.current.value;
        const Date = DateRef.current.value;
        const Item = ItemRef.current.value;
    
    
        const updateExpense = doc(db, "Expense-Data", docId)
        updateDoc(updateExpense,{
          ExpenseName: ExpenseName,
              ExpenseQuantity: ExpenseQuantity,
              ExpenseAmount: ExpenseAmount,
              Date: Date,
              Item: Item,
        }).then(()=>{
          window.location.reload()
        })
    }
      }
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
          ExpenseAmount: ExpenseAmount,
          Date: Date,
          Item: Item,
        })
          
      }
    });
  }

function deleteExpense (ExpenseDocId){
  const DocId = ExpenseDocId
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this Expense Item!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      
      deleteDoc(doc(db, "Expense-Data", DocId)).then(()=>{
        swal("Deleted", " ", " success")
        swal(`Your Expense has been deleted successfully`,{icon:"success"})
        .then(()=> {window.location.reload()
        })
      })
  
      
    } else {
      swal("Cancelled");
    }
  });
}

// function UpdateExpense (Ex)

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
            <option value={"Samsung Galaxy Fold 4"}>
              Samsung Galaxy Fold 4
            </option>
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




        <Modal show={update} onHide={handleUpdateClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <select ref={ItemRef}>
            <option value={"select"}>Select item</option>
            <option value={"Samsung Galaxy A13"}>Samsung Galaxy A13</option>
            <option value={"Samsung Galaxy A14"}>Samsung Galaxy A14</option>
            <option value={"Samsung Galaxy S23"}>Samsung Galaxy S23</option>
            <option value={"Samsung Galaxy Fold 4"}>
              Samsung Galaxy Fold 4
            </option>
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
            <Button variant="secondary" onClick={handleUpdateClose}>
              Close
            </Button>
            <Button variant="primary" onClick={window.updateExpense}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Item Name</th>
              <th>Item Amount</th>
              <th>Item Quantity</th>
              <th>Transaction Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ExpenseList.map((ExpenseItem) => (
              <tr key={Math.random()}>
                <td>{ExpenseItem.Item}</td>
                <td>{ExpenseItem.ExpenseName}</td>
                <td>{ExpenseItem.ExpenseAmount}</td>
                <td>{ExpenseItem.ExpenseQuantity}</td>
                <td>{ExpenseItem.Date}</td>
                {/* <td><Button variant="danger" onClick={handleDeleteExpense} >delete</Button></td> */}
                <td><Button variant="danger" onClick={()=>deleteExpense(ExpenseItem.ExpenseDocId)} >Delete</Button></td>
                <td><Button variant="primary" onClick={()=>updateExpense(ExpenseItem.ExpenseDocId)} >Update Expense</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Expenses;

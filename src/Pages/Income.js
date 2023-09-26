

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
function Income() {
  const IncomeNameRef = useRef();
  const IncomeQuantityRef = useRef();
  const IncomeAmountRef = useRef();
  const DateRef = useRef();
  const ItemRef = useRef();

  const auth = getAuth();
  const navigate = useNavigate();
  const db = getFirestore(app);

  const [IncomeList, setIncomeList] = useState([]);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const UserId = user.uid;

        const FetchData = async () => {
          let IncomeItem = [];
          const queryDocument = query(
            collection(db, "Incomes-Data"),
            where("UserId", "==", UserId)
          );
          const querySnapShot = await getDocs(queryDocument);
          querySnapShot.forEach((IncomeDoc) => {
            IncomeItem.push({ Id: IncomeDoc.Id, ...IncomeDoc.data() });
            setIncomeList([...IncomeItem]);
          });  
        };
        FetchData();
      }
    });
  });
  

  // const handleDeleteIncome = async () => {
  
  //         await deleteDoc(doc(db, "Income-Data"));
  //       }
  // handleDeleteIncome()
  
//   const handleDeleteIncome = async () => {
//   try {
//     const IncomeSnapshot = await getDocs(collection(db, "Income-Data"));
//     const IncomeItem = [];

//     IncomeSnapshot.forEach((IncomeDoc) => {
//       IncomeItem.push({ id: IncomeDoc.id, ...IncomeDoc.data() });
//     });

//     if (IncomeItem.length>0) {
//       const IncomeToDelete = IncomeItem[0]; // Select the first Income from the list
      
//       await deleteDoc(doc(db, "Income-Data", IncomeToDelete.id));
      
//       console.log('Income deleted successfully!');
//       console.log(IncomeToDelete.id)
//     } 
//     else {
//       console.log('No Incomes found to delete.');
//     }
//   } catch (error) {
//     console.error('Error deleting Income:', error);
//   }
// };

// handleDeleteIncome();


  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/")
    }
  });

  const [show, setShow] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
// INCOME APDATE MODAL
const [update, UpdateShow] = useState(false);

  const handleUpdateClose = () => UpdateShow(false);
  const handleUpdateShow = () => UpdateShow(true);


  function updateIncome(IncomeDocId){
handleUpdateShow()
const docId = IncomeDocId

window.updateIncome = function(){
  const IncomeName = IncomeNameRef.current.value;
    const IncomeQuantity = IncomeQuantityRef.current.value;
    const IncomeAmount = IncomeAmountRef.current.value;
    const Date = DateRef.current.value;
    const Item = ItemRef.current.value;


    const updateIncome = doc(db, "Incomes-Data", docId)
    updateDoc(updateIncome,{
      IncomeName: IncomeName,
          IncomeQuantity: IncomeQuantity,
          IncomeAmount: IncomeAmount,
          Date: Date,
          Item: Item,
    }).then(()=>{
      window.location.reload()
    })
}
  }
  function setDocument() {
    const IncomeName = IncomeNameRef.current.value;
    const IncomeQuantity = IncomeQuantityRef.current.value;
    const IncomeAmount = IncomeAmountRef.current.value;
    const Date = DateRef.current.value;
    const Item = ItemRef.current.value;

    onAuthStateChanged(auth, (user) => {
      const UserId = user.uid;
      if (user) {
        const newIncome = doc(collection(db, "Incomes-Data"));
        setDoc(newIncome, {
          UserId: UserId,
          IncomeDocId: newIncome.id,
          IncomeName: IncomeName,
          IncomeQuantity: IncomeQuantity,
          IncomeAmount: IncomeAmount,
          Date: Date,
          Item: Item,
        }).then(()=>{
          window.location.reload()
        })
          
      }
    });
  }

function deleteIncome (IncomeDocId){
  const DocId = IncomeDocId
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this Income Item!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      
      deleteDoc(doc(db, "Incomes-Data", DocId)).then(()=>{
        swal("Deleted", " ", " success")
        swal(`Your Income has been deleted successfully`,{icon:"success"})
        .then(()=> {window.location.reload()
        })
      })
  
      
    } else {
      swal("Cancelled");
    }
  });
}

  return (
    <div className="Income">
      <Sidebar />
      <div className="myIncome">
        <Button variant="primary" onClick={handleShow}>
          Add Income
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
            ref={IncomeAmountRef}
            placeholder="Item Amount"
          />
          <FormControl
            type="text"
            ref={IncomeNameRef}
            placeholder="Item Name"
          />
          <FormControl
            type="text"
            ref={IncomeQuantityRef}
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
            ref={IncomeAmountRef}
            placeholder="Item Amount"
          />
          <FormControl
            type="text"
            ref={IncomeNameRef}
            placeholder="Item Name"
          />
          <FormControl
            type="text"
            ref={IncomeQuantityRef}
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
            <Button variant="primary" onClick={window.updateIncome}>
              Update
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
            {IncomeList.map((IncomeItem) => (
              <tr key={Math.random()}>
                <td>{IncomeItem.Item}</td>
                <td>{IncomeItem.IncomeName}</td>
                <td>{IncomeItem.IncomeAmount}</td>
                <td>{IncomeItem.IncomeQuantity}</td>
                <td>{IncomeItem.Date}</td>
                {/* <td><Button variant="danger" onClick={handleDeleteIncome} >delete</Button></td> */}
                <td><Button variant="danger" onClick={()=>deleteIncome(IncomeItem.IncomeDocId)} >Delete</Button></td>
                <td><Button variant="primary" onClick={()=>updateIncome(IncomeItem.IncomeDocId)} >Update Income</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Income;

// // import React, { useState, useRef, useEffect } from "react";
// import Sidebar from "../Components/Sidebar";
// import { Table } from "react-bootstrap";
// import { Button } from "react-bootstrap";
// import { Modal } from "react-bootstrap";
// import { FormControl } from "react-bootstrap";
// import { app } from "../Firebase";
// import {
//   collection,
//   getDocs,
//   getFirestore,
//   query,
//   where,
// } from "firebase/firestore";
// import { doc, setDoc } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from "react-router";
// function Income() {
//   const IncomeNameRef = useRef();
//   const IncomeQuantityRef = useRef();
//   const IncomeAmountRef = useRef();
//   const DateRef = useRef();
//   const ItemRef = useRef();

//   const auth = getAuth();
//   const navigate = useNavigate();
//   const db = getFirestore(app);

//   const [IncomeList, setIncomeList] = useState([]);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const UserId = user.uid;

//         const FetchData = async () => {
//           let IncomeItem = [];
//           const queryDocument = query(
//             collection(db, "Income-Data"),
//             where("UserId", "==", UserId)
//           );
//           const querySnapShot = await getDocs(queryDocument);
//           querySnapShot.forEach((IncomeDoc) => {
//             IncomeItem.push({ Id: IncomeDoc.id, ...IncomeDoc.data() });
//             setIncomeList([...IncomeItem]);
//           });
//         };
//         FetchData();
//       }
//     });
//   }, []);

//   onAuthStateChanged(auth, (user) => {
//     if (!user) {
//       navigate("/");
//     }
//   });

//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   function setDocument() {
//     const IncomeName = IncomeNameRef.current.value;
//     const IncomeQuantity = IncomeQuantityRef.current.value;
//     const IncomeAmount = IncomeAmountRef.current.value;
//     const Date = DateRef.current.value;
//     const Item = ItemRef.current.value;
//     onAuthStateChanged(auth, (user) => {
//       const UserId = user.uid;
//       if (user) {
//         const newIncome = doc(collection(db, "Income-Data"));
//         setDoc(newIncome, {
//           Userid: UserId,
//           IncomeDocId: newIncome.id,
//           IncomeName: IncomeName,
//           IncomeQuantity: IncomeQuantity,
//           IncomeAmount: IncomeAmount,
//           Date: Date,
//           Item: Item,
//         });
//       }
//     });
//   }
//   return (
//     <div className="Income">
//       <Sidebar />
//       <div className="myIcome">
//         <Button variant="primary" onClick={handleShow}>
//           Add Income
//         </Button>

//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>New Income</Modal.Title>
//           </Modal.Header>
//           <select ref={ItemRef}>
//             <option value={""}>Select item</option>
//             <option value={"Samsung Galaxy A13"}>Samsung Galaxy A13</option>
//             <option value={"Samsung Galaxy A14"}>Samsung Galaxy A14</option>
//             <option value={"Samsung Galaxy S23"}>Samsung Galaxy S23</option>
//             <option value={"Samsung Galaxy Fold 4"}>
//               Samsung Galaxy Fold 4
//             </option>
//           </select>
//           <FormControl
//             type="text"
//             ref={IncomeAmountRef}
//             placeholder="Item Amount"
//           />
//           <FormControl
//             type="text"
//             ref={IncomeNameRef}
//             placeholder="Item Name"
//           />
//           <FormControl
//             type="text"
//             ref={IncomeQuantityRef}
//             placeholder="Item Quantity"
//           />
//           <FormControl
//             type="date"
//             ref={DateRef}
//             placeholder="Transaction date"
//           />
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={setDocument}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Item</th>
//               <th>Item Name</th>
//               <th>Item Amount</th>
//               <th>Item Quantity</th>
//               <th>Transaction Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {IncomeList.map((IncomeItem) => (
//               <tr key={Math.random()}>
//                 <td>{IncomeItem.Item}</td>
//                 <td>{IncomeItem.IncomeName}</td>
//                 <td>{IncomeItem.IncomeAmount}</td>
//                 <td>{IncomeItem.IncomeQuantity}</td>
//                 <td>{IncomeItem.Date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// export default Income;

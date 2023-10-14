// ================== ADD USER ================ 
import {
    db,
    collection,
    addDoc,
    serverTimestamp,
    getDoc,
updateDoc,

doc,
  } from "../../fireBaseConfig.js";
// const form = document.getElementById("form-add-new");

// form.addEventListener("submit", function (event) {
//   event.preventDefault(); // Ngăn chặn gửi biểu mẫu thông qua phương thức mặc định

//   // Lấy giá trị từ các trường input và radio button
//   const displayName = document.querySelector(
//     ".form-field--input[name='display-name']"
//   ).value;

//   const email = document.querySelector(
//     ".form-field--input[name='email']"
//   ).value;
//   const role = document.querySelector(
//     ".form-radio input[name='role']:checked"
//   ).value;
//   const status = document.querySelector(
//     ".form-radio input[name='status']:checked"
//   ).value;

//   handleAddNew(displayName, email, role, status);
// });
// async function handleAddNew(displayName, email, role, status) {
//   try {
//     const docRef = await addDoc(collection(db, "users"), {
//       displayName,
//       email,
//       role,
//       status,
//       timestamp: serverTimestamp(),
//     });
//     alert("Thêm thành công");
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

// ==================== HANDEL UPDATE ====================

// ---------------- SET VALUE ------------- 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log("🚀 ~ file: handleUsers.js:54 ~ urlParams:", urlParams)
var postID = urlParams.get("id");

async function getData(postId) {
  try {
    const docRef = doc(db, "users", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      // Get form input values

      const displayName = document.querySelector(
        ".form-field--input[name='display-name']"
      );
    
      const email = document.querySelector(
        ".form-field--input[name='email']"
      );
      const role = document.querySelector(
        ".form-radio input[name='role']:checked"
      );
      const status = document.querySelector(
        ".form-radio input[name='status']:checked"
      );

      // Set values

      displayName.value = docData.displayName;
      email.value = docData.email;
      price.value = parseInt(docData.price);
      role.value = docData.role;
      status.value = docData.status;
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: index.html:276 ~ button.addEventListener ~ error:",
      error
    );
  }
}
getData(postID);
// == submit form edit

  
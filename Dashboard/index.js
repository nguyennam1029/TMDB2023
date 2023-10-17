import {
    auth,
    onAuthStateChanged,
    signOut,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    db,
    doc,
    deleteDoc,
  } from "../fireBaseConfig.js";


const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

const darkMode = document.querySelector('.dark-mode');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})

// ==========================RENDER USERS ===================

function createProductCard(user) {

  const dataProductId = user.role === 'admin' ? '' : `data-product-id="${user.id}"`;
  const deleteButton = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="trash delete-button"
      ${dataProductId}
    >
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
  />
    </svg>`;
  
  const editLink = `
    <a href="${user.role === 'admin' ? '#' : `/Dashboard/update-user.html?id=${user.id}`}" style="width: 25px; height: 25px; margin: 0;">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="edit"
      >
      <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
      </svg>
    </a>`;

    const template = `
    <tr>
    <td>${user?.displayName}</td>
    <td>${user?.email}</td>
    <td>${user?.role}</td>
 
  
    <td class="primary">${user?.status}</td>
    <td class="primary">${user?.timestamp ? moment.unix(user.timestamp.seconds).format('DD/MM/YYYY') :moment(user?.creationTime, "ddd, DD MMM YYYY HH:mm:ss [GMT]").format("DD/MM/YYYY")}</td>
    <td class="action">
    ${deleteButton}
    ${editLink}
    </td>
  </tr>
    `;
  
    return template;
  }
  
  const productsContainer = document.getElementById("content-users");
  console.log("🚀 ~ file: index.js:95 ~ productsContainer:", productsContainer)
  if(productsContainer) { const querySnapshot = await getDocs(collection(db, "users"));

  
  querySnapshot.forEach((doc) => {
    const productData = doc.data();
 
    const productId = doc.id;
  
    // Combine doc.id and doc.data() into a single object
    const productInfo = { id: productId, ...productData };
    const productCard = createProductCard(productInfo);
  
    productsContainer.insertAdjacentHTML("beforeend", productCard);
  });

}



  // ===================== DELETE USER ================= 
  
const deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const id = button.dataset.productId;
    if(!id) {
      toastr.options = { 
        "positionClass": "toast-bottom-left",
      }
      toastr.warning('you have no rights');
      return;
    }
    try {
      toastr.options = { 
        "positionClass": "toast-bottom-left",
      }
     // Hiển thị cảnh báo xác nhận
     const userConfirmed = confirm("Are you sure you want to delete ?");
     if (!userConfirmed) {
      toastr.info('Cancelled');
         return; // Nếu người dùng không xác nhận, dừng thực hiện tiếp
     }


      await deleteDoc(doc(db, "users", id));
     
      toastr.success('User deleted successfully');
            setTimeout(() => {
                window.location.assign("/Dashboard/users.html");
            }, 1600);
    } catch (error) {
      console.log(
        "🚀 ~ file: index.html:276 ~ button.addEventListener ~ error:",
        error
      );
    }
    // await handleDelete(id);
  });
});


// -------------- GET MOVIES ------------- 
const wrapMovies = document.getElementById("content-movies");
const querySnapshotMovies = await getDocs(collection(db, "movies"));

function templateMovie(item) {
 
  const deleteButton = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="trash delete-button-movie"
      data-movie-id=${item?.id}
    >
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
  />
    </svg>`;
  
  const editLink = `
    <a href="/Dashboard/update-movie.html?id=${item.id}" style="width: 25px; height: 25px; margin: 0;">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="edit"
      >
      <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
      </svg>
    </a>`;

    const template = `

    
    <tr>
    <td>${item?.title}</td>
    <td>
    <span  class="content-movie-span"> 
    ${item?.selectedGenres.map((title) => title )}
                  </span>
                  </td>
  
    <td><span class="content-movie-span">${item?.overview}</span></td>
    <td >${moment( item?.first_air_date || item?.release_date).format('DD-MM-YYYY')}</td>
   
               
                <td>
                <div >
                  <img
                  class="movie-bg-poster"
                    src="${item?.posterBgImageUrl}"
                    alt=""
                  />
                </div>
              </td>
              <td>
              <div class="movie-wrap-img">
                <img
                  src="${item?.posterImageUrl}"
                  alt=""
                />
              </div>
            </td>
    <td class="action">
    ${deleteButton}
    ${editLink}
    </td>
  </tr>
    `;
  
    return template;
  }
querySnapshotMovies.forEach((doc) => {
  const productData = doc.data();
  console.log("🚀 ~ file: index.js:229 ~ querySnapshotMovies.forEach ~ productData:", productData)

  const productId = doc.id;
 

  // Combine doc.id and doc.data() into a single object
  const productInfo = { id: productId, ...productData };
  const productCard = templateMovie(productInfo);

  wrapMovies.insertAdjacentHTML("beforeend", productCard);
});

  // ===================== DELETE USER ================= 
  
  const deleteButtonMovies = document.querySelectorAll(".delete-button-movie");

  deleteButtonMovies.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.movieId;
      if(!id) {
        toastr.options = { 
          "positionClass": "toast-bottom-left",
        }
        toastr.warning('you have no rights');
        return;
      }
      try {
        toastr.options = { 
          "positionClass": "toast-bottom-left",
        }
       // Hiển thị cảnh báo xác nhận
       const userConfirmed = confirm("Are you sure you want to delete ?");
       if (!userConfirmed) {
        toastr.info('Cancelled');
           return; // Nếu người dùng không xác nhận, dừng thực hiện tiếp
       }
  
  
        await deleteDoc(doc(db, "movies", id));
       
        toastr.success('Movie deleted successfully');
              setTimeout(() => {
                  window.location.assign("/Dashboard/movie.html");
              }, 1600);
      } catch (error) {
        console.log(
          "🚀 ~ file: index.html:276 ~ button.addEventListener ~ error:",
          error
        );
      }
      // await handleDelete(id);
    });
  });
  




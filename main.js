const apiKey = "ef138d2e438f48c0910e6806f5b0fce1";
const apiTrending = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;
const apiPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

import { auth, onAuthStateChanged, signOut } from "./fireBaseConfig.js";
onAuthStateChanged(auth, (user) => {
  // Lấy các phần tử theo ID
  const notiElement = document.getElementById("noti");
  const infoElement = document.getElementById("info");
  const signInElement = document.getElementById("signIn");
  const signUpElement = document.getElementById("signUp");
  const btnSignOut = document.getElementById("signOut");

  if (user) {
    const uid = user.uid;
    
    if (uid) {
      // Nếu có người dùng, ẩn các phần tử đăng nhập và hiển thị noti và info
      signInElement.style.display = "none";
      signUpElement.style.display = "none";
      notiElement.style.display = "block";
      infoElement.style.display = "block";
    btnSignOut.style.display = "block";

    }

    async function handleLogOut() {
      try {
        alert("Bạn có muốn đăng xuất tài khoản không ?");
        await signOut(auth);
      } catch (error) {
        console.log("🚀 ~ file: index.html:177 ~ handleLogOut ~ error:", error);
      }
    }
    btnSignOut.addEventListener("click", handleLogOut);
  } else {
    signInElement.style.display = "block";
    signUpElement.style.display = "block";
    btnSignOut.style.display = "none";
    notiElement.style.display = "none";
    infoElement.style.display = "none";
  }
});

// =========================== Search =========================== 
// Lấy đối tượng nút tìm kiếm và ô input từ khóa
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

// Xử lý sự kiện khi nút tìm kiếm được bấm
searchButton.addEventListener("click", function() {
  // Lấy giá trị từ khóa từ ô input
  const keyword = searchInput.value;
  const encodedQuery = encodeURIComponent(keyword).replace(/%20/g, '+');
  // Kiểm tra xem từ khóa có được nhập không
  if (keyword) {
    // Chuyển hướng trang với query parameter
    window.location.href = `search.html?query=${encodedQuery}`;
  } else {
    // Nếu không có từ khóa, xử lý tùy thuộc vào yêu cầu của bạn
    // Ví dụ: Hiển thị thông báo lỗi hoặc không thực hiện chuyển hướng
    alert("Vui lòng nhập từ khóa tìm kiếm.");
  }
});

// ======================= LẤY THÔNG TIN TRENDING =====================
const getTrendings = async () => {
  try {
    const res = await axios.get(apiTrending);

    const listProduct = res.data.results;
    console.log(
      "🚀 ~ file: main.js:11 ~ getTrendings ~ listProduct:",
      listProduct
    );

    const productTemplates = listProduct
      .map(
        (item) =>
          `  
      
          
          <a href="${
            item.media_type === "movie"
              ? `./detail-movie.html?id=${item.id}`
              : `./detail-tv.html?id=${item.id}`
          }" class="item-product">
        
          <div class="product-item--img">
            <img
              src="http://image.tmdb.org/t/p/w500/${item?.poster_path}"
              alt=""
            />
            <div class="percent">
              <span class="percent-title"> 89<sup>%</sup> </span>
            </div>
          </div>
          <div class="product-content">
            <h4 class="product-title">${item?.name || item?.title}</h4>
            <span class="product-time">${
              item?.first_air_date || item?.release_date
            }</span>
          </div>
        </a>`
      )
      .join("");
    const container = document.getElementById("trending");
    container.innerHTML = productTemplates;
  } catch (error) {
    console.log("🚀 ~ file: app.js:7 ~ getProducts ~ error:", error);
  }
};
getTrendings();

// ======================= LẤY THÔNG TIN TRENDING =====================
const getPopular = async () => {
  try {
    const res = await axios.get(apiPopular);

    const listProduct = res.data.results;
    console.log("🚀 ~ file: main.js:100 ~ getPopular ~ listProduct:", listProduct)

    const productTemplates = listProduct
      .map(
        (item) =>
          `  <a href="./detail-movie.html?id=${item.id}" class="item-product">
            <div class="product-item--img">
              <img
                src="http://image.tmdb.org/t/p/w500/${item?.poster_path}"
                alt=""
              />
              <div class="percent">
                <span class="percent-title"> 89<sup>%</sup> </span>
              </div>
            </div>
            <div class="product-content">
              <h4 class="product-title">${item?.name || item?.title}</h4>
              <span class="product-time">${
                item?.first_air_date || item?.release_date
              }</span>
            </div>
          </a>`
      )
      .join("");
    const container = document.getElementById("popular");
    container.innerHTML = productTemplates;
  } catch (error) {
    console.log("🚀 ~ file: app.js:7 ~ getProducts ~ error:", error);
  }
};
getPopular();



// =================== toggle menu ============= 
const iconMenu = document.getElementById('icon-menu-mobile')
const menuRp = document.getElementById('menu-rp')

iconMenu.addEventListener('click', function() {
  // Kiểm tra xem menu đang hiển thị hay không
  const isMenuVisible = menuRp.style.display === 'block' || getComputedStyle(menuRp).display === 'block';

  // Nếu menu đang hiển thị, ẩn nó đi; nếu không, hiển thị menu
  if (isMenuVisible) {
    menuRp.style.display = 'none';
  } else {
    menuRp.style.display = 'block';
  }
});
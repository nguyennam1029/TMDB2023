const apiKey = "ef138d2e438f48c0910e6806f5b0fce1"
const apiTrending = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;
const apiPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

// ======================= LẤY THÔNG TIN TRENDING =====================
const getTrendings = async () => {
  try {
    const res = await axios.get(apiTrending);

    const listProduct = res.data.results;
    console.log("🚀 ~ file: main.js:11 ~ getTrendings ~ listProduct:", listProduct)
    
    const productTemplates = listProduct
      .map(
        (item) =>
        
          `  
      
          
          <a href="${item.media_type === 'movie' ? `./detail-movie.html?id=${item.id}` : `./detail-tv.html?id=${item.id}`}" class="item-product">
        
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
            <span class="product-time">${item?.first_air_date || item?.release_date}</span>
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
     
      const productTemplates = listProduct
        .map(
          (item) =>
            `  <a href="${item.media_type === 'movie' ? `./detail-movie.html?id=${item.id}` : `./detail-tv.html?id=${item.id}`}" class="item-product">
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
              <span class="product-time">${item?.first_air_date || item?.release_date}</span>
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
api key : ef138d2e438f48c0910e6806f5b0fce1
trending: https://api.themoviedb.org/3/trending/all/day?api_key=ef138d2e438f48c0910e6806f5b0fce1
popular: https://api.themoviedb.org/3/movie/popular?api_key=ef138d2e438f48c0910e6806f5b0fce1
image: http://image.tmdb.org/t/p/w500/voHUmluYmKyleFkTu3lOXQG702u.jpg ( poster_path )
cast : https://api.themoviedb.org/3/movie/926393/credits?api_key=ef138d2e438f48c0910e6806f5b0fce1
search : https://api.themoviedb.org/3/search/movie?api_key=ef138d2e438f48c0910e6806f5b0fce1&query=The Equalizer 3

const castTemplates = castResponse?.cast
      .map(
        (item) =>
        
          `           
          <div class="performer ">
                <img
                src="http://image.tmdb.org/t/p/w500/${item?.profile_path}"

                  class="performer-image"
                />
                <div class="performer-info">
                  <h2 class="performer-info--name">${item?.name}</h2>
                  <span class="performer-info--des"
                    >섹스 소녀 12, 이모의 유혹 3, 화끈한 미용실</span
                  >
                </div>
              </div>`
      )
      .join("");
   
    const containerCast = document.getElementById("cast-detail");
  
    containerCast.innerHTML = castTemplates;
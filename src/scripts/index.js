//Api-Key//
const apikey="d662ec7e13c6421b83b1d0a7204cd478";
var article_area=document.getElementById("news-articles");
//Function to have formatted NEWS//
function getNews(news){
  let output="";
  if(news.totalResults>0){
    news.articles.forEach(ind=>{
      output+= 
        ` <section class="container">
          <li class="article"><a class="article-link" href="${ind.url}" target="_blank">
          <div class="img_area">
          <img src="${ind.urlToImage}" class="article-img" alt="${ind.title}"></img>
          </div>
          <h2 class="article-title">${ind.title}</h2>
          <p class="article-description">${ind.description || "Description not available"}</p> <br>
          <span class="article-author">-${ind.author? ind.author: "Anon"}</span><br>
          </a>
          </li>
          </section>
        `;
    });
    article_area.innerHTML=output;
  }
  else
  { 
    article_area.innerHTML='<li class="not-found">No article was found based on the search.</li>';
  }
};
// Function to retreive news using Fetch API with Await//
async function retreive(searchValueText=""){

    article_area.innerHTML='<p class="load">News are Loading...</p>';
    
    if(searchValueText!=""){
      url=`https://newsapi.org/v2/everything?q=${searchValueText}&apiKey=${apikey}`;
    }
    else
    {
      url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`;
    }
    const response=await fetch(url);
    const result=await response.json();
    getNews(result);
}
//Get text value from Searchbar and pass to retreive function//
async function searchvalue(e){  
    if (event.which === 13 || event.keyCode === 13 || event.key === "Enter")
     {
      retreive(e.target.value);
     }
};
//Attached Event listener for Searchbar to retreive text from Searchbar//
function start(){
  document.getElementById("search").addEventListener('keypress',searchvalue);
  retreive();
}
//Initializing Function//
(function(){
  start();}
)();

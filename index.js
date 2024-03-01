let btn = document.getElementById("searchbtn");
let movieList = [];

let btndata=[]

btn.addEventListener("click", function () {
  let search = document.getElementById("searchbar").value;

  if(search===""){
    alert("please enter movie name")
  }else{
    searchbar();
  }
  
});

function searchbar() {
  let search = document.getElementById("searchbar").value;
  fetchdata(search);
}

function fetchdata(searchText) {
  
  let url = `https://www.omdbapi.com/?apikey=1b63fddf&s=avengers`;


    if(searchText===undefined){
       
      fetch(url).then(function(response){
         let data =response.json()
         return data
      }).then(function(data){
         console.log(data.Search)
         movieList=data.Search
         display(movieList)
      }).catch(function(err){
        console.log(err)
      })
    }else{  
      fetch(`https://www.omdbapi.com/?apikey=1b63fddf&s=${searchText}`).then(function(response){
        let data =response.json()
        return data
     }).then(function(data){
        console.log(data.Search)
        movieList=data.Search
        display(movieList)
     }).catch(function(err){
       console.log(err)
     })

    }


}

fetchdata();

function display(data) {
    document.getElementById("container").innerHTML = null;
  data.forEach(function (element, index) {
    let divcont = document.createElement("div");
    divcont.setAttribute("class","card")
    divcont.setAttribute("class", "card");

    let poster = document.createElement("img");
    poster.setAttribute("src", element.Poster);

    let tittle = document.createElement("h3");
    tittle.innerText = element.Title;

    let year = document.createElement("h2");
    year.innerText = element.Year;

    let type=document.createElement("p")
    type.innerText=element.Type.toUpperCase()

   

    let rating=document.createElement("a")
    rating.setAttribute("href",`https://www.imdb.com/title/${element.imdbID}/`)
    rating.setAttribute("target","_blank")
    rating.innerHTML=`Check IMDb rating`
    

    divcont.append(poster, tittle, year,type,rating);
    document.getElementById("container").append(divcont);
  });
}

let filterdata=document.getElementById("filter")

filterdata.addEventListener("change",function(){
    
    if(filterdata.value==="New to oldest"){
let copyMovieList = [...movieList]
        let shortedMovieList = copyMovieList.sort((a,b)=> b.Year-a.Year)
        display(shortedMovieList)
    }else if(filterdata.value==="Oldest to New"){
        let copyMovieList = [...movieList]
        let shortedMovieList = copyMovieList.sort((a,b)=> a.Year-b.Year)
        display(shortedMovieList)
    } else {
        display(movieList)
    }
        
     console.log(movieList)
})

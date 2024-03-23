const apikey = 'e53590405c1b467683489781bcb0f19d';
const container  = document.getElementById("container");
const serachField = document.querySelector("input");
const btn = document.querySelector("#btn");
const getArticle = async () => {
    try{
        const url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=15&apiKey=${apikey}`
        let response  = await fetch(url);
        let data = await response.json();
        return data.articles;
    }catch(error){
        console.log("There is an error", error);
        return [];
    }
}

btn.addEventListener("click", async () => {
    const query = serachField.value.trim();
    if(query !== ""){
        try{
            const articles = await fetchQuery(query);
            display(articles);
        }catch(error){
            console.log("Error in query", error)
        }
    }
});

fetchQuery = async (query) => {
    try{
        const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=15&apiKey=${apikey}`
        let response  = await fetch(url);
        let data = await response.json();
        return data.articles;
    }catch(error){
        console.log("There is an error", error);
        return [];
    }
}

const display = (articles) => {
    container.innerHTML ="";
    articles.forEach((article)=>{
        const blog = document.createElement("div");
        blog.classList.add("cnt-box");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncT = article.title.length > 40 ? article.title.slice(0,40) + "...": article.title;
        title.innerHTML = truncT;
        const p = document.createElement("p");
        // const truncD = p.title.length > 130 ? article.title.slice(0,130) + "....": p.title;
        p.textContent = article.title;

        blog.appendChild(img);
        blog.appendChild(title);
        blog.appendChild(p);
        blog.addEventListener("click" ,() => {
            window.open(article.url, "_blank");
        })
        container.appendChild(blog);

    })
}

(async () => {
    try{
        let article = await getArticle()
        display(article);
    }catch(error){
        console.log("There is an error", error);
    }
})()
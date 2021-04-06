const URL = 'http://localhost:9090/articles';
const ADDTOCARTBUTTONS = document.getElementsByClassName("button-article")

let articles;
let searchBeers = '';


//API REQUEST
const fetchArticles = async() => {
    articles = await fetch(URL)
        .then(res => res.json());
};

const showArticles = async() => {
    await fetchArticles();

    document.getElementById('products').innerHTML = (
        articles
            .filter(article => article.designation.includes(searchBeers))
            .map(article => (
                `
                <div class="m-auto">
                    <div class="card m-3 p-1"  style="width: 18rem;">
                        <img class="card-img-top" src="img/${article.image}" width="160" alt="Card image cap">
                        <div class="card-body m-1">
                            <h1 id="productName" class="article-name card-title title-article">${article.designation.substr(0,1).toUpperCase()}${article.designation.substr(1,30)}</h1>   
                            <h5 class="price-article card-price">${article.prix}0 € TTC</h5>                    
                        </div>
                        <div class="m-auto">
                            <button class="btn btn-success button-article">Ajouter au panier</button>                    
                        </div>
                    </div>
                </div>
                `
            )).join('')
    )


    for (var i = 0; i < ADDTOCARTBUTTONS.length; i++) {
        var button = ADDTOCARTBUTTONS[i]
        button.addEventListener('click', addToCartClicked)
    }
};
showArticles();

// INPUT SETUP
document.getElementById('search').addEventListener('input', (e) => {searchBeers = e.target.value;
    showArticles();
    //console.log(e.target.value);
})

function sendData(idProduct) {
    sessionStorage.setItem("id", idProduct);
    //document.getElementById("qteProduct").innerHTML += `1`;
}
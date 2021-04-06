let details = localStorage.getItem('id');
const URL = 'http://localhost:9090/commandes/' + details;
const searchInput = document.getElementById('search');
let orders;
let searchOrders = '';

//API REQUEST
const fetchOrders = async() => {
    orders = await fetch(URL)
        .then(res => res.json());
    console.log(orders);
    console.log(orders.lignes);
};
//fetchOrders();

const showOrders = async() => {
    await fetchOrders();

    document.getElementById('order').innerHTML = (
        orders.lignes
            .filter(order => order.article.designation.includes(searchOrders))
            .map(order => (
                `
                <tr>
                    <th scope="row">${order.article.designation.substr(0,1).toUpperCase()}${order.article.designation.substr(1,30)}</th>
                    <td>${order.article.prix} €</td>
                    <td>${order.quantite}</td>   
                    <td>${order.total} €</td>                 
                </tr>
                `
            )).join('')
    )

    document.getElementById('orderAmount').innerHTML = orders.total + "€";



};
showOrders();

// INPUT SETUP
searchInput.addEventListener('input', (e) => {searchOrders = e.target.value;
    showOrders();
    //console.log(e.target.value);
})
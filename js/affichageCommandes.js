const URL = 'http://localhost:9090/commandes';
const SEARCHINPUT = document.getElementById('search');
const RESULTS = document.getElementById('orders');

let orders;
let searchOrders = '';

//API REQUEST
const fetchOrders = async() => {
    orders = await fetch(URL)
        .then(res => res.json());
        console.log(orders);
};
//fetchOrders();

const showOrders = async() => {
    await fetchOrders();

    RESULTS.innerHTML = (
        orders
            .filter(order => order.date.includes(searchOrders))
            .map(order => (
                `
                <tr>
                    <th scope="row">${order.id}</th>
                    <td>${order.date.substr(0,10)}</td>
                    <td>${order.total} €</td>
                    <td><a href="detail.html" onclick="sendData(${order.id})">Voir détail</a></td>
                </tr>
                `
            )).join('')
    )
};
showOrders();

// INPUT SETUP
SEARCHINPUT.addEventListener('input', (e) => {searchOrders = e.target.value;
    showOrders();
    //console.log(e.target.value);
})

function sendData(commande){
    localStorage.setItem('id', commande);
}
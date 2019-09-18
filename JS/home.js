const BASE_URI = 'http://localhost:3000'

// fetch product from database
async function fetchProducts() {
    const response = await fetch(`${BASE_URI}/products`)
    const products = await response.json()
    populateProducts(products)
}

fetchProducts()


// get all site elements
const relatedProducts = $('#related-product');

//function to help print data on page
function formatAndAppend(product) {

    relatedProducts.append(`
    <div class=" col-md-3 product-item">
        <div  class="pi-pic">
            <img src="${product.imageLink}" alt="">
            <div class="pi-links">
                <a href="" class="add-card"><i class="flaticon-bag"></i><span>Update Product</span></a>
                <a href="#" class="wishlist-btn"><i class="flaticon-heart"></i></a>
            </div>
        </div>
        <div class="pi-text">
            <h6>${product.price}</h6>
        </div>
        <p>${product.name} </p>
    </div>			 
`);
}


// get data and populate our page with data
const populateProducts = products => {
    for (let i = 0; i < products.length; i++) {
        if (i !== 4) {

            formatAndAppend(products[i])

        } else break;

    }

    // const displayRelatedproducts = document.querySelector('.display-products');

    // displayproducts.innerHTML += formatedproducts.join('');
};


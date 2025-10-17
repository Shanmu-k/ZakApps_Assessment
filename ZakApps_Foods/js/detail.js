// products Details page & Add card and Remove Cart 

document.addEventListener("DOMContentLoaded",()=>{

    const detailContainer = document.getElementById('product-detail');
    const cartCountElement = document.querySelector('.cart-count');

    // update Card count
    function updateCartCount(){
        const count = localStorage.getItem('zak_card_count') || 0;
        cartCountElement.textContent =count;
    }

    // addcart 

    function addToCart(){
        let count =Number(localStorage.getItem('zak_card_count')) || 0 ;
        count++;
        localStorage.setItem("zak_card_count",count) ;
        updateCartCount();
    }

    // get product id

    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id"));

    // matched product

    const product =PRODUCTS.find((item) => item.id === productId);

    if(!product){
        detailContainer.innerHTML =`
        <div class="not-found">
            <h2> Product Not Found </h2>
            <p> We Couldn't Find the item. Please go back to the products page.</p>
            <a href="products.html"> Back To Products</a>
        </div>
        `;
        return;
    }

    detailContainer.innerHTML =`
    <div class="detail-wrapper">
      <div class="detail-image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="detail-info">
        <h1>${product.name}</h1>
        <div class="meta">
          <p class="price">Price: <span>₹${product.price}</span></p>
          <p class="rating">Rating: ${"⭐".repeat(Math.round(product.rating))} (${product.rating})</p>
          <p class="type">Type: ${product.type}</p>
        </div>

        <div class="buttons">
          <button id="addCartBtn" class="btn-add">Add to Cart</button>
          <button id="buyNowBtn" class="btn alt">Buy Now</button>
        </div>
      </div>
    </div>
  `;

//   add cart btn

    const addcartBtn = document.getElementById('addCartBtn');

    addcartBtn.addEventListener("click",()=>{
        addToCart();

         // Save last added item
        localStorage.setItem(
            "zak_last_added",
            JSON.stringify({
                id:product.id,
                name:product.name,
                price:product.price,
            })
        );
    })

    // Buy now btn

    const buyNowBtn =document.getElementById("buyNowBtn");

    buyNowBtn.addEventListener("click",()=>{
        addToCart();

        const order = {
            id:product.id,
            name: product.name,
            price: product.price,
            date:new Date().toLocaleString(),
        };

        localStorage.setItem('zak_last_order',JSON.stringify(order));
        window.location.href = "order-Placed.html";
    });

    // initial cart count
    updateCartCount();
})


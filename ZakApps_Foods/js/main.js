// javascript code for products & filters 

document.addEventListener("DOMContentLoaded",()=>{


// Get the elements 

const grid= document.getElementById('products-grid');
const search = document.getElementById('search') ;
const ratingSelect=document.getElementById('rating-filter');
const sortSelect =document.getElementById('sort-filter');
const appltBtn=document.getElementById('apply-filter');
const clearBtn=document.getElementById('clear-filter');
const typeChecks= document.querySelectorAll('.filter-check');
const resultInfo =document.getElementById('result-info');

let products = PRODUCTS.slice();

// Product Rendering
function renderProducts(list){
    grid.innerHTML='';

    if(!list.length){
        grid.innerHTML=`<p class="no-results">No Products Found</p>`;
        resultInfo.textContent='0 Results';
        return
    }

    resultInfo.textContent=`${list.length} - Result Found`

    list.forEach((pro) => {
        const card = document.createElement('div');
        card.classList.add('product-card') ;

        card.innerHTML = `
            <img src="${pro.image}" alt="${pro.name}" width="280" height="180">
            <h3>${pro.name}</h3>
            <p class="price">${pro.price}</p>
            <p class="rating">${"⭐".repeat(Math.round(pro.rating))} (${pro.rating})</p>
            <button class="btn-view" data-id="${pro.id}"> View Details </button>
        `;

      const btn = card.querySelector(".btn-view");
      btn.addEventListener("click", ()=>{
        window.location.href = `products-detail.html?id=${pro.id}`
      });

        grid.appendChild(card);
    })
}

// Apply Filter 

function applyFilter(){
    let filtered = PRODUCTS.slice();

    // Search

    const query = search.value.toLowerCase().trim()

    if(query)
        filtered =filtered.filter((p) => p.name.toLowerCase().includes(query));

    // Rating 

    const minrating =parseFloat(ratingSelect.value);
    if(minrating > 0) 
        filtered =filtered.filter((p) =>p.rating >=minrating) 

    // type 
    const selectedTypes =Array.from(typeChecks)
    .filter((c)=> c.checked).map((c)=> c.value);

    if(selectedTypes.length) filtered=filtered.filter((p) => selectedTypes.includes(p.type))

    // Sorting
    const sortValue = sortSelect.value;
    if(sortValue ==="price-asc") filtered.sort((a,b) => a.price - b.price);
    else if(sortValue === "price-desc") filtered.sort((a,b) => b.price -a.price)
    else if(sortValue === "rating-desc") filtered.sort((a,b)=> b.rating -a.rating) 

    renderProducts(filtered);
}


// Event for Apply and clear 

appltBtn.addEventListener('click', applyFilter);

clearBtn.addEventListener('click', ()=>{
    search.value="";
    ratingSelect.value=0;
    sortSelect.value="feature";
    typeChecks.forEach((c)=> (c.checked = true));

    renderProducts(PRODUCTS)
})

// Auto search whilte typing

let debounce;

search.addEventListener("input",()=>{
    clearTimeout(debounce)
    debounce=setTimeout(applyFilter, 300);
})



// Intial rendering 

renderProducts(products);


});
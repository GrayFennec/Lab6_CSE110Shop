// Script.js

let cart;

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem("URLData") == null){
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => localStorage.setItem("URLdata", JSON.stringify(data)));
    //console.log("Getting store products")
  }else{
    //console.log("Already have store products")
  }
  let data = JSON.parse(localStorage.getItem("URLdata"));
  if(localStorage.getItem("Cart" != null)){
    cart = new Set(JSON.parse(localStorage.getItem("Cart")));
  }else{
    cart = new Set();
  }
  //console.log(data);
  let plist = document.getElementById('product-list')
  for(var i = 0; i < data.length; ++i){
    let element = data[i];
    let pitem = document.createElement('product-item');
    pitem.setAttribute('imgsrc', element.image);
    pitem.setAttribute('title', element.title);
    pitem.setAttribute('price', element.price);
    pitem.setAttribute('data-cartid', element.id);
    if(cart.has(element.id)){
      pitem.changeButtonText("Remove from Cart");
    }
    plist.appendChild(pitem);
  }
});


function productButtonClick(button, cartid) {
  let cartcount = document.getElementById('cart-count');
  //console.log(button.innerHTML);
  if(button.innerHTML === "Add to Cart"){
    alert("Added to Cart!");
    cart.add(cartid);
    button.innerHTML = "Remove from Cart";
  }else{
    cart.delete(cartid)
    button.innerHTML = "Add to Cart";
  }
  //console.log(cartid);
  cartcount.innerHTML = cart.size;
  localStorage.setItem("Cart", JSON.stringify(Array.from(cart)));
}


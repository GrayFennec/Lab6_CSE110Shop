// product-item.js

class ProductItem extends HTMLElement {
  static get observedAttributes(){
    return ['imgsrc', 'title', 'price', 'data-cartid'];
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    let shadow = this.shadowRoot;
    //Base List Element
    const product = document.createElement('li');
    product.setAttribute('class', 'product');
    shadow.appendChild(product);
    //Image
    const img = document.createElement('img');
    product.appendChild(img);
    //Title
    const title = document.createElement('p');
    title.setAttribute('class', 'title');
    product.appendChild(title);
    //Price
    const price = document.createElement('p');
    price.setAttribute('class', 'price');
    product.appendChild(price);
    //Button
    const button = document.createElement('button');
    button.setAttribute('onclick', 'productButtonClick(this, this.parentElement.dataset.cartid)');
    button.innerHTML = "Add to Cart";
    product.appendChild(button);
    //Styling
    let style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `
    shadow.appendChild(style);
  }
  attributeChangedCallback(name, oldValue, newValue){
    let product = this.shadowRoot.firstChild;
    let img = product.getElementsByTagName('img')[0];
    let title = product.getElementsByClassName('title')[0];
    let price = product.getElementsByClassName('price')[0];
    product.dataset.cartid = this.getAttribute('data-cartid');
    img.src = this.getAttribute('imgsrc');
    img.alt = this.getAttribute('title');
    title.innerHTML = this.getAttribute('title');
    price.innerHTML = "$" + this.getAttribute('price');
  }
  changeButtonText(newText){
    let button = this.shadowRoot.firstChild.getElementsByTagName('button')[0];
    button.innerHTML = newText;
  }
}

customElements.define('product-item', ProductItem);
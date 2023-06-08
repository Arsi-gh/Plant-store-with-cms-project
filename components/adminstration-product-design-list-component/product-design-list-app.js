import {displayEditProdPage , supabase } from "./../../adminPage/admin-app.js"

let template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="/components/adminstration-product-design-list-component/product-design-list-style.css">
<div class="product">
<span></span>
<h3 class="product-name"></h3>
<h4 class="product-price"></h4>
<img class="product-img" src="" alt="">
<div class="product-controls">    
    <button class="product-edit-btn">
      Edit
      <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="product-delete-btn">
      Delete
      <i class="fa-solid fa-trash"></i>
    </button>
</div>
</div>
`;

class ProductList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {

    let prodIndex = this.shadowRoot.querySelector("span");
    prodIndex.innerHTML = `Index : ${this.getAttribute("index")}`;

    let prodName = this.shadowRoot.querySelector(".product-name");
    prodName.innerHTML = `Name : ${this.getAttribute("prod-name")}`;
    this.dataset.productName = this.getAttribute("prod-name")
    
    let prodPrice = this.shadowRoot.querySelector(".product-price");
    prodPrice.innerHTML = `Price : ${this.getAttribute("prod-price")} $`;
    this.dataset.prodPrice = this.getAttribute("prod-price")
    
    let prodImg = this.shadowRoot.querySelector(".product-img");
    prodImg.src = this.getAttribute("img-src");
    this.dataset.prodImg = this.getAttribute("img-src")

    let editProdBtn = this.shadowRoot.querySelector(".product-edit-btn")
    editProdBtn.addEventListener('click' , () => {
    })

    let deleteProductBtn = this.shadowRoot.querySelector(".product-delete-btn")
    deleteProductBtn.addEventListener('click' , () => {
      const deleteProdFn = async () => {
        
        const { data , error } = await supabase
        .from('product')
        .delete()
        .eq('name' , this.dataset.productName)
        
        if (error){
          console.log(error)
        }
        if (data){
          console.log(data)
          location.href = location.href
        }
        
      }
      deleteProdFn()
    })

    let editProductBtn = this.shadowRoot.querySelector(".product-edit-btn")
    editProductBtn.addEventListener('click' , () => {
      displayEditProdPage(this.dataset.productName , +this.dataset.prodPrice , this.dataset.prodImg)
    })
  }

  static observedAttributes() {
    ["index", "prod-name", "prod-price", "img-src"];
  }
}

export { ProductList };

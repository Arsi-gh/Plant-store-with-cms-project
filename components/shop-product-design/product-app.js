let template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="./../../components/shop-product-design/product-style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<section class="shop-item">
    <img src="" alt="">
    <div class="prod-desc">
        <p class="prod-name"></p>
        <p class="prod-price"></p>
    </div>
    <button>
    Add To Basket
    <i class="fa-solid fa-cart-shopping"></i>
    </button>
</section>
`;

class ProdItem extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    let img = this.shadowRoot.querySelector("img");
    img.src = this.getAttribute("img-src");

    let prodName = this.shadowRoot.querySelector(".prod-name");
    prodName.innerHTML = this.getAttribute("product-name");

    let prodPrice = this.shadowRoot.querySelector(".prod-price");
    prodPrice.innerHTML = this.getAttribute("product-price") + ' $';

    this.dataset.name = this.getAttribute("product-name")
    this.dataset.price = this.getAttribute("product-price")
    this.dataset.img = this.getAttribute("img-src")
  }

  static observedAttributes() {
    return ["img-src", "product-name", "product-price"];
  }
}

export { ProdItem };

import { basketTotalPrice , modifyBasketPrice , modifyBasketLength , basketNotifFn} from "../../main-page/main-app.js"

let template = document.createElement('template')
template.innerHTML = 
`
<link rel="stylesheet" href="./../../components/basket-product-design-component/basket-product-style.css">
<div class="user-basket-prod">
<p class="user-basket-prod-name">heelo</p>
<p class="user-basket-prod-price">20$</p>
<img class="user-basket-prod-img" src="" alt="">
<input type="number" min="1" max="10" value="1">
<button class="user-basket-prod-delete">Delete</button>
</div>

`

class BasketProd extends HTMLElement {
    constructor () {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    
    connectedCallback () {
        let prodName = this.shadowRoot.querySelector('.user-basket-prod-name')
        prodName.innerHTML = this.getAttribute('prod-name')
        
        let container = this.shadowRoot.querySelector('.user-basket-prod')
        container.dataset.price = this.getAttribute('prod-price')
        container.dataset.name = this.getAttribute('prod-name')
        
        let prodPrice = this.shadowRoot.querySelector('.user-basket-prod-price')
        prodPrice.innerHTML = `${this.getAttribute('prod-price')} $`

        let prodImg = this.shadowRoot.querySelector('.user-basket-prod-img')
        prodImg.src = this.getAttribute('prodImg')
        
        let prodInput = this.shadowRoot.querySelector('input')
        prodInput.addEventListener('input' , (event) => {
            let inputValue = +event.target.value 
            let newPrice = inputValue * +container.dataset.price
            let basketPrice = basketTotalPrice
            let newBasketPrice = (basketPrice - Number(prodPrice.innerHTML.slice(0 , -2))) + newPrice
            prodPrice.innerHTML = `${newPrice} $`
            modifyBasketPrice(newBasketPrice)   
        })
        
        let prodDeletBtn = this.shadowRoot.querySelector('.user-basket-prod-delete')
        prodDeletBtn.addEventListener('click' , () => {
            let basketPrice = basketTotalPrice
            let newBasketPrice = basketPrice - Number(prodPrice.innerHTML.slice(0 , -2))
            modifyBasketLength()
            modifyBasketPrice(newBasketPrice)
            this.remove()
        })
    }

    static observedAttribute () {
        return ['prod-name' , 'prod-price' , 'prodImg']
    }
}

export {BasketProd}
import { ProdItem } from "../components/shop-product-design/product-app.js"
import { BasketProd } from "../components/basket-product-design-component/basket-product-app.js";
import { supabase } from "../config/supabase.js"

window.customElements.define("shop-prod" , ProdItem)
window.customElements.define("basket-prod" , BasketProd)

const $ = document

//Navbar variables
const navSearchBtn = $.querySelector('.fa-magnifying-glass')

// Slider variables
const slider = $.querySelector('.slider-img')
const sliderNextbtn = $.querySelector('.next-btn')
const sliderPrevBtn = $.querySelector('.prev-btn')
const sliderImgs = ['./images/1.avif' , './images/2.avif' , './images/3.avif']
let slideTurn = 0

const mainItemsCon = $.querySelector('.shop-items-con')

//Basket variables
const basketBtn = $.querySelector('.fa-cart-shopping')
const basketPage = $.querySelector('.user-basket')
const basketCloseBtn = $.querySelector('.fa-xmark')
const basketNotif = $.querySelector('.basket-notif')
const basketPriceTag = $.querySelector('.basket-total-price')
const registerBtn = $.querySelector('.finish-reg')
const basketBackGroundPage = $.querySelector('.modal-back-ground-page')
export let basketTotalPrice = 0
export let basketLength = 0

export function modifyBasketPrice (value){
    basketTotalPrice = value
    basketPriceTag.innerHTML = `${basketTotalPrice} $`
}

export function modifyBasketLength (){
    basketLength--
    basketNotifFn()
}

const generateSlide = () => {
    slider.src = sliderImgs[slideTurn]
}

const nextSlide = () => {
    if (slideTurn === sliderImgs.length - 1){    
        slideTurn = 0
        generateSlide()
    } else {
        ++slideTurn
        generateSlide()
    }
}

const prevSlide = () => {
    if (slideTurn === 0 ){
        slideTurn = sliderImgs.length - 1
        generateSlide()
    } else {
        --slideTurn
        generateSlide()
    }
}

const runSlider = () => {
    slider.src = sliderImgs[slideTurn]
    sliderNextbtn.addEventListener('click' , nextSlide)
    sliderPrevBtn.addEventListener('click' , prevSlide)
}

const addProdFn = () => {
    if (event.target.tagName == 'SHOP-PROD'){
        basketPage.insertAdjacentHTML('afterbegin' , `<basket-prod prod-name="${event.target.dataset.name}" prod-price="${event.target.dataset.price}" data-price="${event.target.dataset.price}" prodImg="${event.target.dataset.img}"></basket-prod>`)
        basketLength++
        basketNotifFn()
        basketPriceCalculation()
    }
}

export const basketNotifFn = () => {
    if (basketLength > 3){
        basketNotif.innerHTML = '+3'
    } else if (basketLength == 0){
        basketNotif.style.display = 'none'
        hideBasket()
    } else {
        basketNotif.style.display = 'grid'
        basketNotif.innerHTML = basketLength
    }
}

const displayBasket = () => {
    basketPage.style.display = 'flex'
    basketBackGroundPage.style.display = 'block'
}

const basketPriceCalculation = () => {
    let newProdPrice = +event.target.dataset.price
    basketTotalPrice += newProdPrice
    basketPriceTag.innerHTML = `${basketTotalPrice} $`
}

const hideBasket = () => {
    basketPage.style.display = 'none'
    basketBackGroundPage.style.display = 'none'
}

const generateProducts = async () => {
    const { data, error } = await supabase
    .from('product')
    .select()

    if (error){
        console.log(error)
    }

    if (data){
        data.forEach((prod) => {
            mainItemsCon.insertAdjacentHTML('beforeend' , `<shop-prod img-src="${prod.img}" product-name="${prod.name}" product-price="${prod.price}"></shop-prod>`)
        })
    }
}

window.addEventListener('load' , runSlider)
window.addEventListener('load' , generateProducts)
basketBtn.addEventListener('click' , displayBasket)
basketNotif.addEventListener('click' , displayBasket)
basketCloseBtn.addEventListener('click' , hideBasket)
mainItemsCon.addEventListener('click' , addProdFn)
basketBackGroundPage.addEventListener('click' , hideBasket)
registerBtn.addEventListener('click' , () => {
    location.href = location.href
})

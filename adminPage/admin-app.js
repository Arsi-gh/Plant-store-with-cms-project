import { ProductList } from "../components/adminstration-product-design-list-component/product-design-list-app.js";
import { User } from "../components/users-list-component/users.app.js";
import { supabase } from "../config/supabase.js"

window.customElements.define("list-prod", ProductList);
window.customElements.define("list-user", User);

const $ = document;


//base pages
const dashboardMenu = $.querySelector('.dashboard_items')
const mainPage = $.querySelector('main')

//pages and their button variables
const usersListPage = $.querySelector(".users-list-container");
const addProductPage = $.querySelector("form");
const productListPage = $.querySelector(".prod-container");
const usersListPageBtn = $.querySelector(".two");
const addProductPageBtn = $.querySelector(".four");
const productListPageBtn = $.querySelector(".three");
const sellsChartPage = $.querySelector("#selling-chart");
const sellsChartPageBtn = $.querySelector(".five");

// new product page contorl variables
const productNameInput = $.querySelector("#new-prod-name");
const productPriceInput = $.querySelector("#new-prod-price");
const productImgInput = $.querySelector("#new-prod-picture");
const productSubmitInput = $.querySelector("#submit-product");
const imgCon = $.querySelector('#img-preview')
const resetBtn = $.querySelector('.reset-page-btn')

//Selling charts page container
const canvas = $.querySelector("#selling-chart");
const mainCon = $.querySelector(".main-page");
const ctx = canvas.getContext("2d");

//Edit selected product page 
const editProdPage = $.querySelector('.edit-page')
const closeEditPageBtn = $.querySelector('.close-edit-page-btn')
const newProductPropName = $.querySelector('#new-prod-prop-name')
const newProductPropPrice = $.querySelector('#new-prod-prop-price')
const newProductPropImg = $.querySelector('#new-prod-prop-img')
const newProductPropSubmit = $.querySelector('.submit-new-prod')
const newProductPropReset = $.querySelector('.reset-inputs')
const newImagePreviewCon = $.querySelector('.edit-page-image-tag')
const pageBackground = $.querySelector('.modal-back-ground-page')

const togglePage = (currentPage) => {
  usersListPage.style.display = "none";
  addProductPage.style.display = "none";
  productListPage.style.display = "none";
  sellsChartPage.style.display = "none";
  currentPage.style.display = "flex";
};

const toggleBtn = (currentBtn) => {
  usersListPageBtn.classList.remove('activePage')
  addProductPageBtn.classList.remove('activePage')
  productListPageBtn.classList.remove('activePage')
  sellsChartPageBtn.classList.remove('activePage')
  currentBtn.classList.add('activePage')
}

const displayProdImg = () => {
  const reader  = new FileReader()
  const file = productImgInput.files[0]
  reader.addEventListener('load' , () => {
    imgCon.src = reader.result
  }, false)
  if (file){
    reader.readAsDataURL(file)
  }
}

const addProduct = async (event) => {
  event.preventDefault();
  let newProductName = productNameInput.value;
  let newProductPrice = +productPriceInput.value;
  let newProductImg = imgCon.src
  if (!newProductName || !newProductPrice || !newProductImg) {
    console.log("fill it please");
  } else {
    const insertData = async () => {
      const { data, error } = await supabase
      .from('product')
      .insert([{name : newProductName , price : newProductPrice , img : newProductImg}])
      if (error){
        console.log(error)
      }
      if (data){
        console.log(data)
      }
    }
    insertData()
  }
};

const resetEditPage = (event) => {
  event.preventDefault()
  productNameInput.value = ''
  productPriceInput.value = ''
  imgCon.src = ''
}

const displaySellChart = () => {
  canvas.height = mainCon.clientHeight;
  canvas.width = mainCon.clientWidth;
  let scale = Math.floor(mainCon.clientWidth / 10)
  let scaleSpace = scale / 1.5
  ctx.fillStyle = "#86c77f";
  for (let i = 1; i < 13; i++) {
    ctx.fillRect(scale, canvas.height - 500, 50, canvas.height);
    scale += scaleSpace;
  }
};

const displayEditProdPage = (prodName) => {
  pageBackground.style.display = 'block'
  editProdPage.style.display  = 'flex'
  newProductPropSubmit.addEventListener('click' , () => {
    uploadNewProdFn(prodName)
  })
  newProductPropReset.addEventListener('click' , resetEditPageFn)
  closeEditPageBtn.addEventListener('click' , hideEidtPage)
  newProductPropImg.addEventListener("input" , displayImagePreview)
  pageBackground.addEventListener('click' , hideEidtPage)
}

const displayImagePreview = () => {
  newImagePreviewCon.style.display = 'block'
  const reader  = new FileReader()
  const file = newProductPropImg.files[0]
  reader.addEventListener('load' , () => {
    newImagePreviewCon.src = reader.result
  }, false)
  if (file){
    reader.readAsDataURL(file)
  }
}

const hideEidtPage = () => {
  pageBackground.style.display = 'none'
  editProdPage.style.display  = 'none'
}

const generateDatasList = () => {

  //Products
  const getProdDatas = async () => {
    const { data, error } = await supabase
    .from('product')
    .select()
    
    if (error){
      console.log(error)
    }
    
    if (data){
      data.forEach( (prod , index) => {
        productListPage.insertAdjacentHTML('beforeend' , `<list-prod index="${index + 1}" prod-Name="${prod.name}" prod-Price="${prod.price}" img-src="${prod.img}"></list-prod>`)
      })
    }
  }
  getProdDatas()
  

  //Users
  getUserDatas()
}

const getUserDatas = async () => {
  const { data, error } = await supabase
  .from('users')
  .select()
  
  if (error){
    console.log(error)
  }
  
  if (data){
    data.forEach( (user) => {
      usersListPage.insertAdjacentHTML('beforeend' , `<list-user password="${user.password}" name="${user.name}" email="${user.email}"></list-user>`)
    })
  }
}

const uploadNewProdFn = async (prevProdName) => {
  let newProdName = newProductPropName.value
  let newProdPrice = +newProductPropPrice.value
  let newProdImage = newImagePreviewCon.src
  if (newProdImage && newProdPrice && newProdName){
    const { error } = await supabase
      .from('product')
      .update({ name: newProdName , price : newProdPrice , img : newProdImage })
      .eq('name' , prevProdName)

    if (error){
      console.log(error)
    } else {
      console.log('edited seuccessfuly')
    }
  }


}

const resetEditPageFn = () => {
  newProductPropName.value = ''
  newProductPropPrice.value = ''
  newProductPropImg.value = ''
  newImagePreviewCon.src = ''
  newImagePreviewCon.style.display = 'none'
}

window.addEventListener("load", () => {
  displaySellChart();

  window.addEventListener("resize", displaySellChart);

  usersListPageBtn.addEventListener("click", () => {
    togglePage(usersListPage);
    toggleBtn(usersListPageBtn)
  });

  addProductPageBtn.addEventListener("click", () => {
    togglePage(addProductPage);
    toggleBtn(addProductPageBtn)
  });

  productListPageBtn.addEventListener("click", () => {
    togglePage(productListPage);
    toggleBtn(productListPageBtn)
  });

  sellsChartPageBtn.addEventListener("click", () => {
    togglePage(sellsChartPage);
    toggleBtn(sellsChartPageBtn)
  });

  productSubmitInput.addEventListener("click", addProduct);
  productImgInput.addEventListener("input" , displayProdImg)
  resetBtn.addEventListener('click' , resetEditPage)

  generateDatasList()
});

export {supabase , getUserDatas , displayEditProdPage}
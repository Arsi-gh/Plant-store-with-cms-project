import { log } from "neo-async";
import { ProductList } from "../components/adminstration-product-design-list-component/product-design-list-app.js";
import { User } from "../components/users-list-component/users.app.js";
import { supabase } from "../config/supabase.js";

window.customElements.define("list-prod", ProductList);
window.customElements.define("list-user", User);

const $ = document;

//Base pages
const dashboardMenu = $.querySelector(".dashboard_items");
const mainPage = $.querySelector("main");

//Pages and their button
//Pages
const usersListPage = $.querySelector(".users-list-container");
const addProductPage = $.querySelector(".add-prod-page");
const productListPage = $.querySelector(".prod-container");
const transactionPage = $.querySelector(".transaction-page");
const notificationPage = $.querySelector(".notification-page");
const eventsPage = $.querySelector(".events-page");
const ticketsPage = $.querySelector(".tickets-page");
const tagPafe = $.querySelector(".tag-page");
const discountCodePage = $.querySelector(".discount-code-page");
const agentsPage = $.querySelector(".agents-page");
const staffPage = $.querySelector(".staff-page");
const allPages = [
  usersListPage,
  addProductPage,
  productListPage,
  transactionPage,
  notificationPage,
  eventsPage,
  ticketsPage,
  tagPafe,
  discountCodePage,
  agentsPage,
  staffPage,
];
//Their buttons
const usersListPageBtn = $.querySelector(".two");
const productListPageBtn = $.querySelector(".three");
const addProductPageBtn = $.querySelector(".four");
const sellsChartPageBtn = $.querySelector(".five");
const notifPageBtn = $.querySelector(".six");
const eventsPageBtn = $.querySelector(".seven");
const ticketsPageBtn = $.querySelector(".eight");
const tagPafeBtn = $.querySelector(".nine");
const discountCodePageBtn = $.querySelector(".ten");
const agentsPageBtn = $.querySelector(".eleven");
const staffPageBtn = $.querySelector(".twelve");
const allButtons = [
  usersListPageBtn,
  productListPageBtn,
  addProductPageBtn,
  sellsChartPageBtn,
  notifPageBtn,
  eventsPageBtn,
  ticketsPageBtn,
  tagPafeBtn,
  discountCodePageBtn,
  agentsPageBtn,
  staffPageBtn,
];

// new product page contorl
const productNameInput = $.querySelector("#new-prod-name");
const productPriceInput = $.querySelector("#new-prod-price");
const productImgInput = $.querySelector("#prod-image-input");
const prodTagSelection = $.querySelector("#prod-tag-selection");
const prodTagsContainer = $.querySelector(".prod-tags-container");
const productSubmitBtn = $.querySelector(".submit-product");
const prodImagePreview = $.querySelector(".prod-image-preview");
const prodImageIcon = $.querySelector(".image-icon")
const resetBtn = $.querySelector(".reset-page-btn");

//Edit selected products page
const editProdPage = $.querySelector(".edit-page");
const closeEditPageBtn = $.querySelector(".close-edit-page-btn");
const newProductPropName = $.querySelector("#new-prod-prop-name");
const newProductPropPrice = $.querySelector("#new-prod-prop-price");
const newProductPropImg = $.querySelector("#new-prod-prop-img");
const newProductPropSubmit = $.querySelector(".submit-new-prod");
const newProductPropReset = $.querySelector(".reset-inputs");
const newImagePreviewCon = $.querySelector(".edit-page-image-tag");
const pageBackground = $.querySelector(".modal-back-ground-page");

//Canvas variables
const transactionCanvasOne = $.querySelector("#transaction-chart-canvas-one");
const transactionCanvasTwo = $.querySelector("#transaction-chart-canvas-two");
const transactionCanvasThree = $.querySelector("#transaction-chart-canvas-three");

//Date element variable
const dateElem = $.querySelector(".date-elem");

//Craete tag variables
const tagsContainer = $.querySelector(".tags-container");
const tagNameInput = $.querySelector(".tag-name-input");
const tagDescInput = $.querySelector(".tag-desc-input");
const tagResetBtn = $.querySelector(".tag-reset-button");
const tagSubmitBtn = $.querySelector(".tag-submit-btn");

//Agent chart canvas
const agentChartCanvas = $.querySelector("#agent-canvas");

const togglePage = (currentPage) => {
  allPages.forEach((page) => {
    if (page === addProductPage) {
      page.style.display = "none";
    } else {
      page.classList.add("none");
    }
  });

  if (currentPage === addProductPage) {
    currentPage.style.display = "flex";
  } else {
    currentPage.classList.remove("none");
  }
};

const toggleBtn = (currentBtn) => {
  allButtons.forEach((btn) => {
    btn.classList.remove("activePage");
  });
  currentBtn.classList.add("activePage");
};

const displayProdImg = () => {
  prodImageIcon.style.display = 'none'
  prodImagePreview.style.display = 'block'
  const reader = new FileReader();
  const file = productImgInput.files[0];
  reader.addEventListener(
    "load",
    () => {
      prodImagePreview.src = reader.result;
    },
    false
  );
  if (file) {
    reader.readAsDataURL(file);
  }
};

const addProduct = async (event) => {
  event.preventDefault();
  let newProductName = productNameInput.value;
  let newProductPrice = +productPriceInput.value;
  let newProductImg = prodImagePreview.src;
  if (!newProductName || !newProductPrice || !newProductImg) {
    console.log("fill it please");
  } else {
    const insertData = async () => {
      const { data, error } = await supabase
        .from("product")
        .insert([
          { name: newProductName, price: newProductPrice, img: newProductImg },
        ]);
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
      }
    };
    insertData();
  }
};

const resetEditPage = (event) => {
  event.preventDefault();
  prodImagePreview.style.display = 'none'
  prodImageIcon.style.display = 'block'
  productNameInput.value = "";
  productPriceInput.value = "";
  prodImagePreview.src = "";
  prodTagsContainer.innerHTML = "";
};

const displayEditProdPage = (prodName, prodPrice, prodImage) => {
  pageBackground.style.display = "block";
  editProdPage.style.display = "flex";
  newProductPropSubmit.addEventListener("click", () => {
    uploadNewProdFn(prodName);
  });
  newProductPropName.value = prodName;
  newProductPropPrice.value = prodPrice;
  newImagePreviewCon.style.display = "block";
  newImagePreviewCon.src = prodImage;
  newProductPropReset.addEventListener("click", resetEditPageFn);
  closeEditPageBtn.addEventListener("click", hideEidtPage);
  newProductPropImg.addEventListener("input", displayImagePreview);
  pageBackground.addEventListener("click", hideEidtPage);
};

const displayImagePreview = () => {
  newImagePreviewCon.style.display = "block";
  const reader = new FileReader();
  const file = newProductPropImg.files[0];
  reader.addEventListener(
    "load",
    () => {
      newImagePreviewCon.src = reader.result;
    },
    false
  );
  if (file) {
    reader.readAsDataURL(file);
  }
};

const hideEidtPage = () => {
  pageBackground.style.display = "none";
  editProdPage.style.display = "none";
};

const generateDatasList = () => {
  //Products
  const getProdDatas = async () => {
    const { data, error } = await supabase.from("product").select();

    if (error) {
      console.log(error);
    }

    if (data) {
      data.forEach((prod, index) => {
        productListPage.insertAdjacentHTML(
          "beforeend",
          `<list-prod index="${index + 1}" prod-Name="${
            prod.name
          }" prod-Price="${prod.price}" img-src="${prod.img}"></list-prod>`
        );
      });
    }
  };
  getProdDatas();

  //Users
  getUserDatas();
};

const getUserDatas = async () => {
  const { data, error } = await supabase.from("users").select();

  if (error) {
    console.log(error);
  }

  if (data) {
    data.forEach((user) => {
      usersListPage.insertAdjacentHTML(
        "beforeend",
        `<list-user password="${user.password}" name="${user.name}" email="${user.email}"></list-user>`
      );
    });
  }
};

const uploadNewProdFn = async (prevProdName) => {
  let newProdName = newProductPropName.value;
  let newProdPrice = +newProductPropPrice.value;
  let newProdImage = newImagePreviewCon.src;
  if (newProdImage && newProdPrice && newProdName) {
    const { error } = await supabase
      .from("product")
      .update({ name: newProdName, price: newProdPrice, img: newProdImage })
      .eq("name", prevProdName);

    if (error) {
      console.log(error);
    } else {
      console.log("edited seuccessfuly");
    }
  }
};

const resetEditPageFn = () => {
  newProductPropName.value = "";
  newProductPropPrice.value = "";
  newProductPropImg.value = "";
  newImagePreviewCon.src = "";
  newImagePreviewCon.style.display = "none";
};

const dateUpdate = () => {
  const newDate = new Date();
  dateElem.innerHTML = `Today : ${newDate.toISOString().slice(0, 4)} / ${newDate
    .toISOString()
    .slice(5, 7)} / ${newDate.toISOString().slice(8, 10)}`;
};

const generateTransactionsCharts = () => {
  transactionCanvasOne;
  transactionCanvasOne;
  new Chart(transactionCanvasOne, {
    type: "line",
    data: {
      labels: ["july", "october", "june", "april"],
      datasets: [
        {
          label: "Orders price",
          data: [12_000_000, 19_000_400, 3_000_000, 8_500_000],
          borderWidth: 1,
          backgroundColor: ["#efefef", "#84a98c", "#517258", "#517559"],
        },
      ],
    },
  });

  new Chart(transactionCanvasTwo, {
    type: "bar",
    data: {
      labels: ["july", "october", "june", "april"],
      datasets: [
        {
          label: "Orders price",
          data: [12_000_000, 19_000_400, 3_000_000, 8_500_000],
          borderWidth: 1,
          backgroundColor: ["#efefef", "#84a98c", "#517258", "#517559"],
        },
      ],
    },
  });

  new Chart(transactionCanvasThree, {
    type: "doughnut",
    data: {
      labels: ["july", "october", "june", "april"],
      datasets: [
        {
          label: "Orders price",
          data: [12_000_000, 19_000_400, 3_000_000, 8_500_000],
          borderWidth: 1,
          backgroundColor: ["#efefef", "#84a98c", "#517258", "#517559"],
        },
      ],
    },
  });

  new Chart(agentChartCanvas, {
    type: "line",
    data: {
      labels: ["july", "october", "june", "april"],
      datasets: [
        {
          label: "Orders price",
          data: [12_000_000, 19_000_400, 3_000_000, 8_500_000],
          borderWidth: 1,
          backgroundColor: ["#efefef", "#84a98c", "#517258", "#517559"],
        },
      ],
    },
  });
};

const createTagFn = () => {
  if (tagNameInput.value) {
    tagsContainer.insertAdjacentHTML(
      "beforeend",
      `<div> ${tagNameInput.value} <i class="fa-regular fa-circle-xmark"></i></div>`
    );
  }
};

const helloWorld = () => {
  console.log('henkjlf')
}

const addProdTag = (event) => {
  prodTagsContainer.insertAdjacentHTML('beforeend' , `<div class="prod-tag"><p>${event.target.value}</p><i onclick="${helloWorld}" class="fa-regular fa-circle-xmark"></i></div>`)
}

window.addEventListener("load", () => {
  dateUpdate();
  generateTransactionsCharts();

  usersListPageBtn.addEventListener("click", () => {
    togglePage(usersListPage);
    toggleBtn(usersListPageBtn);
  });

  addProductPageBtn.addEventListener("click", () => {
    togglePage(addProductPage);
    toggleBtn(addProductPageBtn);
  });

  productListPageBtn.addEventListener("click", () => {
    togglePage(productListPage);
    toggleBtn(productListPageBtn);
  });

  sellsChartPageBtn.addEventListener("click", () => {
    togglePage(transactionPage, "grid");
    toggleBtn(sellsChartPageBtn);
  });

  notifPageBtn.addEventListener("click", () => {
    togglePage(notificationPage);
    toggleBtn(notifPageBtn);
  });

  eventsPageBtn.addEventListener("click", () => {
    togglePage(eventsPage);
    toggleBtn(eventsPageBtn);
  });

  ticketsPageBtn.addEventListener("click", () => {
    togglePage(ticketsPage);
    toggleBtn(ticketsPageBtn);
  });

  tagPafeBtn.addEventListener("click", () => {
    togglePage(tagPafe);
    toggleBtn(tagPafeBtn);
  });

  discountCodePageBtn.addEventListener("click", () => {
    togglePage(discountCodePage);
    toggleBtn(discountCodePageBtn);
  });

  agentsPageBtn.addEventListener("click", () => {
    togglePage(agentsPage);
    toggleBtn(agentsPageBtn);
  });

  staffPageBtn.addEventListener("click", () => {
    togglePage(staffPage);
    toggleBtn(staffPageBtn);
  });

  productSubmitBtn.addEventListener("click", addProduct);
  productImgInput.addEventListener("input", displayProdImg);
  resetBtn.addEventListener("click", resetEditPage);
  tagSubmitBtn.addEventListener("click", createTagFn);
  prodTagSelection.addEventListener("input" , addProdTag)

  generateDatasList();
});

export { supabase, getUserDatas, displayEditProdPage };
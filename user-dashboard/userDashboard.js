const $ = document;

// Pages and their button variables

const dashboard = $.querySelector(".user-dashboard");
const dashboardBtn = $.querySelector(".two");
const accountPage = $.querySelector(".user-account-page");
const accountPageBtn = $.querySelector(".three");
const shopcartPage = $.querySelector(".user-shopping-cart");
const shoppingBtn = $.querySelector(".four");
const inboxPage = $.querySelector(".inbox");
const inboxPageBtn = $.querySelector(".five");
const favoritesPage = $.querySelector(".favorite-page");
const favoritesPageBtn = $.querySelector(".six");
const subscriptionPage = $.querySelector(".subscription-page");
const subscriptionPageBtn = $.querySelector(".seven");
const latestBasketsPage = $.querySelector(".latest-baskets-page");
const latestBasketsPageBtn = $.querySelector(".eight");
const ticketPage = $.querySelector(".ticket-page");
const ticketPageBtn = $.querySelector(".nine");
const addressesPage = $.querySelector(".addresses-page");
const addressesPageBtn = $.querySelector(".ten");
const accBalancePage = $.querySelector(".account-balance-page");
const accBalancePageBtn = $.querySelector(".eleven");
const giftCardPage = $.querySelector(".gift-card-page");
const giftCardPageBtn = $.querySelector(".twelve");
const agentPage = $.querySelector('.become-agent-page')
const agentPageBtn = $.querySelector('.thirteen')

const allPages = [
  dashboard,
  accountPage,
  shopcartPage,
  inboxPage,
  favoritesPage,
  subscriptionPage,
  latestBasketsPage,
  ticketPage,
  addressesPage,
  accBalancePage,
  giftCardPage,
  agentPage
];
const allBtns = [
  dashboardBtn,
  accountPageBtn,
  shoppingBtn,
  inboxPageBtn,
  favoritesPageBtn,
  subscriptionPageBtn,
  latestBasketsPageBtn,
  ticketPageBtn,
  addressesPageBtn,
  accBalancePageBtn,
  giftCardPageBtn,
  agentPageBtn
];

const dashCtx = $.querySelector('#dash-transaction-chart')
const transFirstCtx = $.querySelector('#transaction-first-chart')
const transSecCtx = $.querySelector('#transaction-second-chart')

//Inbox page variables
let accordionStatus = false;
const accordinBtns = $.querySelectorAll(".accordin-btn");

//Acount page
const editAccountBtn = $.querySelector(".edit-account-btn");
const closeEditBtn = $.querySelector(".close-edit-page-btn");
const editAccountSection = $.querySelector(".user-edit-account-part");
let editPageDispalyStatus = false;

//Basket page variables 
const basketFirstPart = $.querySelector('.first-part')
const basketSecondPart = $.querySelector('.second-part')
const displayNextBaksetBtn = $.querySelector('.dispalyBasketNextSection')
const dispalyPrevBasketBtn = $.querySelector('.displayBasketPrevSection')

//Lastest products page 
const basketDetailBtns = $.querySelectorAll('.basket-detail-btn')

//agent page intro 
const agentIntroCtx = $.querySelector('#agent-page-canvas')

// Functions

const displayPage = (currentPage) => {
  allPages.forEach((page) => {
    page.classList.add("none");
  });
  currentPage.classList.remove("none");
};

const pageButtonsStyle = (btn) => {
  allBtns.forEach((button) => {
    button.classList.remove("activePage");
  });
  btn.classList.add("activePage");
};

const accordionMessageHandling = (event) => {
  accordionStatus = !accordionStatus;

  if (accordionStatus) {
    event.target.previousElementSibling.style.display = "block";
  } else {
    event.target.previousElementSibling.style.display = "none";
  }
};

const displayEditAccountPage = (status) => {
  editPageDispalyStatus = status

  if (editPageDispalyStatus) {
    editAccountSection.style.display = "flex";
  } else {
    editAccountSection.style.display = "none";
  }
};

const displayBasketSections = (page) => {
    basketFirstPart.style.display = 'none'
    basketSecondPart.style.display = 'none'
    page.style.display = 'grid'
}

const chartGeneratorFn = () => {
  new Chart(dashCtx, {
    type: 'doughnut',
    data: {
      labels: ['july', 'october', 'june', 'april'],
      datasets: [{
        label: 'Orders price',
        data: [12_000_000, 19_000_400, 3_000_000, 8_500_000],
        borderWidth: 1,
        backgroundColor : ['#efefef' , '#84a98c' , '#517258' , '#517559']
      }]
    },
  });

  new Chart(transFirstCtx, {
    type: 'line',
    data: {
      labels: ['july', 'october', 'june', 'april'],
      datasets: [{
        label: 'Orders price',
        data: [12_000_000, 19_000_400, 3_000_000, 8_500_000],
        borderWidth: 1,
        backgroundColor : ['#efefef' , '#84a98c' , '#517258' , '#517559']
      }]
    },
  });

  new Chart(transSecCtx, {
    type: 'bar',
    data: {
      labels: ['july', 'october', 'june', 'april' , 'september'],
      datasets: [{
        label: 'Orders price',
        data: [12_000_000, 19_000_400, 3_000_000, 8_500_000 , 30_000_000],
        borderWidth: 1,
        backgroundColor : ['#efefef' , '#84a98c' , '#517258' , '#517559']
      }]
    },
  });

  new Chart(agentIntroCtx, {
    type: 'bar',
    data: {
      labels: ['july', 'october', 'june', 'april' , 'september'],
      datasets: [{
        label: 'Average store sells in months',
        data: [12_000_000, 19_000_400, 3_000_000, 8_500_000 , 30_000_000],
        borderWidth: 1,
        backgroundColor : ['#efefef' , '#84a98c' , '#517258' , '#517559']
      }]
    },
  });
}

const showBasketDetail = (event) => {
  if (event.target.parentElement.nextElementSibling.classList[1]) {
    event.target.parentElement.nextElementSibling.classList.remove('none')
    event.target.innerText = 'Hide detailes'
  } else {
    event.target.parentElement.nextElementSibling.classList.add('none')
    event.target.innerText = 'See detailes'
  }
}

// Events handling

window.addEventListener('load' , () => {
  chartGeneratorFn()
})

dashboardBtn.addEventListener("click", () => {
  displayPage(dashboard);
  pageButtonsStyle(dashboardBtn);
});

accountPageBtn.addEventListener("click", () => {
  displayPage(accountPage);
  pageButtonsStyle(accountPageBtn);
});

shoppingBtn.addEventListener("click", () => {
  displayPage(shopcartPage);
  pageButtonsStyle(shoppingBtn);
});

inboxPageBtn.addEventListener("click", () => {
  displayPage(inboxPage);
  pageButtonsStyle(inboxPageBtn);
});

favoritesPageBtn.addEventListener("click", () => {
  displayPage(favoritesPage);
  pageButtonsStyle(favoritesPageBtn);
});

subscriptionPageBtn.addEventListener("click", () => {
  displayPage(subscriptionPage);
  pageButtonsStyle(subscriptionPageBtn);
});

latestBasketsPageBtn.addEventListener("click", () => {
  displayPage(latestBasketsPage);
  pageButtonsStyle(latestBasketsPageBtn);
});

ticketPageBtn.addEventListener("click", () => {
  displayPage(ticketPage);
  pageButtonsStyle(ticketPageBtn);
});

addressesPageBtn.addEventListener("click", () => {
  displayPage(addressesPage);
  pageButtonsStyle(addressesPageBtn);
});

accBalancePageBtn.addEventListener("click", () => {
  displayPage(accBalancePage);
  pageButtonsStyle(accBalancePageBtn);
});

giftCardPageBtn.addEventListener("click", () => {
  displayPage(giftCardPage);
  pageButtonsStyle(giftCardPageBtn);
});

agentPageBtn.addEventListener("click" , () => {
  displayPage(agentPage)
  pageButtonsStyle(agentPageBtn)
})

accordinBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    accordionMessageHandling(event);
  });
});

editAccountBtn.addEventListener('click' , () => {
    displayEditAccountPage(true)
})

closeEditBtn.addEventListener('click' , () => {
    displayEditAccountPage(false)
})

dispalyPrevBasketBtn.addEventListener('click' , () => {
    displayBasketSections(basketFirstPart)
})

displayNextBaksetBtn.addEventListener('click' , () => {
    displayBasketSections(basketSecondPart)
})

basketDetailBtns.forEach((button) => {
  button.addEventListener('click' , (event) => {
    showBasketDetail(event)
  })
})
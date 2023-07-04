/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./user-dashboard/userDashboard.js":
/*!*****************************************!*\
  !*** ./user-dashboard/userDashboard.js ***!
  \*****************************************/
/***/ (() => {

eval("const $ = document;\n\n// Pages and their button variables\n\nconst dashboard = $.querySelector(\".user-dashboard\");\nconst dashboardBtn = $.querySelector(\".two\");\nconst accountPage = $.querySelector(\".user-account-page\");\nconst accountPageBtn = $.querySelector(\".three\");\nconst shopcartPage = $.querySelector(\".user-shopping-cart\");\nconst shoppingBtn = $.querySelector(\".four\");\nconst inboxPage = $.querySelector(\".inbox\");\nconst inboxPageBtn = $.querySelector(\".five\");\nconst favoritesPage = $.querySelector(\".favorite-page\");\nconst favoritesPageBtn = $.querySelector(\".six\");\nconst subscriptionPage = $.querySelector(\".subscription-page\");\nconst subscriptionPageBtn = $.querySelector(\".seven\");\nconst latestBasketsPage = $.querySelector(\".latest-baskets-page\");\nconst latestBasketsPageBtn = $.querySelector(\".eight\");\nconst ticketPage = $.querySelector(\".ticket-page\");\nconst ticketPageBtn = $.querySelector(\".nine\");\nconst addressesPage = $.querySelector(\".addresses-page\");\nconst addressesPageBtn = $.querySelector(\".ten\");\nconst accBalancePage = $.querySelector(\".account-balance-page\");\nconst accBalancePageBtn = $.querySelector(\".eleven\");\nconst giftCardPage = $.querySelector(\".gift-card-page\");\nconst giftCardPageBtn = $.querySelector(\".twelve\");\n\nconst allPages = [\n  dashboard,\n  accountPage,\n  shopcartPage,\n  inboxPage,\n  favoritesPage,\n  subscriptionPage,\n  latestBasketsPage,\n  ticketPage,\n  addressesPage,\n  accBalancePage,\n  giftCardPage,\n];\nconst allBtns = [\n  dashboardBtn,\n  accountPageBtn,\n  shoppingBtn,\n  inboxPageBtn,\n  favoritesPageBtn,\n  subscriptionPageBtn,\n  latestBasketsPageBtn,\n  ticketPageBtn,\n  addressesPageBtn,\n  accBalancePageBtn,\n  giftCardPageBtn,\n];\n\nconst dashCtx = $.querySelector('#hello-chart')\nconst transFirstCtx = $.querySelector('#transaction-first-chart')\nconst transSecCtx = $.querySelector('#transaction-second-chart')\n\n//Inbox page variables\nlet accordionStatus = false;\nconst accordinBtns = $.querySelectorAll(\".accordin-btn\");\n\n//Acount page\nconst editAccountBtn = $.querySelector(\".edit-account-btn\");\nconst closeEditBtn = $.querySelector(\".close-edit-page-btn\");\nconst editAccountSection = $.querySelector(\".user-edit-account-part\");\nlet editPageDispalyStatus = false;\n\n//Basket variables \nconst basketFirstPart = $.querySelector('.first-part')\nconst basketSecondPart = $.querySelector('.second-part')\nconst displayNextBaksetBtn = $.querySelector('.dispalyBasketNextSection')\nconst dispalyPrevBasketBtn = $.querySelector('.displayBasketPrevSection')\n\n// Functions\n\nconst displayPage = (currentPage) => {\n  allPages.forEach((page) => {\n    page.classList.add(\"none\");\n  });\n  currentPage.classList.remove(\"none\");\n};\n\nconst pageButtonsStyle = (btn) => {\n  allBtns.forEach((button) => {\n    button.classList.remove(\"activePage\");\n  });\n  btn.classList.add(\"activePage\");\n};\n\nconst accordionMessageHandling = (event) => {\n  accordionStatus = !accordionStatus;\n\n  if (accordionStatus) {\n    event.target.previousElementSibling.style.display = \"block\";\n  } else {\n    event.target.previousElementSibling.style.display = \"none\";\n  }\n};\n\nconst displayEditAccountPage = (status) => {\n  editPageDispalyStatus = status\n\n  if (editPageDispalyStatus) {\n    editAccountSection.style.display = \"flex\";\n  } else {\n    editAccountSection.style.display = \"none\";\n  }\n};\n\nconst displayBasketSections = (page) => {\n    basketFirstPart.style.display = 'none'\n    basketSecondPart.style.display = 'none'\n    page.style.display = 'grid'\n}\n\nconst userChartFn = () => {\n  new Chart(dashCtx, {\n    type: 'doughnut',\n    data: {\n      labels: ['july', 'october', 'june', 'april'],\n      datasets: [{\n        label: 'Orders price',\n        data: [12_000_000, 19_000_400, 3_000_000, 8_500_000],\n        borderWidth: 1,\n        backgroundColor : ['#efefef' , '#84a98c' , '#517258' , '#517559']\n      }]\n    },\n  });\n\n  new Chart(transFirstCtx, {\n    type: 'line',\n    data: {\n      labels: ['july', 'october', 'june', 'april'],\n      datasets: [{\n        label: 'Orders price',\n        data: [12_000_000, 19_000_400, 3_000_000, 8_500_000],\n        borderWidth: 1,\n        backgroundColor : ['#efefef' , '#84a98c' , '#517258' , '#517559']\n      }]\n    },\n  });\n\n  new Chart(transSecCtx, {\n    type: 'bar',\n    data: {\n      labels: ['july', 'october', 'june', 'april' , 'september'],\n      datasets: [{\n        label: 'Orders price',\n        data: [12_000_000, 19_000_400, 3_000_000, 8_500_000 , 30_000_000],\n        borderWidth: 1,\n        backgroundColor : ['#efefef' , '#84a98c' , '#517258' , '#517559']\n      }]\n    },\n  });\n\n}\n\n// Events handling\n\nwindow.addEventListener('load' , () => {\n  userChartFn()\n})\n\ndashboardBtn.addEventListener(\"click\", () => {\n  displayPage(dashboard);\n  pageButtonsStyle(dashboardBtn);\n});\n\naccountPageBtn.addEventListener(\"click\", () => {\n  displayPage(accountPage);\n  pageButtonsStyle(accountPageBtn);\n});\n\nshoppingBtn.addEventListener(\"click\", () => {\n  displayPage(shopcartPage);\n  pageButtonsStyle(shoppingBtn);\n});\n\ninboxPageBtn.addEventListener(\"click\", () => {\n  displayPage(inboxPage);\n  pageButtonsStyle(inboxPageBtn);\n});\n\nfavoritesPageBtn.addEventListener(\"click\", () => {\n  displayPage(favoritesPage);\n  pageButtonsStyle(favoritesPageBtn);\n});\n\nsubscriptionPageBtn.addEventListener(\"click\", () => {\n  displayPage(subscriptionPage);\n  pageButtonsStyle(subscriptionPageBtn);\n});\n\nlatestBasketsPageBtn.addEventListener(\"click\", () => {\n  displayPage(latestBasketsPage);\n  pageButtonsStyle(latestBasketsPageBtn);\n});\n\nticketPageBtn.addEventListener(\"click\", () => {\n  displayPage(ticketPage);\n  pageButtonsStyle(ticketPageBtn);\n});\n\naddressesPageBtn.addEventListener(\"click\", () => {\n  displayPage(addressesPage);\n  pageButtonsStyle(addressesPageBtn);\n});\n\naccBalancePageBtn.addEventListener(\"click\", () => {\n  displayPage(accBalancePage);\n  pageButtonsStyle(accBalancePageBtn);\n});\n\ngiftCardPageBtn.addEventListener(\"click\", () => {\n  displayPage(giftCardPage);\n  pageButtonsStyle(giftCardPageBtn);\n});\n\naccordinBtns.forEach((btn) => {\n  btn.addEventListener(\"click\", (event) => {\n    accordionMessageHandling(event);\n  });\n});\n\neditAccountBtn.addEventListener('click' , () => {\n    displayEditAccountPage(true)\n})\n\ncloseEditBtn.addEventListener('click' , () => {\n    displayEditAccountPage(false)\n})\n\ndispalyPrevBasketBtn.addEventListener('click' , () => {\n    displayBasketSections(basketFirstPart)\n})\ndisplayNextBaksetBtn.addEventListener('click' , () => {\n    displayBasketSections(basketSecondPart)\n})\n\n//# sourceURL=webpack://plant-store-with-cms-project/./user-dashboard/userDashboard.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./user-dashboard/userDashboard.js"]();
/******/ 	
/******/ })()
;
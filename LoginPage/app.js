import { supabase } from "./../config/supabase";

const passwordInput = document.querySelector("#password_input");
const togglePasswordBtn = document.querySelector(".toggle-password");
const nameInput = document.querySelector("#userName_input");
const submitBtn = document.querySelector(".submit_button");
const errorModal = document.querySelector(".modal");
const imagesCon = document.querySelector('.images-con')
let togglePass = false;
let imageUrls = [
  "/images/login-page-images/5236601.jpg",
  "/images/login-page-images/birds-nest-plant-beige-pot.jpg",
  "/images/login-page-images/fiddle-leaf-fig-plant-pot.jpg",
  "/images/login-page-images/green-houseplant-background-plant-lovers.jpg",
  "/images/login-page-images/growth-close-up-environmental-lush-natural.jpg",
  "/images/login-page-images/hanging-pothos-plant-gray.jpg",
  "/images/login-page-images/fiddle-leaf-fig-plant-pot.jpg",
  "/images/login-page-images/houseplant-background-plant-lovers.jpg",
  "/images/login-page-images/monstera-deliciosa-plant-pot (1).jpg",
  "/images/login-page-images/monstera-deliciosa-plant-pot.jpg",
  "/images/login-page-images/palm-tree-house-plant-pot.jpg",
  "/images/login-page-images/snake-plant-pot.jpg",
  "/images/login-page-images/tropical-palm-leaves-pattern-background-green-monstera-tree-foliage-decoration-design-plant-with-exotic-leaf-closeup.jpg",
  "/images/login-page-images/v990-101.jpg",
  "/images/login-page-images/5236601.jpg",
  "/images/login-page-images/fiddle-leaf-fig-plant-pot.jpg",
  "/images/login-page-images/birds-nest-plant-beige-pot.jpg",
  "/images/login-page-images/fiddle-leaf-fig-plant-pot.jpg",
  "/images/login-page-images/green-houseplant-background-plant-lovers.jpg",
  "/images/login-page-images/growth-close-up-environmental-lush-natural.jpg",
  "/images/login-page-images/hanging-pothos-plant-gray.jpg",
  "/images/login-page-images/houseplant-background-plant-lovers.jpg",
  "/images/login-page-images/monstera-deliciosa-plant-pot (1).jpg",
  "/images/login-page-images/monstera-deliciosa-plant-pot.jpg",
  "/images/login-page-images/palm-tree-house-plant-pot.jpg",
  "/images/login-page-images/snake-plant-pot.jpg",
  "/images/login-page-images/tropical-palm-leaves-pattern-background-green-monstera-tree-foliage-decoration-design-plant-with-exotic-leaf-closeup.jpg",
  "/images/login-page-images/v990-101.jpg",
  "/images/login-page-images/fiddle-leaf-fig-plant-pot.jpg",
  "/images/login-page-images/5236601.jpg",
  "/images/login-page-images/birds-nest-plant-beige-pot.jpg",
  "/images/login-page-images/fiddle-leaf-fig-plant-pot.jpg",
  "/images/login-page-images/green-houseplant-background-plant-lovers.jpg",
  "/images/login-page-images/growth-close-up-environmental-lush-natural.jpg",
  "/images/login-page-images/hanging-pothos-plant-gray.jpg",
  "/images/login-page-images/houseplant-background-plant-lovers.jpg",
  "/images/login-page-images/monstera-deliciosa-plant-pot (1).jpg",
  "/images/login-page-images/monstera-deliciosa-plant-pot.jpg",
  "/images/login-page-images/palm-tree-house-plant-pot.jpg",
  "/images/login-page-images/snake-plant-pot.jpg",
  "/images/login-page-images/5236601.jpg",
  "/images/login-page-images/birds-nest-plant-beige-pot.jpg",
  "/images/login-page-images/fiddle-leaf-fig-plant-pot.jpg",
  "/images/login-page-images/green-houseplant-background-plant-lovers.jpg",
  "/images/login-page-images/growth-close-up-environmental-lush-natural.jpg",
  "/images/login-page-images/hanging-pothos-plant-gray.jpg",
  "/images/login-page-images/houseplant-background-plant-lovers.jpg",
  "/images/login-page-images/monstera-deliciosa-plant-pot (1).jpg",
  "/images/login-page-images/monstera-deliciosa-plant-pot.jpg",
  "/images/login-page-images/palm-tree-house-plant-pot.jpg",
  "/images/login-page-images/snake-plant-pot.jpg",
  "/images/login-page-images/tropical-palm-leaves-pattern-background-green-monstera-tree-foliage-decoration-design-plant-with-exotic-leaf-closeup.jpg",
  "/images/login-page-images/v990-101.jpg",
  "/images/login-page-images/5236601.jpg",
  "/images/login-page-images/birds-nest-plant-beige-pot.jpg",
  "/images/login-page-images/fiddle-leaf-fig-plant-pot.jpg",
  "/images/login-page-images/green-houseplant-background-plant-lovers.jpg",
  "/images/login-page-images/growth-close-up-environmental-lush-natural.jpg",
  "/images/login-page-images/houseplant-background-plant-lovers.jpg",
  "/images/login-page-images/monstera-deliciosa-plant-pot (1).jpg",
  "/images/login-page-images/5236601.jpg",
  "/images/login-page-images/birds-nest-plant-beige-pot.jpg",
  "/images/login-page-images/fiddle-leaf-fig-plant-pot.jpg",
];

const showPasswordFn = () => {
  togglePass = !togglePass;
  if (togglePass) {
    passwordInput.type = "text";
    togglePasswordBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>

        `;
  } else {
    togglePasswordBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>

        `;
    passwordInput.type = "password";
  }
};

const isUserLogin = () => {
  let loginCheck = false;
  let userName = String(nameInput.value);
  let userPass = String(passwordInput.value);
  if (userName === "admin" && userPass === "admin") {
    location = "./../adminPage/admin-index.html";
  } else {
    const getUsersDatas = async () => {
      const { data, error } = await supabase.from("users").select();
      data.forEach((user) => {
        if (user.name == userName && user.password == userPass) {
          loginCheck = true;
        }
      });
      if (loginCheck) {
        location.href = "./../main-page/main-index.html";
      } else {
        modalNotif("Your credentials are not valid", "error", 6000);
      }
    };
    getUsersDatas();
  }
};

const modalNotif = (notif, status, displayTime) => {
  errorModal.style.display = "block";
  errorModal.classList = `modal ${status}`;
  errorModal.innerHTML = notif;
  setTimeout(() => {
    errorModal.style.display = "none";
  }, displayTime);
};

togglePasswordBtn.addEventListener("click", showPasswordFn);
submitBtn.addEventListener("click", isUserLogin);
window.addEventListener('load' , () => {
    imageUrls.forEach((url) => {
        imagesCon.insertAdjacentHTML('beforeend' , `<img src="${url}"></img>`)
    })
})

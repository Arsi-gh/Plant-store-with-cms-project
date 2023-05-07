import { ValidCom } from "../components/valid-check-component/valid-component.js";
import { InValidCom } from "../components/invalid-check-component/invalid-component.js";
import { supabase } from "./../config/supabase"

window.customElements.define("valid-check", ValidCom);
window.customElements.define("invalid-check", InValidCom);

let nameInput = document.querySelector("#userName_input");
let emailInput = document.querySelector("#email_input");
let passwordInput = document.querySelector("#password_input");
let submitBtn = document.querySelector(".submit_button");
let nameValidationNotif = document.querySelector(".name-valid");
let emailValidationNotif = document.querySelector(".email-valid");
let passValidationNotif = document.querySelector(".pass-valid");
let togglePasswordBtn = document.querySelector(".toggle-password");
let errorModal = document.querySelector(".modal");
let usersLength = null
let togglePass = false;
let filterCheck = {
  nameCapital: undefined,
  nameLength: undefined,
  nameWhiteSpace: undefined,
  emailCheck: undefined,
  passLength: undefined,
  passCapital: undefined,
  passWhiteSpace: undefined,
  passSymbol: undefined,
};

const capitalCharRegex = (value, notifCon, title) => {
  let regexCheck = /[A-Z]+/g.test(value);
  if (regexCheck) {
    notifCon.insertAdjacentHTML(
      "beforeend",
      `<p>${title} must contain at least one capital letter<valid-check></valid-check></p>`
    );
  } else {
    notifCon.insertAdjacentHTML(
      "beforeend",
      `<p>${title} must contain at least one capital letter<invalid-check></invalid-check></p>`
    );
  }
  return regexCheck;
};

const lenghtCheck = (value, maxLenght, minLength, notifCon, title) => {
  if (value > minLength && maxLenght > value) {
    notifCon.insertAdjacentHTML(
      "beforeend",
      `<p> ${title} must be at least ${minLength} charachters and max ${maxLenght}<valid-check></valid-check></p>`
    );
    return true;
  } else {
    notifCon.insertAdjacentHTML(
      "beforeend",
      `<p> ${title} must be at least ${minLength} charachters and max ${maxLenght}<invalid-check></invalid-check></p>`
    );
    return false;
  }
};

const whiteSpaceCheck = (value, notifCon, title) => {
  let regexCheck = /[\s]/g.test(value);
  if (regexCheck) {
    notifCon.insertAdjacentHTML(
      "beforeend",
      `<p> ${title} cannot contain whitespace between chracters<invalid-check></invalid-check></p>`
    );
  } else {
    notifCon.insertAdjacentHTML(
      "beforeend",
      `<p> ${title} cannot contain whitespace between chracters<valid-check></valid-check></p>`
    );
  }
  return regexCheck;
};

const symbolCheck = (value, notifCon, title) => {
  let regexCheck = /[-@#!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(value);
  if (regexCheck) {
    notifCon.insertAdjacentHTML(
      "beforeend",
      `<p>${title} must contain symbols like : %$-#&*@_+= ...<valid-check></valid-check></p>`
    );
  } else {
    notifCon.insertAdjacentHTML(
      "beforeend",
      `<p>${title} must contain symbols like : %$-#&*@_+= ...<invalid-check></invalid-check></p>`
    );
  }
  return regexCheck;
};

const emailCheck = (value, notifCon, title) => {
  let regexCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  if (regexCheck) {
    notifCon.insertAdjacentHTML(
      "beforeend",
      `<p>${title} is valid <valid-check></valid-check></p>`
    );
  } else {
    notifCon.insertAdjacentHTML(
      "beforeend",
      `<p>${title} is invalid please enter a valid email address <invalid-check></invalid-check></p>`
    );
  }
  return regexCheck;
};

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

const submitFn = (event) => {
  event.preventDefault();
  if (
    filterCheck.nameLength === true &&
    filterCheck.nameCapital === true &&
    filterCheck.nameWhiteSpace === true &&
    filterCheck.emailCheck === true &&
    filterCheck.passCapital === true &&
    filterCheck.passLength === true &&
    filterCheck.passWhiteSpace === true &&
    filterCheck.passSymbol === true
  ) {
    putData();
  } else {
    modalNotif(
      "Signing in has been failed , your datas are invalid",
      "error",
      6000
    );
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

const getUsersData = async () => {
  const { data, error } = await supabase
  .from('users')
  .select()
  if (error){
    console.log(error)
  }
  if (data){
    usersLength  = data.length
  }
}

const putData = async () => {
  let isUserIn = false
  let newUser = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  const { data, error } = await supabase
  .from('users')
  .select()
  
  if (data){
    data.forEach((user)=> {
      if (user.name == newUser.name){
        isUserIn = false
      } else if ( user.email == newUser.email){
        isUserIn = false
      } else {
        isUserIn = true
      }
      
    })
  }
    if (isUserIn){

      const insertUserData = async () => {
        const { error } = await supabase
        .from('users')
        .insert({name: newUser.name , email : newUser.email , password : newUser.password })
      };
      insertUserData()
      modalNotif("Singing in has been completed successfuly , you can login now", "success", 4000);

    } else {
         
      modalNotif(
        "Signing in has been failed , users with this name or email already exists",
        "error",
        6000
        );

    }
};

window.addEventListener('load' , () => {

  
  nameInput.addEventListener("keyup", () => {
    let username = nameInput.value.trim();
    nameValidationNotif.innerHTML = "";
    filterCheck.nameLength = lenghtCheck(
      username.length,
      12,
      6,
      nameValidationNotif,
      "username"
      );
      filterCheck.nameCapital = capitalCharRegex(
        username,
        nameValidationNotif,
        "username"
        );
        filterCheck.nameWhiteSpace = !whiteSpaceCheck(
    username,
    nameValidationNotif,
    "username"
    );
  });
  
  emailInput.addEventListener("keyup", () => {
    let email = emailInput.value.trim();
    emailValidationNotif.innerHTML = "";
    filterCheck.emailCheck = emailCheck(email, emailValidationNotif, "email");
  });
  
  passwordInput.addEventListener("keyup", () => {
    let password = passwordInput.value.trim();
    passValidationNotif.innerHTML = "";
    filterCheck.passLength = lenghtCheck(
      password.length,
      14,
      8,
      passValidationNotif,
      "password"
      );
      filterCheck.passCapital = capitalCharRegex(
        password,
        passValidationNotif,
        "password"
        );
        filterCheck.passWhiteSpace = !whiteSpaceCheck(
          password,
          passValidationNotif,
          "password"
          );
          filterCheck.passSymbol = symbolCheck(
            password,
            passValidationNotif,
    "password"
    );
  });
  
  togglePasswordBtn.addEventListener("click", showPasswordFn);
  
  submitBtn.addEventListener("click", (event) => {
    submitFn(event);
  });

  getUsersData()
  
})
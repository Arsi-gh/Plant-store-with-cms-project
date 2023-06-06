import { supabase } from "./../config/supabase"

let nameInput = document.querySelector("#userName_input");
let emailInput = document.querySelector("#email_input");
let passwordInput = document.querySelector("#password_input");
let submitBtn = document.querySelector(".submit_button");
let nameValidationNotifsCon = document.querySelector(".name-valid");
let emailValidationNotifsCon = document.querySelector(".email-valid");
let passwordValidationNotifsCon = document.querySelector(".pass-valid");
let togglePasswordBtn = document.querySelector(".toggle-password");
let modal = document.querySelector(".modal");
let togglePass = false;

//username validation icon con
const nameLengthIcon = document.querySelector('.name-length-check')
const nameWhiteSpaceIcon = document.querySelector('.name-white-space-check')

//email validation incon con
const emailCheckAlert = document.querySelector('.email-check-alert')
const emailCheckIcon = document.querySelector('.email-check-icon')

//password validation icon cons 
const passLengthIcon  = document.querySelector('.pass-length-check ')
const passCapitalIcon = document.querySelector('.pass-capital-check')
const passWhiteSpaceIcon  = document.querySelector('.pass-white-space-check')
const passSymbolIcon = document.querySelector('.pass-symbol-check')

let filterCheck = {nameLength: undefined, nameWhiteSpace: undefined, emailCheck: undefined, passLength: undefined, passCapital: undefined, passWhiteSpace: undefined, passSymbol: undefined,};

// Regex filter fucntions

const whiteSpaceCheck = (value) => {
  return !/[\s]/g.test(value)
}

const capitalCharCheck = (value) => {
  return /[A-Z]+/g.test(value)
}

const symbolCheck = (value) => {
  return /[-@#!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(value)
}

const emailCheck = (value) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

const iconHandler = (elem , stat) => {
  if (stat){
    elem.classList.remove("fa-regular")
    elem.classList.remove("fa-circle-xmark")
    elem.classList.remove("invalid")
    elem.classList.add("fa-regular")
    elem.classList.add("fa-circle-check")
    elem.classList.add("valid")
  } else {
    elem.classList.remove("fa-regular")
    elem.classList.remove("fa-circle-check")
    elem.classList.remove("valid")
    elem.classList.add("fa-regular")
    elem.classList.add("fa-circle-xmark")
    elem.classList.add("invalid")
  }
}



const usernameValidationCheck = () => {
  nameValidationNotifsCon.classList.remove('hide-elem')
  let newUsername = nameInput.value.trim()
  let spaceCheck = whiteSpaceCheck(newUsername)

  if (newUsername.length > 6){
    filterCheck.nameLength = true
    iconHandler(nameLengthIcon , true)
  } else {
    filterCheck.nameLength = false
    iconHandler(nameLengthIcon , false)
  }
  
  if (spaceCheck){
    filterCheck.nameWhiteSpace = true
    iconHandler(nameWhiteSpaceIcon , true)
  } else {
    filterCheck.nameWhiteSpace = false
    iconHandler(nameWhiteSpaceIcon , false)
  }
}

const emailCheckValidationCheck = () => {
  emailValidationNotifsCon.classList.remove('hide-elem')
  let newEmail = emailInput.value.trim()
  let emailCorrectionCheck = emailCheck(newEmail)

  if (emailCorrectionCheck){
    filterCheck.emailCheck = true
    iconHandler(emailCheckIcon , true)
    emailCheckAlert.innerHTML = 'your email address is correct'
  } else {
    filterCheck.emailCheck = false
    iconHandler(emailCheckIcon , false)
    emailCheckAlert.innerHTML = 'Please enter a valid email address'
  }
}

const passwordValidationCheck = () => {
  passwordValidationNotifsCon.classList.remove('hide-elem')
  let newPassword = passwordInput.value.trim()
  let passSymbolCheck = symbolCheck(newPassword)
  let passSpaceCheck = whiteSpaceCheck(newPassword)
  let passCapitalCheck = capitalCharCheck(newPassword)

  if (newPassword.length > 8){
    filterCheck.passLength = true
    iconHandler(passLengthIcon , true)
  } else {
    filterCheck.passLength = false
    iconHandler(passLengthIcon , false)
  }

  if (passSpaceCheck){
    iconHandler(passWhiteSpaceIcon , true)
    filterCheck.passWhiteSpace = true
  } else {
    iconHandler(passWhiteSpaceIcon , false)
    filterCheck.passWhiteSpace = false
  }

  if (passSymbolCheck){
    iconHandler(passSymbolIcon , true)
    filterCheck.passSymbol = true
  } else {
    iconHandler(passSymbolIcon , false)
    filterCheck.passSymbol = false
  }

  if (passCapitalCheck){
    filterCheck.passCapital = true 
    iconHandler(passCapitalIcon , true)
  } else {
    filterCheck.passCapital = false
    iconHandler(passCapitalIcon , false)
  } 
}

const togglePassFn = () => {
  togglePass = !togglePass
  if (togglePass){
    passwordInput.type = 'text'
    togglePasswordBtn.innerHTML = '<i class="fa-regular fa-eye"></i>'
  } else {
    passwordInput.type = 'password'
    togglePasswordBtn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>'
  }
}

const hideNotifsCon = (container) => {
  container.classList.add('hide-elem')
}

const submitNewUser = async () => {
  if (filterCheck.nameLength && filterCheck.nameWhiteSpace && filterCheck.emailCheck && filterCheck.passCapital && filterCheck.passLength && filterCheck.passSymbol && filterCheck.passWhiteSpace){
    let newUser = {
      name : nameInput.value.trim(),
      email : emailInput.value.trim(),
      password : passwordInput.value.trim(),
    }
    let isUserIn = false
    const { data } = await supabase
      .from('users')
      .select()

    if (data){
      data.forEach((user) => {
        if (user.name == newUser.name  || user.email == newUser.email){
          isUserIn = true
          return
        } else {
          isUserIn = false
          return
        }
      })
      if (isUserIn){
        modalAlert(5000 , 'This username or email already exist , please try another' , '#e85165')
      } else {
        const { error } = await supabase
        .from('users')
        .insert({ name: newUser.name , email : newUser.email , password : newUser.password })
        modalAlert(5000 , 'You have signed up successfuly' , '#67c981')
      }
    }
  } else {
    modalAlert(5000 , 'Your inserted properties are invalid , please rewrite them by validation guide' , '#e85165')
    nameValidationNotifsCon.classList.remove('hide-elem')
    emailValidationNotifsCon.classList.remove('hide-elem')
    passwordValidationNotifsCon.classList.remove('hide-elem')
  }
}

const modalAlert = (timer , desc , color) => {
  modal.style.display = 'block'
  modal.style.backgroundColor = color
  modal.innerHTML = desc 
  setTimeout(() => {
    modal.style.display = 'none'
  }, timer);
}

nameInput.addEventListener('input' , usernameValidationCheck)
emailInput.addEventListener('input' , emailCheckValidationCheck)
passwordInput.addEventListener('input' , passwordValidationCheck)

nameInput.addEventListener('focusout' , () =>{
  hideNotifsCon(nameValidationNotifsCon)
})

emailInput.addEventListener('focusout' , () =>{
  hideNotifsCon(emailValidationNotifsCon)
})
passwordInput.addEventListener('focusout' , () =>{
  hideNotifsCon(passwordValidationNotifsCon)
})

togglePasswordBtn.addEventListener('click' , togglePassFn)
submitBtn.addEventListener('click' , submitNewUser)
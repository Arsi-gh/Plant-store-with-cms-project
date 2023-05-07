import { supabase , getUserDatas} from "./../../adminPage/admin-app.js"

let template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="/components/users-list-component/user-style.css">
<div class="user">
<h3 class="user-name"></h3>
<h4 class="user-email"></h4> 
<h4 class="user-pass"></h4>
<button class="user-delete-btn">Kick User</button>
</div>
`;

class User extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    let container = this.shadowRoot.querySelector('.user')
    
    let userName = this.shadowRoot.querySelector(".user-name");
    userName.innerHTML = `Name : ${this.getAttribute("name")}`;
    container.dataset.userName = this.getAttribute("name")
    
    let userEmail = this.shadowRoot.querySelector(".user-email");
    userEmail.innerHTML = `Email : ${this.getAttribute("email")}`;
    container.dataset.userEmail =  this.getAttribute("email")

    let userPass = this.shadowRoot.querySelector(".user-pass");
    userPass.innerHTML = `Password : ${this.getAttribute("password").slice(0 , 6)}****`;
    container.dataset.userPass = this.getAttribute("password")

    let kickBtn = this.shadowRoot.querySelector('.user-delete-btn')
    kickBtn.addEventListener('click' , () => {
      const kickUserFn = async () => {
        
        const {data , error } = await supabase
        .from('users')
        .delete()
        .eq('name' , container.dataset.userName)
        
        location.href = location.href

      }
      kickUserFn()
    })
  }

  static observedAttributes() {
    ["user-name", "user-email" , "user-pass"];
  }
}

export { User };

import { supabase , getUserDatas} from "./../../adminPage/admin-app.js"

let template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="/components/users-list-component/user-style.css">
<div class="user">
<p class="user-name"></p>
<p class="user-email"></p>
<button class="user-delete-btn button">See more</button>
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
    userName.innerHTML = `<b>Name : </b>${this.getAttribute("name")}`;
    container.dataset.userName = this.getAttribute("name")
    
    let userEmail = this.shadowRoot.querySelector(".user-email");
    userEmail.innerHTML = `<b>Email : </b>${this.getAttribute("email")}`;
    container.dataset.userEmail =  this.getAttribute("email")

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
    ["user-name", "user-email"];
  }
}

export { User };

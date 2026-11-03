// Fresh & Veg demo storefront. Replace this number with your WhatsApp number (country code + number, digits only).
const WHATSAPP_NUMBER = "+917979068661";
let basket = JSON.parse(localStorage.getItem("freshVegBasket") || "[]");
function refreshCart(){
  document.querySelectorAll("#cart-count").forEach(el => el.textContent = basket.length);
  const items = document.getElementById("cart-items");
  if(items) items.textContent = basket.length ? basket.map((p,i)=>`${i+1}. ${p}`).join(" • ") : "Your basket is empty. Add some fresh picks!";
  const order = document.getElementById("order-whatsapp");
  if(order){
    const message = encodeURIComponent("Hello Fresh & Veg! I would like to order:\n" + basket.map((p,i)=>`${i+1}. ${p}`).join("\n"));
    order.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    order.style.opacity = basket.length ? "1" : ".5";
  }
}
document.querySelectorAll(".add-btn").forEach(btn=>btn.addEventListener("click",()=>{
  basket.push(btn.dataset.product); localStorage.setItem("freshVegBasket",JSON.stringify(basket)); refreshCart();
  const old=btn.textContent; btn.textContent="Added ✓"; setTimeout(()=>btn.textContent=old,900);
}));
refreshCart();
const menuButton=document.querySelector(".menu-toggle"), nav=document.querySelector(".nav");
if(menuButton&&nav) menuButton.addEventListener("click",()=>{nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",nav.classList.contains("open"));});
document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));button.classList.add("active");
  document.querySelectorAll("#all-products .product-card").forEach(card=>card.hidden=button.dataset.filter!=="all"&&card.dataset.category!==button.dataset.filter);
}));
const contactForm=document.getElementById("contact-form");
if(contactForm) contactForm.addEventListener("submit",e=>{
  e.preventDefault();const data=new FormData(contactForm);
  const message=encodeURIComponent(`Hello Fresh & Veg!\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEnquiry: ${data.get("subject")}\nMessage: ${data.get("message")}`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,"_blank");
});
const newsletter=document.getElementById("newsletter-form");
if(newsletter) newsletter.addEventListener("submit",e=>{e.preventDefault();document.getElementById("newsletter-message").textContent="Thank you for subscribing! (Demo form — connect an email service to collect subscribers.)";newsletter.reset();});

const btncart=document.querySelector('#cartimg');
const cart=document.querySelector('.cart');
const btnclose=document.querySelector('.remove');


btncart.addEventListener('click',()=>{
    cart.classList.add('cart-active');
})

btnclose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
})
 

document.addEventListener('DOMContentLoaded',loadfunction);


function loadfunction(){

    removefunction()
}

function removefunction(){

    //remove item
    const btntrash=document.querySelectorAll('.class-remove')
    btntrash.forEach((btn)=>{
        btn.addEventListener('click',removeitem)
    })


    const btnqua=document.querySelectorAll('.cart-quantity');
    btnqua.forEach((input)=>{
        input.addEventListener('change',quantity);
    });


    //product cart
    const btncartbutton=document.querySelectorAll('.add-cart');
    btncartbutton.forEach((btn)=>{
        btn.addEventListener('click',addcart);
    })


    updateTotal();

}


function removeitem(){
    if(confirm("Are you sure to remove the item ?")){

        let titlemanga=this.parentElement.querySelector('.cart-title').innerHTML;
        console.log(titlemanga)
        itemList=itemList.filter((el)=>{el.title!=titlemanga;
        });
        console.log(itemList);
        this.parentElement.remove();
        removefunction();
    }
    
}


function quantity(){

    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }   
    removefunction()
}


let itemList=[];

function addcart(){

    let manga=this.parentElement;
    let title = manga.querySelector('.manga-title').
    innerHTML;
    let price = manga.querySelector('.manga-price').
    innerHTML;
    let img = manga.querySelector('.manga-image').
    src;
    // console.log(title,price,img)

    let newproduct={title,price,img}
    // console.log(newproduct)

    // condition check
    if(itemList.find((el)=>el.title == newproduct.title)){
        alert("product already in cart");
        return;
    } 
    else{
        itemList.push(newproduct);

    }
    let newcart=cartbasket(title,price,img);
    let newelement=document.createElement('new');
    newelement.innerHTML=newcart;
    let cartproduct=document.querySelector('.cart-content');
    cartproduct.append(newelement);
    removefunction()
}


function cartbasket(title,price,img){
    return `
    <div class="cart-box">
        <img src="${img}" class="cart-img">
        <div class="detail-box">
            <div class="cart-title">
            ${title}
           </div>
        <div class="price-box">
            <div class="cart-price">${price}</div>
             <div class="cart-amt">${price}</div>
            </div>
            <input type="number" value="1" class="cart-quantity">
            
        </div>
        <ion-icon name="trash-outline" class="class-remove"></ion-icon>
    </div>
    `;
}



function updateTotal()
{
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("RS.",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="RS."+(price*qty);

  });

  totalValue.innerHTML='Rs.'+total;


  // Add Product Count in Cart Icon

  const cartCount=document.querySelector('.cart-count');
  let count=itemList.length;
  cartCount.innerHTML=count;

  if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }


}

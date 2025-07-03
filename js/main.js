var pName= document.getElementById("productName");
var pPrice= document.getElementById("productPrice");
var pCategory= document.getElementById("productCategory");
var pDesc= document.getElementById("productDesc");
var pImg= document.getElementById("productImage");
var addbtn= document.getElementById("addbtn");
var updatebtn= document.getElementById("updatebtn");

console.log (pName,pPrice,pCategory,pDesc ,pImg);

var   plist=[];
var productKey= "productKey";
  if (localStorage.getItem(productKey)){
    plist= JSON.parse(localStorage.getItem(productKey))
    displayList(plist);
  }

  else{
    plist=[]
  }
//add
function   addProduct(     ) {
    
    var product={
    name: pName.value,
    price:pPrice.value,
    category: pCategory.value,
    desc: pDesc.value,
   img :"./image/" + pImg.files[0].name 
// pImg.files[0].name   this  is  the  dynamic name of each img

    }
  
  console.log(product);
plist.push(product);
//1   local  storage
localStorage.setItem("productKey", JSON.stringify(plist));
//2   display   uuuuser  add
displayList(plist);

clearInputs();


};
//clear
function clearInputs() {
  pName.value = '';
  pPrice.value = '';
  pCategory.value = '';
  pDesc.value = '';
}

//displaaaaaaaaay
 function  displayList(index){
        cartona=""
        for (var i = 0; i< index.length ; i++) {
           var  product=index[i];

         cartona+= `
           <div class="col-md-4">

              <div class="inner">
              <img src=${product.img} class="w-100" alt="">
               <h2>${product.name}</h2>
              <div class="d-flex justify-content-between">
               <span>${product.category}</span>

                <span>${product.price}</span>
                </div>

                  <button   onClick="showLayer( ${i}) "  class="btn btn-danger my-2"  >Delete product : ${i}</button>
                  <button   onClick="setupUpdate( ${i}) "  class="btn btn-danger my-2"  >Update product : ${i}</button>

        </div>

      </div>
      `
            
        }

        document.getElementById("productsRow").innerHTML=cartona;
     };

     var globalDEletedItemIndex;
//deleeeeeeete
function deleteProduct() {
    plist.splice(globalDEletedItemIndex, 1);
        displayList(plist);

       localStorage.setItem(productKey, JSON.stringify(plist));
        hideLayer();

};
 function showLayer(index) {
  globalDEletedItemIndex = index;
  document.getElementById("layer").classList.replace("d-none", "d-flex");
};
function hideLayer() {
  document.getElementById("layer").classList.replace('d-flex', "d-none");
};

var  globalUpdatedItemIndex;
    function  setupUpdate(index){
       console.log(index)
     globalUpdatedItemIndex  =  index;
      var product= plist[index];
       product.name= pName.value,
       product.price= pPrice.value,
       product.Category= pCategory.value,
       product.desc= pDesc.value,
   
       addbtn.classList.add("d-none");
        updatebtn.classList.remove("d-none");

        

       window.scroll({
        behavior:"smooth",
        top:0 
       });  
          
};

//globalUpdatedItemIndex  شايل رقم العنصر الي اتعمله ابديت وعشان الكود في html
//  فيه الابديت فانكشن في الزرار مش هعرف اخليها  تستقبل (index )
function  update(){
plist[globalUpdatedItemIndex].name=pName.value;
plist[globalUpdatedItemIndex].price=pPrice.value;
plist[globalUpdatedItemIndex].category=pCategory.value;
plist[globalUpdatedItemIndex].desc=pDesc.value;


displayList(plist);
localStorage.setItem("productKey", JSON.stringify(plist));
 


clearInputs();

       addbtn.classList.remove("d-none");
        updatebtn.classList.add("d-none");



   window.scroll({
    behavior: "smooth",
    top: document.body.scrollHeight,

  });


}
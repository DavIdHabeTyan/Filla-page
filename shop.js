import {dataFila} from "./data/data.js";

let block = document.createElement('div');
block.classList.add('mainBlock');

const button = document.getElementById("btn");
const basket = document.querySelector('.basket_bottom');
const mainBlock = document.querySelector(".main");
mainBlock.append(block);

function fetchProducts() {
   return new Promise(resolve => {
      setTimeout(() => {
         resolve(dataFila)
      }, 1000)
   });
}

const drawProducts = () => {
   block.innerHTML = getLoaderHTML()
   fetchProducts()
      .then(res => JSON.parse(res))
      .then(load => {
         block.innerHTML = ""
         return load;
      })
      .then(products => {
         let markupArray = products.map(item => createProduct(item))
         block.append(...markupArray);
      })
}
const createProduct = ({name, src, price}) => {

   let productItem = document.createElement('div');
   productItem.classList.add('product_block')
   let image = document.createElement('img');
   image.classList.add("product_images")
   image.setAttribute('src', `${src}`);


   let productTitle = document.createElement('div');
   productTitle.innerText = name;
   productTitle.classList.add("product_title");


   let productPrice = document.createElement('div');
   let productPriceText = document.createElement('span');
   productPrice.classList.add("product_price");

   // -------  add card button --------------

   let addCardProductBlock = document.createElement('div');
   let addCardProduct = document.createElement('button');

   addCardProduct.classList.add('addCards')
   addCardProduct.innerText = 'Add Cart';

   addCardProductBlock.append(addCardProduct)


// -------------- basket
   let select = document.createElement('div');
   select.classList.add('select');

   //// stugel vordex append anenq

   mainBlock.append(select)

   let cart = document.querySelector('.cart');


   addCardProduct.addEventListener('click', e => {


      let item = Number(cart.getAttribute('data-count') || 0);
      cart.setAttribute('data-count', item += 1);
      cart.classList.add('on');

      // copy element

      const parent = e.target.parentNode.parentNode.parentNode;
      const clone = parent.cloneNode(true);
      select.appendChild(clone)
      if (clone) {
         cart.onclick = () => {
            select.classList.toggle('display')
         }
      }

   })


   productPriceText.innerText = price;
   productPrice.append(productPriceText)
   productPrice.append(addCardProductBlock);

   productItem.append(image, productTitle, productPrice);

   return productItem;


}


button.addEventListener("click", drawProducts);

function getLoaderHTML() {
   return `
    <tr class = "tr_loader">
      <td colspan="3">
        <img src="https://icons8.com/preloaders/preloaders/1487/%E2%80%8B%E2%80%8BIphone-spinner-1.gif" alt="" />
      </td>
    </tr>`;
}

// ------- search

let searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
   let searchText = e.target.value;
   let searchBlock = document.querySelector(".mainBlock");
   let list = [...searchBlock.children];
   if (searchText) {

      list = list.map(item => {
         let content = item.childNodes[1].innerText.toLowerCase();

         if (!content.includes(searchText.toLowerCase())) {
            item.style.display = 'none';
         } else {
            item.style.display = 'block';
         }
         return item;
      })
      block.innerHTML = '';
      block.append(...list);

   } else {
      list.map((item) => {
         item.style.display = 'block';
         return item
      })

   }


})




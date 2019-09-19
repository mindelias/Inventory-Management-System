$(document).ready(function () {

  //function to help print data on page
  function populate(product) {
    $tr.append(`
      <tr id="${product.id}">
          <td class="column1">${product.code}</td>
          <td class="column2">${product.category}</td>
          <td class="column3">${product.name}</td>
          <td class="column4">${product.price}</td>
          <td class="column5">${product.quantity}</td>
          <td class="column6">
          <div>
              <button class="editButtons" onclick="editProduct(${product.id})" data-toggle="modal" data-target="#exampleModal">
                  <i class="fas fa-marker"></i>
              </button>
              <button id="deleteButton" onclick="deleteProduct(${product.id})">
                  <i class="fas fa-trash"></i>
              </button>
              <button id="addButton" onclick="deleteProduct(${product.id})">
                  <i class="fas fa-trash"></i>
              </button>
          </div>
      </td>
  </tr>`);
  }
 


  //ajax call db data to page

  function getAllDbDataOnPage() {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/products",
      success: function (response) {
        products = response;
        response.forEach( product => {
          populate(product);
        });
         
      }
    })
  };
  getAllDbDataOnPage()

  //on edit click update a product
  $("#submitProduct").on("click", function (e) {
    e.preventDefault();
    const id = rowid.val()
    const FormData = {
      name: formName.val(),
      description: formDescription.val(),
      quantity: formQuantity.val(),
      imageLink: formImageLink.val(),
      price: formPrice.val(),
      category: formCategory.val(),
      code: prodCode.val()
    };

    $.ajax({
      type: "PUT",
      url: `http://localhost:3000/products/${id}`,
      data: FormData,
      success: (res) => {
          const product = res;
          $(`#${id}`).empty()
          $(`#${id}`).html(`
          <td class="column1">${product.code}</td>
          <td class="column2">${product.category}</td>
          <td class="column3">${product.name}</td>
          <td class="column4">${product.price}</td>
          <td class="column5">${product.quantity}</td>
          <td class="column6">
          <div>
              <button id="editButton${product.id}" onclick="editProduct(${product.id})" data-toggle="modal" data-target="#exampleModal">
                  <i class="fas fa-marker"></i>
              </button>
              <button id="deleteButton" onclick="deleteProduct(${product.id})">
                  <i class="fas fa-trash"></i>
              </button>
              
          </div>
      </td>`);
        products = products.filter(prod => {
          return prod.id !== res.id
       })
       products.push(res)
      },
      error: () => {
        console.log('failed to PUT')
      }
    });
  });


  // add new product

  $("#addproduct").on("click", function () {
     e.preventDefault();
  
  
  // formName.val(`${product.name}`)
  // formPrice.val(`${product.price}`)
  // formQuantity.val(`${product.qauntity}`)
  // formDescription.val(`${product.description}`)
  // formImageLink.val(`${product.imageLink}`)
  // formCategory.val(`${product.category}`)
  // prodCode.val(`${product.code}`)
  //   if (condition) {
      
  //   }
    const FormData = {
      name: formName.val(),
      description: formDescription.val(),
      quantity: formQuantity.val(),
      imageLink: formImageLink.val(),
      price: formPrice.val(),
      category: formCategory.val(),
       Code: prodCode.val()
    };
     //$("#addproduct").trigger("reset");
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/products/",
      data: FormData,
      success: (newproduct) => {
        $tr.append(`
      <tr id="${newproduct.id}">
          <td class="column1">${newproduct.code}</td>
          <td class="column2">${newproduct.category}</td>
          <td class="column3">${newproduct.name}</td>
          <td class="column4">${newproduct.price}</td>
          <td class="column5">${newproduct.quantity}</td>
          <td class="column6">
          <div>
              <button class="editButtons" onclick="editProduct(${newproduct.id})" data-toggle="modal" data-target="#exampleModal">
                  <i class="fas fa-marker"></i>
              </button>
              <button id="deleteButton" onclick="deleteProduct(${newproduct.id})">
                  <i class="fas fa-trash"></i>
              </button>
               
          </div>
      </td>
  </tr>`);
         
      },
      error: function(){
           alert('not added succesfully')   
      }
    });
  });


  // delete press delete a product

  deleteProduct = (id) => {
    const product = products.find(e => e.id === id)
     .then((result) => {
      if (result.value) {
        $.ajax({
          type: "DELETE",
          url: `http://localhost:3000/products/${id}`,
          success: () => {
            $(`#${product.id}`).remove();
            
          }
        });
      }
    })
  }
})


const $tr = $("#tablepopulate");
const rowid = $("#id")
const formName = $("#name");
const formDescription = $("#describe");
const formQuantity = $("#prodQuan");
const formImageLink = $("#imgLnk");
const formPrice = $("#price");
const formCategory = $("#catId");
const prodCode = $("#prodcode")
let products = [];

//editfunction
editProduct = (id) => {
  const product = products.find(e => e.id === id)
  formName.val(`${product.name}`)
  formPrice.val(`${product.price}`)
  formQuantity.val(`${product.quantity}`)
  formDescription.val(`${product.description}`)
  formImageLink.val(`${product.imageLink}`)
  formCategory.val(`${product.category}`)
  prodCode.val(`${product.code}`)
  rowid.val(id)
}
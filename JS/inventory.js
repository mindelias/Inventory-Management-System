$(document).ready(function () {
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

  //function to help print data on page
  function populate(product) {
    $tr.append(`
      <tr id="${product.id}">
          <td class="column1">${product.name}</td>
          <td class="column2">${product.price}</td>
          <td class="column3">${product.quantity}</td>
          <td class="column4">${product.description}</td>
          <td class="column5">${product.category}</td>
          <td class="column6">
          <div>
              <button class="editButtons" onclick="editProduct(${product.id})" data-toggle="modal" data-target="#exampleModal">
                  <i class="fas fa-marker"></i>
              </button>
              <button id="deleteButton" onclick="deleteProduct(${product.id})">
                  <i class="fas fa-trash"></i>
              </button>
               
          </div>
      </td>
  </tr>`);
  }

  //ajax print db data to page
  function getAllDbDataOnPage() {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/products",
      success: function (response) {
        products = response;
        response.forEach(product => {
          populate(product);
        });

      }
    })
  };
  getAllDbDataOnPage();

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

  //on  clicking submitproduct btn shd update a product using our edit function
  $("#submitProduct").on("click", function (e) {
    e.preventDefault();
    const id = rowid.val()
    const FormData = {
      name: formName.val(),
      price: formPrice.val(),
      quantity: formQuantity.val(),
      description: formDescription.val(),
      category: formCategory.val(),
      
      imageLink: formImageLink.val(),
      
      
      Code: prodCode.val()
    };

    $.ajax({
      type: "PUT",
      url: `http://localhost:3000/products/${id}`,
      data: FormData,
      success: (res) => {
        const product = res;
        $(`#${id}`).empty()
        $(`#${id}`).html(`
          <td class="column1">${product.name}</td>
          <td class="column2">${product.price}</td>
          <td class="column3">${product.quantity}</td>
          <td class="column4">${product.description}</td>
          <td class="column5">${product.category}</td>
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

  $("#addproduct").on("click", function (e) {
    e.preventDefault();
    const FormData = {
      name: formName.val(),
      price: formPrice.val(),
      quantity: formQuantity.val(),
      description: formDescription.val(),
      imageLink: formImageLink.val(),
      category: formCategory.val(),
      Code: prodCode.val()
       
    };
    // $("#addproduct").trigger("reset");
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/products/",
      data: FormData,
      success: (newproduct) => {
        $tr.append(`
      <tr id="${newproduct.id}">
          <td class="column1">${newproduct.name}</td>
          <td class="column2">${newproduct.price}</td>
          <td class="column3">${newproduct.quantity}</td>
          <td class="column4">${newproduct.description}</td>
          <td class="column5">${newproduct.category}</td>
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
      error: function () {
        alert('not added succesfully')
      }
    });
  });


  // delete press delete a product

  deleteProduct = (id) => {
    const product = products.find(e => e.id === id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      // showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "DELETE",
          url: `http://localhost:3000/products/${id}`,
          success: () => {
            $(`#${product.id}`).remove();
            // const Toast = Swal.mixin({
            //   toast: true,
            //   position: "top-end",
            //   showConfirmButton: false,
            //   timer: 3000
            // });
            // Toast.fire({
            //   type: "success",
            //   title: "Deleted successfully"
            // });
          }
        });
      }
    })
  }


})





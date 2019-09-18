$(document).ready(function () {

    //function to help print data on page
    function populateProducts(product) {
      $tr.append(`
        <tr id="${product.id}" data-product='${JSON.stringify(product)}'>
            <td class="column1">${product.code}</td>
            <td class="column2">${product.category}</td>
            <td class="column3">${product.name}</td>
            <td class="column4">${product.price}</td>
            <td class="column5">${product.quantity}</td>
            <td class="column6">
            <div>
                <button class="editButtons" onclick="editProduct(${product})" data-toggle="modal" data-target="#exampleModal">
                    <i class="fas fa-marker"></i>
                </button>
                <button id="deleteButton" onclick="deleteProduct(${product.id})">
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
          response.forEach((product) => {
            populateProducts(product);
          });
          //form table padginatio action call
        //   $('#example').DataTable({
        //     language: {
        //       search: '<button id="searchBtn" type="submit" class="btn btn-search fa fa-search"></button>',
        //       searchPlaceholder: "Search via product name, quantity or product code"
        //     },
        //   });
        }
      })
    };
    getAllDbDataOnPage()
  
    //on edit click update a product
    $("#submitProduct").on("click", function (e) {
      e.preventDefault();
      const id = rowid.val()
      const formData = {
        name: formName.val(),
        description: formDescription.val(),
        qauntity: formQuantity.val(),
        imageLink: formImageLink.val(),
        price: formPrice.val(),
        category: formCategory.val(),
        expireDate: formDate.val()
      };
  
      $.ajax({
        type: "PUT",
        url: `http://localhost:3000/products/${id}`,
        data: formData,
        success: (res) => {
            const product = res;
            $(`#${id}`).empty()
            $(`#${id}`).html(`
            <td class="column1">${product.expireDate}</td>
            <td class="column2">${product.category}</td>
            <td class="column3">${product.name}</td>
            <td class="column4">${product.price}</td>
            <td class="column5">${product.qauntity}</td>
            <td class="column6">
            <div>
                <button id="editButton${product.id}" onclick="editProduct(${product})" data-toggle="modal" data-target="#exampleModal">
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
  
    $("#addProduct").on("click", function (e) {
      e.preventDefault();
    
    
    formName.val(`${product.name}`)
    formCode.val(`${product.code}`)
    formPrice.val(`${product.price}`)
    formQuantity.val(`${product.qauntity}`)
    formDescription.val(`${product.description}`)
    formImageLink.val(`${product.imageLink}`)
    formCategory.val(`${product.category}`)
     
      if (condition) {
        
      }
      const FormData = {
        name: formName.val(),
        description: formDescription.val(),
        qauntity: formQuantity.val(),
        imageLink: formImageLink.val(),
        price: formPrice.val(),
        category: formCategory.val(),
        expireDate: formDate.val()
      };
      $("#addProduct").trigger("reset");
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/products/",
        data: FormData,
        success: () => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000
          });
  
          Toast.fire({
            type: "success",
            title: "Added product successfully"
          });
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
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          $.ajax({
            type: "DELETE",
            url: `http://localhost:3000/products/${id}`,
            success: () => {
              $(`#${product.id}`).remove();
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000
              });
              Toast.fire({
                type: "success",
                title: "Deleted successfully"
              });
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
  const formQuantity = $("#prodQaun");
  const formImageLink = $("#imgLnk");
  const formPrice = $("#price");
  const formCategory = $("#catId");
  const formCode = $("prodcode")
  let products = [];
  
  //editfunction
  editProduct = (product) => {
    formName.val(`${product.name}`)
    formPrice.val(`${product.price}`)
    formQuantity.val(`${product.qauntity}`)
    formDescription.val(`${product.description}`)
    formImageLink.val(`${product.imageLink}`)
    formCategory.val(`${product.category}`)
    formCode.val(`${product.code}`)
    rowid.val(id)
  }
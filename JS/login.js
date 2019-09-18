$(document).ready(function() {
    $("#checklogin").click(function(e) {
      e.preventDefault();
      const userNameInput = $("#username")
      const passwordInput = $("#password")

      const username = userNameInput.val();
      const password = passwordInput.val();

      console.log({username, password});
        if(username.length == 0 && password.length == 0) return
  
      $.ajax({
        type: "GET",
        url: "http://localhost:3000/admin",
        success: function(data) {
            const admin = data[0]

          if (admin.username == username && admin.password == password) {
            localStorage.setItem("username", JSON.stringify({username, password})); 
            window.location = "inventory.html";
          }else{
              // turn html element from display hidden to display block
          }
        }  
      });
  });
});

  
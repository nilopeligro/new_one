/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  //listen for form submit
  document.getElementById('myForm').addEventListener('submit',saveBookmark);
  
  //save bookmark
  function saveBookmark(e){
    
    //get form value
    var siteName =document.getElementById('siteName').value;
    var siteUrl =document.getElementById('siteUrl').value;

    var bookmark = {
      name: siteName,
      url: siteUrl
    }
    
    //local storage test
    localStorage.setItem('test', "Hello World");
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    //prevent flash submit
    e.preventDefault();
  }
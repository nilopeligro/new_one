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
    
      /*
      //local storage test
      localStorage.setItem('test', "Hello World");
      console.log(localStorage.getItem('test'));
      localStorage.removeItem('test');
      console.log(localStorage.getItem('test'));
      */

    //test if bookmarkis null
    if(localStorage.getItem('bookmarks') === null ) {
      //init array
      var bookmarks = [];
      //add to array
      bookmarks.push(bookmark);
      //set to localstorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
      //bookmarks from local storage
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      //add bookmarks to array
      bookmarks.push(bookmark);
      //reset back to localstorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    //prevent flash submit
    e.preventDefault();
  }
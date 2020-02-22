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
    
    
    if(!validateForm(siteName, siteUrl)){
      return false;
    }

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
    
     // Clear form
    document.getElementById('myForm').reset();

    //re-fetch bookmarks
    fetchBookmarks();
    
    //prevent flash submit
    e.preventDefault();
  }
  
  //delete bookmark
  function deleteBookmark(url){
    //get bookmark fron localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i =0;i < bookmarks.length;i++) {
      if(bookmarks[i].url == url) {
        //remove from array
        bookmarks.splice(i, 1);
      }
    }
    //reset back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    //re-fetch bookmarks
    fetchBookmarks();
  }

  //fetch bookmarks
  function fetchBookmarks() {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');
    //build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;

      bookmarksResults.innerHTML += '<div>'+
                                    '<h3>'+name+
                                      '<a target="_blank" href="'+url+'"> Visit</a>'+
                                      '<a onclick="deleteBookmark(\''+url+'\')"href="#"> Delete</a>'
                                    '</h3>'+
                                    '</div>'
    }
  }

  // Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}
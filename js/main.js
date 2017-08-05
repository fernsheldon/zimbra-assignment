"use strict"

var client = new HttpClient();
var saveButton = document.getElementById('saveContactButton');
var cancelButton = document.getElementById('cancelContactButton');

saveButton.style.display = 'none';
cancelButton.style.display = 'none';

client.get('https://randomuser.me/api?results=' + TOTAL_USERS, function(response) {

    var tempArray = JSON.parse(response).results;

    for(var counter=0; counter<tempArray.length; counter++){
      USER_ARRAY.push(new Contact(tempArray[counter]));
    }

    USER_ARRAY.sort(compareFirstName);

    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("USER_ARRAY", USER_ARRAY);
    } else {
        // CRAP!
    }


    generateList(); //generate the list of the users.
});



/**
 * The filter method used to search for
 * Contacts via the Search box provided.
 */
function filterContacts(){

  var searchBox = document.getElementById("searchBox");

  if(searchBox.value.length>1){

    var subSetContacts = USER_ARRAY.filter(function(contact){
      return contact.getFullName().toLowerCase().indexOf(searchBox.value.toLowerCase()) > -1;
    });

    console.log("result of filter",subSetContacts);
    generateList(subSetContacts);

  }else if(searchBox.value.length==0){
    generateList(USER_ARRAY);
  }

}



/**
 * Function that creates the "Add Contact"
 * button at the top of the contact list
 *
 */
function setupAddContact(){

  var ul = document.getElementById("contactList");

  //Create li element
  var li = document.createElement("li");
  li.className = 'addContact';

  //Create, set, and add image element
  var imageElement = document.createElement("img");
  imageElement.setAttribute("src", "img/add.png");
  imageElement.className = 'addIcon';

  li.appendChild(imageElement);
  li.appendChild(document.createTextNode("Add contact"));
  li.addEventListener('click', function() {
      addContact()
  });

  ul.appendChild(li);

}


/**
 * Function to create the list of contacts.
 *
 * @param  {Array} subSetContacts A subset of all Contacts
 */
function generateList(subSetContacts) {

    var ul = document.getElementById("contactList");
    var oldContact = document.querySelectorAll(".singleContact");
    var contactList = [];

    while(ul.firstChild){
      ul.removeChild(ul.firstChild);
    }

    setupAddContact();

    if(subSetContacts=='undefined' || subSetContacts == null){
      contactList = USER_ARRAY;
    }else{
      contactList = subSetContacts;
    }

    for (var counter = 0; counter < contactList.length; counter++) {

        //Create li element
        var li = document.createElement("li");
        li.className = 'singleContact';
        li.id = counter;

        //Create, set, and add image element
        var imageElement = document.createElement("img");
        imageElement.setAttribute("src", contactList[counter].picture.thumbnail);
        imageElement.className = 'portfolioImage';

        li.appendChild(imageElement);
        li.appendChild(document.createTextNode(contactList[counter].getName()));
        li.addEventListener('click', function() {
            setSelectedContact(contactList[this['id']]);
            console.log("thissssss",this);

        });

        ul.appendChild(li);
    }
}


/**
 * Fuction that makes the Contacts detail form editble
 * and adds the placeholders for all the input fields.
 */
function addContact() {

    var email = document.getElementById('emailBlock').getElementsByTagName('input')[0];
    var phone = document.getElementById('phoneBlock').getElementsByTagName('input')[0];
    var im = document.getElementById('imBlock').getElementsByTagName('input')[0];
    var address = document.getElementById('addressBlock').getElementsByTagName('input')[0];
    var url = document.getElementById('urlBlock').getElementsByTagName('input')[0];
    var other = document.getElementById('otherBlock').getElementsByTagName('input')[0];
    var name = document.getElementById('selctedContactName');
    var imageElement = document.querySelector(".selectedContactImg");
    var saveButton = document.getElementById('saveContactButton');
    var cancelButton = document.getElementById('cancelContactButton');

    saveButton.setAttribute('class','button save');
    cancelButton.setAttribute('class','button cancel');
    saveButton.style.display = '';
    cancelButton.style.display = '';

    imageElement.src = 'img/noImage.png';

    email.readOnly = false;
    email.value = '';
    email.placeholder = 'sample@example.com';

    address.readOnly = false;
    address.value = '';
    address.placeholder = 'Sample Road, and Imaginary City, 99999, Awesome Country';
    phone.readOnly = false;
    phone.value = '';
    phone.placeholder = '5555555';

    im.readOnly = false;
    im.value = ''
    im.placeholder = 'Add the the IM username';

    url.readOnly = false;
    url.value = '';
    url.placeholder = 'Add a URL here';

    other.readOnly = false;
    other.value = '';
    other.placeholder = 'January 1, 1970'

    name.readOnly = false;
    name.value = '';
    name.placeholder = '[Title] [First Name] [Last Name]';

}


/**
 * This function is called when the user selects
 * one of the contacts from the contact list.
 *
 * @param {Object} contactObject A Contact object
 */
function setSelectedContact(contactObject) {

    setContactHeader(contactObject); //Set up the header
    setContactBody(contactObject); // Set up the body
    setContactChoice(contactObject); //Record the choice of the user
}


/**
 * This functions sole purpose is to record the
 * last choice that the user has selelcted.
 *
 * @param {Object} contactObject A Contact object
 */
function setContactChoice(contactObject){
  CONTACT_CHOICE = contactObject;
}


/**
 * Fucntion that setup the header.
 *
 * @param {Object} contactObject A Contact object
 */
function setContactHeader(contactObject) {

    var nameElement = document.getElementById('selctedContactName');
    var imageElement = document.querySelector(".selectedContactImg");

    nameElement.value = contactObject.getFullName();
    imageElement.src = contactObject.picture.medium;
}


/**
 * Function that setup the body/form which displays
 * all the details of the contact.
 *
 * @param {Object} contactObject A Contact object
 */
function setContactBody(contactObject) {

    var email = document.getElementById('emailBlock').getElementsByTagName('input');
    var phone = document.getElementById('phoneBlock').getElementsByTagName('input');
    var im = document.getElementById('imBlock').getElementsByTagName('input');
    var address = document.getElementById('addressBlock').getElementsByTagName('input');
    var url = document.getElementById('urlBlock').getElementsByTagName('input');
    var other = document.getElementById('otherBlock').getElementsByTagName('input');

    email[0].value = contactObject.email;
    phone[0].value = contactObject.cell;
    im[0].value = contactObject.login.username;
    address[0].value = contactObject.getAddress();
    other[0].value = new Date(contactObject.dob);
    url[0].value = "www.zimbra.com"

}

/**
 * Function to save the details of the new contact
 * tha the user has created.
 *
 */
function saveContact(){

  saveButton.style.display = 'none';
  cancelButton.style.display = 'none';

  var email = document.getElementById('emailBlock').getElementsByTagName('input')[0];
  var phone = document.getElementById('phoneBlock').getElementsByTagName('input')[0];
  var im = document.getElementById('imBlock').getElementsByTagName('input')[0];
  var address = document.getElementById('addressBlock').getElementsByTagName('input')[0];
  var url = document.getElementById('urlBlock').getElementsByTagName('input')[0];
  var other = document.getElementById('otherBlock').getElementsByTagName('input')[0];
  var name = document.getElementById('selctedContactName');

  name = name.value.split(' ')

  //a temp object to save the details.

  var tempContactObj = {
    "name":{'first':name[1],'last':name[2],'title':name[0]},
    "dob": other.value,
    "email" : email.value,
    "cell" : phone.value,
    "login" : im.value,
    "picture" : {'large':'img/noImage.png','medium':'img/noImage.png','thumbnail':'img/noImage.png'},
    "location" : address.value,
    "url" : url.value
  }

  USER_ARRAY.push(new Contact(tempContactObj));
  USER_ARRAY.sort(compareFirstName);
  generateList();


  // Rest the body after saving the contact.
  resetBody();
}


function cancelSave(){
  saveButton.style.display = 'none';
  cancelButton.style.display = 'none';
  resetBody();
}


/**
 * Function used to reset the body back to an uneditable fields
 * and put back the last contact that selected before adding a
 * user.
 *
 */
function resetBody(){

      setSelectedContact(CONTACT_CHOICE);

      var email = document.getElementById('emailBlock').getElementsByTagName('input')[0];
      var phone = document.getElementById('phoneBlock').getElementsByTagName('input')[0];
      var im = document.getElementById('imBlock').getElementsByTagName('input')[0];
      var address = document.getElementById('addressBlock').getElementsByTagName('input')[0];
      var url = document.getElementById('urlBlock').getElementsByTagName('input')[0];
      var other = document.getElementById('otherBlock').getElementsByTagName('input')[0];
      var name = document.getElementById('selctedContactName');

      email.readOnly = true;
      phone.readOnly = true;
      im.readOnly = true;
      address.readyState = true;
      url.readOnly = true;
      other.readOnly = true;
      name.readOnly = true;

}

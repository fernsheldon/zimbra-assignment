"use strict"

/**
 * Contacts is the object type from which each contact will be created.
 * @param {Object} contactObj This is the object that we get from the API
 * @constructor
 */

function Contact(contactObj) {

    var SPACE = " " //empty space
    var COMMA = ",";

    this.name =  contactObj.name;
    this.dob = contactObj.dob;
    this.email = contactObj.email;
    this.cell = contactObj.cell;
    this.login = contactObj.login;
    this.picture = contactObj.picture;
    this.address = contactObj.location;
    this.url = '';


    /**
     * Gets the address of the users.
     * @return {String} Address string of the user.
     */
    this.getAddress = function() {

      if(typeof this.address  == 'object'){
        return this.address.street + COMMA + SPACE +
            this.address.state + COMMA + SPACE +
            this.address.city + COMMA + SPACE +
            this.address.postcode;
      }else{
        return this.address;
      }



    }

      /**
       * Helper functio that will format the name by making the first
       * letter capital the rest of the string in lower case.
       *
       * @param  {String} nameString The username in string format
       * @return {String}            The formated name in string format
       */
      this.formatName = function(nameString) {

          if (typeof(nameString) === 'string') {
              return nameString.charAt(0).toUpperCase() + nameString.substring(1, nameString.length).toLowerCase();
          } else {
              return '';
          }
      }

      /**
       * Function to provide the full name of the contact.
       * @return {String} Returns the full name of the contact with Title.
       */
      this.getFullName = function(){
        var lastName = this.formatName(this.name.last);
        var firstName = this.formatName(this.name.first);
        var title = this.formatName(this.name.title);

        return title+'.'+ SPACE + firstName + SPACE + lastName;
      }

      /**
       * Function that will return the name in the "Last, Frist" name format
       * @return {String} Returns the name of the user in String format.
       */
      this.getName = function() {

              var lastName = this.formatName(this.name.last);
              var firstName = this.formatName(this.name.first);
              var title = this.formatName(this.name.title);

              return lastName + ',' + SPACE + firstName;

      }
}

/**
 * Comparitor function that is needed that
 * will help sort the Contacts Array
 * @param  {Contact} a Contact object
 * @param  {Contact} b Contact object
 * @return {Number}   0, -1, or 1 .
 */
function compareFirstName(a, b) {
    if (a.name.first.toLowerCase() < b.name.first.toLowerCase())
        return -1;
    if (a.name.first.toLowerCase() > b.name.first.toLowerCase())
        return 1;
    return 0;
}

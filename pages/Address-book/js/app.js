//Built with only Javascript no Additional Plugins used

//This function  creates a new instance of an object
//Or uses the exiting instance changing the elem
function $$(elem) {
    if (!(this instanceof $$)) {
        return new $$(elem);
    }else {
        this.elem = elem;
    }
}

//This prototype returns an element set to a property and the value
$$.prototype = {
    setAttr: function (prop, value) {
        this.elem[prop] = value;
        return this;
    }
};


//var to store the AddressBook object
var AddressBook = {
    //returns an element Node with a specified elem name
    createElement: function (elem) {
        return document.createElement(elem);
    },
    //appends tha child to the parent element
    addChildElement: function (element, child) {
        element.appendChild(child);
    },
    //Create Elements and Append the the form the the contactDiv(modal-content)
    createContact: function () {
        var form = this.createElement("form");
        //Stop the form from geting submitted
        form.setAttribute('onsubmit', "event.preventDefault()");
        var fieldSet = this.createElement("fieldset");
        var legend = this.createElement("legend");
        var firstNameLabel = this.createElement("label");
        var lastNameLabel = this.createElement("label");
        var firstNameInput = this.createElement("input");
        var lastNameInput = this.createElement("input");
        var phoneLabel = this.createElement("label");
        var phoneInput = this.createElement("input");
        //Modify the phone number input
        phoneInput.setAttribute("onKeyDown","AddressBook.modify(event)");
        var button = this.createElement("button");
        //Add the onclick event handler to add the contact to the addressBook
        button.setAttribute("onclick","AddressBook.addContact()");
        var contactDiv = document.getElementById("add-contact");
        $$(form).setAttr("className","container");
        $$(legend).setAttr("innerHTML","Add New Contacts");
        $$(firstNameLabel).setAttr("for","first-name").setAttr("innerHTML","First Name:");
        $$(lastNameLabel).setAttr("for","last-name").setAttr("innerHTML","Last Name:");
        $$(firstNameInput).setAttr("id", "first-name").setAttr("type","text").setAttr("name","first_name");
        $$(lastNameInput).setAttr("id", "last-name").setAttr("type","text").setAttr("name","last_name");
        $$(phoneLabel).setAttr("for", "phone-num").setAttr("innerHTML","PhoneNumber: ");
        $$(phoneInput).setAttr("type","tel").setAttr("id","phone-num").setAttr("name","tel").setAttr("placeholder","10 digit Number");
        $$(phoneInput).setAttr("maxLength","14");
        $$(button).setAttr("innerHTML","Add");
        var children = [legend, firstNameLabel, firstNameInput, lastNameLabel, lastNameInput, phoneLabel, phoneInput, button];
        for(var i=0 ; i < children.length; i++){
            this.addChildElement(fieldSet,children[i]);
        }
        this.addChildElement(form, fieldSet);
        this.addChildElement(contactDiv, form);
        document.getElementsByClassName("modal")[0].style.display = "block";
    },
    closeModal: function () {
        //Method to hide the modal and remove the appended form element
        var form = document.getElementsByTagName("form")[0];
        document.getElementById("add-contact").removeChild(form);
        document.getElementsByClassName("modal")[0].style.display = "none";
    },
    modify: function (event){
        //Method to modify the phone number
        var phoneNumber = document.getElementById("phone-num");
        if ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode < 106 && event.keyCode > 95)) {
            phoneNumber.value = phoneNumber.value.replace(/^(\d{3})(\d{3})(\d)+$/, "($1) $2-$3");
            return true;
        }
        //remove all chars, except dash and digits
        phoneNumber.value = phoneNumber.value.replace(/[^\-0-9]/g, '');
    },
    //Methhod to add a textnode to each table data
    addData: function (element, data) {
        for (var i=0; i < data.length; i++){
            var text = document.createTextNode(data[i]);
            element[i].appendChild(text);
        }
    },
    //Method to AddContact details to the table prompt the user with a red border indicating error with field data
    addContact: function () {
        //regular expression to check the pattern of the phone number
        var re  = new RegExp("^[(]{0,1}[0-9]{3}[)]{0,1}[-\\s\\.]{0,1}[0-9]{3}[-\\s\\.]{0,1}[0-9]{4}$");
        var tableBody = document.getElementById("contact-list");
        var firstName = document.getElementById("first-name");
        var lastName = document.getElementById("last-name");
        var phoneNumber = document.getElementById("phone-num");

        if (!(firstName.value !== "" && lastName.value !== "" && re.test(phoneNumber.value))) {
            this.redBorder(firstName);
            this.redBorder(lastName);
            (!re.test(phoneNumber.value)) ? phoneNumber.style.border = "2px solid red" : phoneNumber.style.border = "" ;
        } else {
            var tr = this.createElement("tr");
            tr.setAttribute('onclick',"AddressBook.selectRow(this)");
            var checkbox = this.createElement("input");
            $$(checkbox).setAttr("type","checkbox").setAttr("className","contact-info");
            var selectBox = this.createElement("td");
            selectBox.appendChild(checkbox);
            var first = this.createElement("td");
            var last = this.createElement("td");
            var phone = this.createElement("td");
            var children = [selectBox, first, last, phone];
            for(var i=0 ; i < children.length; i++){
                this.addChildElement(tr,children[i]);
            }
            var data = [firstName.value, lastName.value, phoneNumber.value];
            var element = [first, last, phone];
            this.addData(element, data);
            tableBody.appendChild(tr);
            this.closeModal();
        }
    },
    //Method to display a red border
    redBorder: function (element) {
        (element.value === "") ? element.style.border = "2px solid red" : element.style.border = "" ;
    },
    //Method to add sort to the table columns
    sortTable: function (table, col, reverse) {
        var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
            tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
            i;
        reverse = -((+reverse) || -1);
        tr = tr.sort(function (a, b) { // sort rows
            return reverse // `-1 *` if want opposite order
                * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                        .localeCompare(b.cells[col].textContent.trim())
                );
        });
        for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order

    },
    //Method to add eventListner to the tHead on click sort the table
    makeSortable: function (table) {
        var th = table.tHead, i;
        th && (th = th.rows[0]) && (th = th.cells);
        if (th) i = th.length;
        else return; // if no `<thead>` then do nothing
        while (--i > 0) (function (i) {  //Sort <thead> not first index
            var dir = 1;
            th[i].addEventListener('click', function () {
                AddressBook.sortTable(table, i, (dir = 1 - dir));
                th[i].className = th[i].className != "icon-up" ? "icon-up" : "icon-down";
            });
        }(i));
    },
    selectCheckbox:{

    },
    //Method to get the table and pass it the the makeSortable method
    makeAllSortable: function (parent) {
        parent = parent || document.body;
        var t = parent.getElementsByTagName('table')[0];
        this.makeSortable(t);
    },
    //Method used to toggle the select all checkboxes
    toggle: function (source) {
        var checkboxes = document.getElementsByClassName('contact-info');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = source.checked;
        }
    },
    //Method to delete the selected contact from the table
    deleteContact: function () {
        var checkboxes = document.getElementsByClassName('contact-info');
        var contactList = document.getElementById("contact-list");
        var length = contactList.children.length;
        while(length >= 0){
            if (checkboxes[length - 1] !== undefined && checkboxes[length - 1].checked) {
                contactList.deleteRow(length - 1);
            }
            length--;
        }
    },
    //Add a select row Method checks the checkbox on the row to selected
    selectRow: function(row)
    {
        var firstInput = row.getElementsByTagName('input')[0];
        firstInput.checked = !firstInput.checked;
    }
};

window.onload = function () {
    //Make the Table sortable on window load load
    AddressBook.makeAllSortable();
};

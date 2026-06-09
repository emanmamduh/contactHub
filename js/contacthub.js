// ? =================================== Variables ======================================
// ===================Form Inputs ====================== //
var contactImg = document.getElementById("avatarInput");
var contactName = document.getElementById("nameInput");
var contactPhone = document.getElementById("phoneNumberInput");
var contactEmail = document.getElementById("emailInput");
var contactAddress = document.getElementById("addressInput");
var contactSelect = document.getElementById("groupSelect");
var contactNotes = document.getElementById("notesInput");
var contactFav = document.getElementById("favoriteCheck");
var contactEmg = document.getElementById("emergencyCheck");
// ----------------------------------------------------------------- //
// ======================== Form Btns ======================= //
var formTitle = document.getElementById("formTitle");
var addFormBtn = document.getElementById("addFormBtn");
var updateFormBtn = document.getElementById("updateFormBtn");
// ----------------------------------------------------------------- //
// ======================== Contacts Counters ======================= //
var totlalCounter = document.getElementById("totlalCounter");
var favoritesCounter = document.getElementById("favoritesCounter");
var emergencyCounter = document.getElementById("emergencyCounter");
var contactsNo = document.getElementById("contactsNo"); //search Counter
// ----------------------------------------------------------------- //
var contentView = document.getElementById("contentView");
var contactCategoryEmg = document.getElementById("contactCategoryEmg");
var favContacts = document.getElementById("favContacts");
var emgContacts = document.getElementById("emgContacts");
// ----------------------------------------------------------------- //
// =================== Card FavBTNs (unused) ====================== //
var favBadge = document.getElementById("favBadge");
var favBtn = document.getElementById("favBtn");
var favCheckedBtn = document.getElementById("favCheckedBtn");
// --------------------------------------------------------//
var updatedIndex = 0;
var searchInput = document.getElementById("searchInput");
var inputValidationList = document.querySelectorAll("form .input-validation");
var errorMsgList = document.querySelectorAll(".error-msg");
var contactEmailError = document.getElementById("contactEmailError");
// ----------------------------------------------------------------- //
// * Data
var contactsList = JSON.parse(localStorage.getItem("contactsList")) || [];
var favoritesList = [];
var emergencyList = [];
var favCount = 0;
var favContactsContainer = "";
var duplicateNum = 0;
// ******************************************************************************/
function clearContactForm() {
  contactImg.value = "";
  contactName.value = "";
  contactPhone.value = "";
  contactEmail.value = "";
  contactAddress.value = "";
  contactSelect.value = "";
  contactNotes.value = "";
  contactFav.checked = false;
  contactEmg.checked = false;
}
function openAddForm() {
  clearContactForm();
  // for (var i = 0; i < errorMsgList.length; i++) {
  // errorMsgList[i].classList.replace("d-block","d-none");
  // if(errorMsgList[i].classList.contains())
  // }
  contactEmailError.classList.replace("d-block", "d-none");

  updateFormBtn.classList.add("d-none");
  addFormBtn.classList.remove("d-none");
  console.log("btn pressed");
  formTitle.innerText = "Add new contact";
}
function closeModal() {
  var formModal = document.getElementById("formModal");
  var bsModal = bootstrap.Modal.getOrCreateInstance(formModal);
  bsModal.hide();
}
function validateContact(input) {
  var regex = {
    nameInput: /^([a-zA-Z\s]{2,50})$/gm,
    phoneNumberInput: /^01[0-25][0-9]{8}$/,
    emailInput: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };

  if (regex[input.id].test(input.value)) {
    if (input.nextElementSibling.classList.contains("d-block"))
      console.log("match");
    input.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    // console.log("not match");
    input.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
// * VALIDATION INPUTS
for (var i = 0; i < inputValidationList.length; i++) {
  inputValidationList[i].addEventListener("input", function () {
    validateContact(this);
  });
}
function contactLabel(personName) {
  if (!personName) return "";
  var name = personName;
  // var name = contact.name;
  var contactNameArr = name.split(" ");
  var firstName = contactNameArr[0];
  var firstNameArr = firstName.split("");
  if (contactNameArr.length !== 1) {
    // if (contactNameArr[contactNameArr.length - 1] !== ) {
    // }
    var lastName = contactNameArr[contactNameArr.length - 1];
    var lastNameArr = lastName.split("");
    var label = firstNameArr[0] + lastNameArr[0];
    return label;
  } else {
    return firstNameArr[0];
  }
}
function favBtnPress(contactIndex) {
  console.log("favToggle pressed");

  console.log(contactsList[contactIndex].isFavorite);
  contactsList[contactIndex].isFavorite =
    !contactsList[contactIndex].isFavorite;
  console.log(contactsList[contactIndex].isFavorite);
  console.log("favToggle finish");

  displayData();
}

function emgBtnPress(contactIndex) {
  console.log("emgToggle pressed");

  console.log(contactsList[contactIndex].isEmergency);
  contactsList[contactIndex].isEmergency =
    !contactsList[contactIndex].isEmergency;
  console.log(contactsList[contactIndex].isEmergency);
  console.log("emgToggle finish");
  displayData();
}
function contactGroupCheck(contact) {
  if (!contact.group) return `<span id="contactCategoryFav"></span>`;

  if (contact.group.toLowerCase() === "friends".toLowerCase()) {
    return `<span id="contactCategoryFav" class="green-100 green-700 fnt-sz-11 text-capitalize pxy rounded-2 fw-medium">
                            friends </span>`;
  } else if (contact.group.toLowerCase() === "work".toLowerCase()) {
    return `  <span id="contactCategoryWork" class="purple-100 purple-700 fnt-sz-11 text-capitalize pxy rounded-2 fw-medium">
                            work </span>`;
  } else if (contact.group.toLowerCase() === "family".toLowerCase()) {
    return ` <span
                            id="contactCategoryFam"
                            class="blue-100 blue-700 fnt-sz-11 text-capitalize pxy rounded-2 fw-medium"
                          >
                            family
                          </span>`;
  } else if (contact.group.toLowerCase() === "school".toLowerCase()) {
    return `  <span
                            id="contactCategorySchool"
                            class="amber-100 amber-700 fnt-sz-11 text-capitalize pxy rounded-2 fw-medium"
                          >
                            school
                          </span>`;
  } else if (contact.group.toLowerCase() === "other".toLowerCase()) {
    return `                                               <span
                            id="contactCategorySchhol"
                            class="gray-100 gray-700 fnt-sz-11 text-capitalize pxy rounded-2 fw-medium"
                          >
                            other
                          </span>`;
  } else {
    return `  <span
                            id="contactCategorySchhol"
                            class="d-none gray-100 gray-700 fnt-sz-11 text-capitalize pxy rounded-2 fw-medium"
                          >
                            others
                          </span>`;
  }
}
function displayData() {
  var allContactsContainer = "";
  var favContactsContainer = "";
  var emgContactsContainer = "";
  var favCount = 0;
  var emgCount = 0;

  if (contactsList.length === 0) {
    allContactsContainer = `<div
                    class="empty-agenda d-flex flex-column align-items-center justify-content-center"
                  >
                    <div
                      class="icon-wrapper gray-100 d-flex justify-content-center align-items-center mb-3"
                    >
                      <i class="fa-solid fa-address-book gray-300"></i>
                    </div>
                    <p class="m-0 gray-500 fw-medium">No contacts found</p>
                    <p class="m-0 gray-400 fnt-sz-14 mt-1">
                      Click "Add Contact" to get started
                    </p>
                  </div>`;
  }
  for (var i = 0; i < contactsList.length; i++) {
    if (contactsList[i].isFavorite) {
      favCount++;
      favContactsContainer += `  <div
                        id="fContact"
                        class="fav-contact gray-50 pxy-fav rounded-3 d-flex gap-3"
                      >
                        <div
                          class="contact-label text-uppercase fw-semibold text-white favContact shadow-sm rounded-3 fnt-sz-15 w-h-38 d-flex justify-content-center align-items-center"
                        >
                          ${contactLabel(contactsList[i].name)}
                        </div>
                        <div class="contact-details">
                          <div
                            class="Cname text-capitalize fnt-sz-14 fw-medium gray-900"
                          >
                            ${contactsList[i].name}
                          </div>
                          <div class="Cnumber d-flex gap-2 align-items-center">
                            <span id="contactPhoneNum" class="gray-500 fnt-sz-12">
                             ${contactsList[i].phone}
                            </span>
                          </div>
                        </div>
                        <div
                          class="phone-icon w-h-32 fnt-sz-12 embrald-100 embrald-600 d-flex justify-content-center align-items-center rounded-2 ms-auto"
                        >
                          <i class="fa-solid fa-phone"></i>
                        </div>
                      </div>`;
    }

    if (contactsList[i].isEmergency) {
      emgCount++;
      emgContactsContainer += `  <div
                      id="egContact"
                      class="emg-contact gray-50 pxy-fav rounded-3 d-flex gap-3"
                    >
                      <div
                        class="contact-label text-uppercase fw-semibold text-white favContact shadow-sm rounded-3 fnt-sz-15 w-h-38 d-flex justify-content-center align-items-center"
                      >
                        ${contactLabel(contactsList[i].name)}
                      </div>
                      <div class="contact-details">
                        <div
                          class="Cname text-capitalize fnt-sz-14 fw-medium gray-900"
                        >
                          ${contactsList[i].name}
                        </div>
                        <div class="Cnumber d-flex gap-2 align-items-center">
                          <span id="contactPhoneNum" class="gray-500 fnt-sz-12">
                            ${contactsList[i].phone}
                          </span>
                        </div>
                      </div>
                      <div
                        class="phone-icon w-h-32 fnt-sz-12 rose-100 rose-600 d-flex justify-content-center align-items-center rounded-2 ms-auto"
                      >
                        <i class="fa-solid fa-phone"></i>
                      </div>
                    </div>`;
    }

    allContactsContainer += `<div class="col-12 col-md-6 mb-3">
                    <div
                      class="contact-card h-100 bg-white border-grey-100 rounded-4 overflow-hidden">
                      <header
                        class="card-header d-flex gap-3 align-items-center p-3">
                        <div class="contact-avatar">
                          <div
                            class="contact-label text-uppercase fw-semibold text-white favContact shadow-sm rounded-3 fnt-sz8">
                            ${contactLabel(contactsList[i].name)}
                          </div>
                          <div
                            id="favBadge"
                            class="fav-badge ${contactsList[i].isFavorite ? "d-flex" : "d-none"}  c-badge amber-400 text-white"
                          >
                            <i class="fa-solid fa-star"></i>
                          </div>

                          <div
                            id="emgBadge"
                            class="emg-badge ${contactsList[i].isEmergency ? "d-flex" : "d-none"} c-badge rose-500 text-white"
                          >
                            <i class="fa-solid fa-heart-pulse"></i>
                          </div>
                        </div>
                        <div class="contact-details d-flex flex-column gap-1">
                          <div
                            class="Cname text-capitalize fw-semibold gray-900"
                          >
                            ${contactsList[i].name}
                          </div>
                          <div class="Cnumber d-flex gap-2 align-items-center">
                            <div
                              class="phone-icon w-h-26 fnt-sz-9 blue-100 blue-600 d-flex justify-content-center align-items-center rounded-2">
                              <i class="fa-solid fa-phone"></i>
                            </div>
                            <span
                              id="contactPhoneNum"
                              class="gray-500 fnt-sz-14"
                              >
                              ${contactsList[i].phone}
                              </span
                            >
                          </div>
                        </div>
                      </header>

                    <div class="card-body d-flex flex-column gap-3 p-3 pt-0">
                        <div class="Cemail ${contactsList[i].email !== "" ? "d-flex" : "d-none"} gap-2 align-items-center">
                          <div class="msg-icon violet-100 violet-600 d-flex justify-content-center align-items-center w-h-26 fnt-sz-10 rounded-2">
                            <i class="fa-solid fa-envelope"></i>
                          </div>
                          <span id="contactEmail" class="gray-600 fnt-sz-14"
                            >${contactsList[i].email}</span>
                        </div>

                        <div class="Clocation ${contactsList[i].address !== "" ? "d-flex" : "d-none"} gap-2 align-items-center">
                          <div class="location-icon w-h-26 fnt-sz-10 embrald-100 embrald-600 d-flex justify-content-center align-items-center rounded-2">
                            <i class="fa-solid fa-location-dot"></i>
                          </div>
                          <span id="contactLocation" class="gray-600 fnt-sz-14">
                          ${contactsList[i].address}
                          </span>
                         </div>

                         <div class="C-category d-flex flex-wrap gap-2 mt-2">
                         ${contactGroupCheck(contactsList[i])}
                          <span
                            id="contactCategoryEmg"
                            class="${contactsList[i].isEmergency ? "d-block" : "d-none"} rose-50 rose-600 fnt-sz-11 text-capitalize pxy rounded-2 fw-medium"
                          >
                            <i class="fa-solid fa-heart-pulse fnt-sz-10"></i>
                            Emergency
                          </span>

                        </div>
                      </div>

                      <footer
                        class="card-footer mt-auto custom-bg-gray-modern p-2 px-3 d-flex align-items-center justify-content-between">
                        <div class="actions d-flex gap-2">
                          <button
                            class="phone-btn border-0 d-flex justify-content-center align-items-center w-h-38 embrald-50 embrald-600 rounded-2"
                          >
                            <i class="fa-solid fa-phone fnt-sz-14"></i>
                          </button>
                          <button
                            class="email-btn border-0  ${contactsList[i].email !== "" ? "d-flex" : "d-none"} justify-content-center align-items-center w-h-38 violet-50 violet-600 rounded-2"
                          >
                            <i class="fa-solid fa-envelope fnt-sz-14"></i>
                          </button>
                        </div>
                        <div class="quick-actions-btns">
                          <button
                          onclick="favBtnPress(${i})"
                            id="favBtn"
                            class="fav-btn ${!contactsList[i].isFavorite ? "d-inline-block" : "d-none"} border-0 gray-50 gray-400"
                          >
                            <i class="fa-regular fa-star fnt-sz-15"></i>
                          </button>
                           <button
                           onclick="favBtnPress(${i})"
                            id="favCheckedBtn"
                            class="fav-checked-btn ${contactsList[i].isFavorite ? "d-inline-block" : "d-none"} border-0 amber-50 text-amber-400"
                          >
                            <i class="fa-solid fa-star fnt-sz-15"></i>
                          </button>
                          <button
                          onclick="emgBtnPress(${i})"
                            id="emgBtn"
                            class="emg-btn ${!contactsList[i].isEmergency ? "d-inline-block" : "d-none"} border-0 gray-50 gray-400"
                          >
                            <i class="fa-regular fa-heart fnt-sz-15"></i>
                          </button>
                           <button
                           onclick="emgBtnPress(${i})"
                            id="emgCheckedBtn"
                            class="emg-checked-btn ${contactsList[i].isEmergency ? "d-inline-block" : "d-none"} border-0 rose-50 text-rose-500"
                          >
                            <i class="fa-solid fa-heart-pulse fnt-sz-15"></i>
                          </button>
                            <button
                            onclick="editContact(${i})"
                            type="button"
                            class="edit-btn border-0 gray-50 gray-500"
                            data-bs-toggle="modal"
                            data-bs-target="#formModal"
                          >
                            <i class="fa-solid fa-pen fnt-sz-15"></i>
                          </button>

                       <button
                        onclick="deleteContactConfirmation(${i})"
                            type="button"
                            id="deleteBtn"
                            class="delete-btn border-0 gray-50 gray-500"
                          >
                            <i class="fa-solid fa-trash fnt-sz-15"></i>
                          </button>

                        </div>
                      </footer>

                    </div>
                  </div>`;
  }
  if (favContactsContainer === "") {
    favContactsContainer = `<div id="emptyFavContacts" class="empty-favourites-contacts bg-white fnt-sz-14 gray-400 d-flex justify-content-center align-items-center h-150 p-3">
                    No favorites yet
                  </div>`;
  }
  if (emgContactsContainer === "") {
    emgContactsContainer = `<div
                     id="emptyEmgContacts"
                    class="empty-emergency-contacts bg-white fnt-sz-14 gray-400 d-flex justify-content-center align-items-center p-3 h-150"
                  >
                    No emergency contacts
                  </div>`;
  }
  contentView.innerHTML = allContactsContainer;
  totlalCounter.innerText = contactsList.length;
  favContacts.innerHTML = favContactsContainer;
  favoritesCounter.innerText = favCount;
  emergencyCounter.innerText = emgCount;
  emgContacts.innerHTML = emgContactsContainer;

  contactsNo.innerText = contactsList.length;
}
function addContactConfirmation() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Added",
    text: "Contact has been added successfully",
    showConfirmButton: false,
    timer: 1500,
  });
}
function addContact() {
  console.log("add in");

  if (
    !validateContact(contactName) &&
    !validateContact(contactPhone) &&
    !validateContact(contactEmail)
  ) {
    Swal.fire({
      icon: "error",
      title: "Missing Name",
      text: "Please enter a name for the contact!",
    });
    console.log("this if the big one");
    return;
  }
  if (!validateContact(contactName)) {
    if (contactName.value === "") {
      Swal.fire({
        icon: "error",
        title: "Missing Name",
        text: "Please enter a name for the contact!",
      });
      console.log("sigle check name first cond");
      return;
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Name",
        text: "Please enter a valid name (at least first and last name, letters only)!",
      });
      return; // بيفرمل هنا فوراً لو الاسم فيه أرقام أو ناقص، ومبيكملش باقي الدالة!
    }
  }

  if (!validateContact(contactPhone)) {
    if (contactPhone.value === "") {
      Swal.fire({
        icon: "error",
        title: "Missing Phone",
        text: "Please enter a phone number!",
      });
      return;
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone",
        text: `Please enter a valid Egyptian phone number (e.g., ${contactPhone.value} or +2${contactPhone.value})`,
      });
      return;
    }
  }
  if (contactEmail.value !== "" && !validateContact(contactEmail)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address",
    });
    return;
  }
  // if i write clear here >> that's mean > clear inputs before storing them
  var newContact = {
    img: contactImg.value,
    name: contactName.value.trim(),
    phone: contactPhone.value,
    email: contactEmail.value,
    address: contactAddress.value,
    group: contactSelect.value,
    notes: contactNotes.value,
    isFavorite: contactFav.checked,
    isEmergency: contactEmg.checked,
  };

  if (checkPhoneDuplication(newContact)) {
    return;
  }

  contactsList.push(newContact);
  localStorage.setItem("contactsList", JSON.stringify(contactsList));
  console.log("add done");
  displayData();

  clearContactForm();
  closeModal();
  addContactConfirmation();

  console.log("addition done");
}

function checkPhoneDuplication(newContact, currentIndex = -1) {
  var duplicatedIndex = contactsList.findIndex(
    (item, index) => item.phone === newContact.phone && index !== currentIndex,
  );
  if (duplicatedIndex !== -1) {
    Swal.fire({
      icon: "error",
      title: "Duplicate Phone Number",
      text: `A contact with this phone number already exists: ${contactsList[duplicatedIndex].name}`,
    });
    return ture;
  }
  return false;
}

function editContact(contactIndex) {
  // function setContactForm(contactIndex) {
  formTitle.innerText = "Edit contact";
  contactName.value = contactsList[contactIndex].name;
  console.log(contactName.value);
  contactPhone.value = contactsList[contactIndex].phone;
  contactEmail.value = contactsList[contactIndex].email;
  contactAddress.value = contactsList[contactIndex].address;
  contactSelect.value = contactsList[contactIndex].group;
  contactNotes.value = contactsList[contactIndex].notes;
  contactFav.checked = contactsList[contactIndex].isFavorite;
  contactEmg.checked = contactsList[contactIndex].isEmergency;
  console.log("update out");
  updatedIndex = contactIndex;
  addFormBtn.classList.add("d-none");
  updateFormBtn.classList.remove("d-none");
  contactEmailError.classList.replace("d-block", "d-none");

  duplicateNum = contactsList[contactIndex].phone;
}
function updateContactConfirmation() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Updated",
    text: "Contact has been updated successfully",
    showConfirmButton: false,
    timer: 1500,
  });
}
function updateContact() {
  console.log("first print");

  // set values & update item in array
  // لازم تاخدي نسخة منفصلة تماماً من البيانات قبل التعديل
  var originalContact = JSON.parse(JSON.stringify(contactsList[updatedIndex]));
  contactsList[updatedIndex].name = contactName.value.trim();
  contactsList[updatedIndex].phone = contactPhone.value;
  contactsList[updatedIndex].email = contactEmail.value;
  contactsList[updatedIndex].address = contactAddress.value;
  contactsList[updatedIndex].group = contactSelect.value;
  contactsList[updatedIndex].notes = contactNotes.value;
  contactsList[updatedIndex].isFavorite = contactFav.checked;
  contactsList[updatedIndex].isEmergency = contactEmg.checked;

  if (
    JSON.stringify(originalContact) ===
    JSON.stringify(contactsList[updatedIndex])
  ) {
    console.log("same data");
    return;
  }
  if (checkPhoneDuplication(contactsList[updatedIndex], updatedIndex)) {
    return;
  }
  console.log(contactsList[updatedIndex]);
  localStorage.setItem("contactsList", JSON.stringify(contactsList));

  updateContactConfirmation();
  closeModal();
  displayData();
}
function deleteContactConfirmation(contactIndex) {
  var contact = contactsList[contactIndex];
  Swal.fire({
    title: "Delete Contact?",

    text: `Are you sure you want to delete ${contact.name} ? This action cannot be undone.`,

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#dc2626",

    cancelButtonColor: "#6b7280",

    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteContact(contactIndex);
      Swal.fire({
        position: "center",
        title: "Deleted",
        text: "Your file has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}
function deleteContact(contactIndex) {
  // get the i
  console.log("delete function");
  var contact = contactsList[contactIndex];
  console.log("get the obj");
  contactsList.splice(contactIndex, 1);
  localStorage.setItem("contactsList", JSON.stringify(contactsList));
  console.log("del from arr , LS");

  displayData();
}
function searchByContactName() {
  var searchCounter = 0;
  var container = "";
  var contactsListMsg = document.getElementById("contactsListMsg");
  var searchContactsList = [];
  for (var i = 0; i < contactsList.length; i++) {
    if (
      contactsList[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      contactsList[i].email.includes(searchInput.value) ||
      contactsList[i].phone.includes(searchInput.value)
    ) {
      searchCounter++;
      container += `    <div class="col-12 col-md-6 mb-3">
                    <div
                      class="contact-card h-100 bg-white border-grey-100 rounded-4 overflow-hidden">
                      <header
                        class="card-header d-flex gap-3 align-items-center p-3">
                        <div class="contact-avatar">
                          <div
                            class="contact-label text-uppercase fw-semibold text-white favContact shadow-sm rounded-3 fnt-sz8">
                            ${contactLabel(contactsList[i].name)}
                          </div>
                          <div
                            id="favBadge"
                            class="fav-badge ${contactsList[i].isFavorite ? "d-flex" : "d-none"}  c-badge amber-400 text-white"
                          >
                            <i class="fa-solid fa-star"></i>
                          </div>

                          <div
                            id="emgBadge"
                            class="emg-badge ${contactsList[i].isEmergency ? "d-flex" : "d-none"} c-badge rose-500 text-white"
                          >
                            <i class="fa-solid fa-heart-pulse"></i>
                          </div>
                        </div>
                        <div class="contact-details d-flex flex-column gap-1">
                          <div
                            class="Cname text-capitalize fw-semibold gray-900"
                          >
                            ${contactsList[i].name}
                          </div>
                          <div class="Cnumber d-flex gap-2 align-items-center">
                            <div
                              class="phone-icon w-h-26 fnt-sz-9 blue-100 blue-600 d-flex justify-content-center align-items-center rounded-2">
                              <i class="fa-solid fa-phone"></i>
                            </div>
                            <span
                              id="contactPhoneNum"
                              class="gray-500 fnt-sz-14"
                              >
                              ${contactsList[i].phone}
                              </span
                            >
                          </div>
                        </div>
                      </header>

                    <div class="card-body d-flex flex-column gap-3 p-3 pt-0">
                        <div class="Cemail ${contactsList[i].email !== "" ? "d-flex" : "d-none"} gap-2 align-items-center">
                          <div class="msg-icon violet-100 violet-600 d-flex justify-content-center align-items-center w-h-26 fnt-sz-10 rounded-2">
                            <i class="fa-solid fa-envelope"></i>
                          </div>
                          <span id="contactEmail" class="gray-600 fnt-sz-14"
                            >${contactsList[i].email}</span>
                        </div>

                        <div class="Clocation ${contactsList[i].address !== "" ? "d-flex" : "d-none"} gap-2 align-items-center">
                          <div class="location-icon w-h-26 fnt-sz-10 embrald-100 embrald-600 d-flex justify-content-center align-items-center rounded-2">
                            <i class="fa-solid fa-location-dot"></i>
                          </div>
                          <span id="contactLocation" class="gray-600 fnt-sz-14">
                          ${contactsList[i].address}
                          </span>
                         </div>

                         <div class="C-category d-flex flex-wrap gap-2 mt-2">
                         ${contactGroupCheck(contactsList[i])}
                          <span
                            id="contactCategoryEmg"
                            class="${contactsList[i].isEmergency ? "d-block" : "d-none"} rose-50 rose-600 fnt-sz-11 text-capitalize pxy rounded-2 fw-medium"
                          >
                            <i class="fa-solid fa-heart-pulse fnt-sz-10"></i>
                            Emergency
                          </span>

                        </div>
                      </div>

                      <footer
                        class="card-footer custom-bg-gray-modern p-2 px-3 d-flex align-items-center justify-content-between">
                        <div class="actions d-flex gap-2">
                          <button
                            class="phone-btn border-0 d-flex justify-content-center align-items-center w-h-38 embrald-50 embrald-600 rounded-2"
                          >
                            <i class="fa-solid fa-phone fnt-sz-14"></i>
                          </button>
                          <button
                            class="email-btn border-0  ${contactsList[i].email !== "" ? "d-flex" : "d-none"} justify-content-center align-items-center w-h-38 violet-50 violet-600 rounded-2"
                          >
                            <i class="fa-solid fa-envelope fnt-sz-14"></i>
                          </button>
                        </div>
                        <div class="quick-actions-btns">
                          <button
                          onclick="favBtnPress(${i})"
                            id="favBtn"
                            class="fav-btn ${!contactsList[i].isFavorite ? "d-inline-block" : "d-none"} border-0 gray-50 gray-400"
                          >
                            <i class="fa-regular fa-star fnt-sz-15"></i>
                          </button>
                           <button
                           onclick="favBtnPress(${i})"
                            id="favCheckedBtn"
                            class="fav-checked-btn ${contactsList[i].isFavorite ? "d-inline-block" : "d-none"} border-0 amber-50 text-amber-400"
                          >
                            <i class="fa-solid fa-star fnt-sz-15"></i>
                          </button>
                          <button
                          onclick="emgBtnPress(${i})"
                            id="emgBtn"
                            class="emg-btn ${!contactsList[i].isEmergency ? "d-inline-block" : "d-none"} border-0 gray-50 gray-400"
                          >
                            <i class="fa-regular fa-heart fnt-sz-15"></i>
                          </button>
                           <button
                           onclick="emgBtnPress(${i})"
                            id="emgCheckedBtn"
                            class="emg-checked-btn ${contactsList[i].isEmergency ? "d-inline-block" : "d-none"} border-0 rose-50 text-rose-500"
                          >
                            <i class="fa-solid fa-heart-pulse fnt-sz-15"></i>
                          </button>
                            <button
                            onclick="editContact(${i})"
                            type="button"
                            class="edit-btn border-0 gray-50 gray-500"
                            data-bs-toggle="modal"
                            data-bs-target="#formModal"
                          >
                            <i class="fa-solid fa-pen fnt-sz-15"></i>
                          </button>

                       <button
                        onclick="deleteContactConfirmation(${i})"
                            type="button"
                            id="deleteBtn"
                            class="delete-btn border-0 gray-50 gray-500"
                          >
                            <i class="fa-solid fa-trash fnt-sz-15"></i>
                          </button>

                        </div>
                      </footer>

                    </div>
                  </div>`;
    }
  }
  contentView.innerHTML = container;
  contactsListMsg.innerHTML = `<p class="fnt-sz-14 gray-500 fw-normal">
  <span class="fnt-sz-14 gray-500"> ${searchCounter == 1 ? "1 </span> contact" : ` ${searchCounter} </span> contacts`}  matching
</p>`;

  if (searchInput.value === "") {
    contactsListMsg.innerHTML = ` <p class="fnt-sz-14 gray-500 fw-normal">
                    Manage and organize your
                    <span id="contactsNo" class="fnt-sz-14 gray-500">${searchCounter}</span>
                    contacts
                  </p>`;
  }
}
searchInput.addEventListener("input", searchByContactName);
displayData();

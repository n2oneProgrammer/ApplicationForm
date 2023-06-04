let isDateLess = (date1, date2) => {
    return new Date(date1) < new Date(date2)
}
let isDateBeforeToday = (date) => {
    return isDateLess(date, new Date().toDateString());
}

let checkFile = (file) => {
    const fileSize = file.size;
    const fileMb = fileSize / 1024 ** 2;
    return fileMb >= 2
}

let attachedFileValidators = []
let internshipValidators = []
window.addEventListener("load", () => {
    let nameInput = $("#name-input");
    let surnameInput = $("#surname-input");
    let emailInput = $("#email-input");
    let birthdayInput = $("#birthday-input");
    let LMInput = $("#LM-file-input");
    let CVInput = $("#CV-file-input");

    let nameError = $("#name-error");
    let surnameError = $("#surname-error");
    let emailError = $("#email-error");
    let birthdayError = $("#birthday-error");
    let LMError = $("#LM-file-error");
    let CVError = $("#CV-file-error");
    nameInput.on("change", () => {
        if (nameInput.val().length > 50) {
            nameError.text("Name is too long");
        } else if (nameInput.val().length === 0) {
            nameError.text("Name is required");
        } else {
            nameError.text("")
        }
    });
    surnameInput.on("change", () => {
        if (surnameInput.val().length > 50) {
            surnameError.text("Surname is too long");
        } else if (surnameInput.val().length === 0) {
            surnameError.text("Surname is required");
        } else {
            surnameError.text("")
        }
    });

    emailInput.on("change", () => {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (emailInput.val().match(validRegex)) {
            emailError.text("");
        } else {
            emailError.text("Email is incorrect")
        }
    });

    birthdayInput.on("change", () => {
        if (!isDateBeforeToday(birthdayInput.val())) {
            birthdayError.text("Birthday is not correct");
        } else {
            birthdayError.text("")
        }
    });

    LMInput.on("change", () => {
        if (LMInput.prop("files").length > 0) {
            let f = LMInput.prop("files")[0];
            if (!["image/jpeg", "application/pdf", "application/msword"].includes(f.type)) {
                LMError.text("File should be JPEG, PDF or MS word");
            } else if (checkFile(f)) {
                LMError.text("File should be less than 2MB.");
            } else {
                LMError.text("");
            }
        } else {
            LMError.text("");
        }
    });

    CVInput.on("change", () => {
        if (CVInput.prop("files").length > 0) {
            let f = CVInput.prop("files")[0];
            if (checkFile(f)) {
                CVError.text("File should be less than 2MB.");
            } else {
                CVError.text("");
            }
        } else {
            CVError.text("");
        }
    });

});
let addAttachedFileValidator = (id) => {
    attachedFileValidators.push(id);
}
let removeAttachedFileValidator = (id) => {
    attachedFileValidators = attachedFileValidators.filter(a => a !== id);
}
let attachedFileValidatorCheck = (idChange=-1) => {
    attachedFileValidators.forEach(file => {
        let fileInput = $("#attachedFile" + file);
        if (fileInput.prop("files").length > 0) {
            let f = fileInput.prop("files")[0];
            if (checkFile(f)) {
                if (idChange === file) {
                    $("#attachedFileError" + file).text("File should be less than 2MB.");
                }
            } else {

                if (idChange === file) {
                    $("#attachedFileError" + file).text("");
                }
            }
        } else {
            if (idChange === file) {
                $("#attachedFileError" + file).text("File field should not be empty");
            }
        }
    })
}

let addInternshipValidator = (id) => {
    internshipValidators.push(id);
}
let removeInternshipValidator = (id) => {
    internshipValidators = internshipValidators.filter(a => a !== parseInt(id));
}

let internshipValidatorCheck = (idChange=-1, inputType="") => {//input type = {Name, Start, End}
    internshipValidators.forEach(id => {
        let companyNameInput = $("#internship-company-name-" + id);
        let startInput = $("#internship-start-" + id);
        let endInput = $("#internship-end-" + id);

        let companyNameError = $("#internship-company-name-error-" + id);
        let startError = $("#internship-start-error-" + id);
        let endError = $("#internship-end-error-" + id);

        if (companyNameInput.val().length > 100) {
            if (idChange === id && inputType === "Name") {
                companyNameError.text("Company name is too long");
            }
        } else if (companyNameInput.val().length === 0) {
            if (idChange === id && inputType === "Name") {
                companyNameError.text("Company name is required");
            }
        } else {

            if (idChange === id && inputType === "Name") {
                companyNameError.text("");
            }
        }
        if (!isDateBeforeToday(startInput.val())) {
            if (idChange === id && inputType === "Start") {
                startError.text("Date is not correct");
            }
        } else {
            if (idChange === id && inputType === "Start") {
                startError.text("");
            }
        }

        if (!isDateBeforeToday(endInput.val())) {
            if (idChange === id && inputType === "End") {
                endError.text("Date is not correct");
            }
        } else if (!isDateLess(startInput.val(), endInput.val())) {
            if (idChange === id && inputType === "End") {
                endError.text("End date should be after start date");
            }
        } else {
            if (idChange === id && inputType === "End") {
                endError.text("");
            }
        }
    })
}
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
//VALIDATOR STATES
let nameOk = false;
let surnameOk = false;
let emailOk = false;
let birthdayOk = false;
let LMFileOk = true;
let CVFileOk = true;
let anotherFilesOk = true;
let internshipOk = true;

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
            nameError.text("Imię jest za długie");
            nameOk = false;
        } else if (nameInput.val().length === 0) {
            nameError.text("Wprowadzenia imienia jest wymagane");
            nameOk = false;
        } else {
            nameError.text("");
            nameOk = true;
        }
        updateSubmit();
    });
    surnameInput.on("change", () => {
        if (surnameInput.val().length > 50) {
            surnameError.text("Nazwisko jest za długie");
            surnameOk = false;
        } else if (surnameInput.val().length === 0) {
            surnameError.text("Wprowadzenia nazwiska jest wymagane");
            surnameOk = false;
        } else {
            surnameError.text("");
            surnameOk = true;
        }
        updateSubmit();
    });

    emailInput.on("change", () => {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (emailInput.val().match(validRegex)) {
            emailError.text("");
            emailOk = true;
        } else {
            emailError.text("Email jest niepoprawny");
            emailOk = false;
        }
        updateSubmit();
    });

    birthdayInput.on("change", () => {
        if (!isDateBeforeToday(birthdayInput.val())) {
            birthdayError.text("Data urodzenia jest niepoprawna");
            birthdayOk = false;
        } else {
            birthdayError.text("");
            birthdayOk = true;
        }
        updateSubmit();
    });

    LMInput.on("change", () => {
        if (LMInput.prop("files").length > 0) {
            let f = LMInput.prop("files")[0];
            if (!["image/jpeg", "application/pdf", "application/msword"].includes(f.type)) {
                LMError.text("Plik musi być typu JPEG, PDF lub MS WORD");
                LMFileOk = false;
            } else if (checkFile(f)) {
                LMError.text("Plik musi być mniejszy niż 2 MB");
                LMFileOk = false;
            } else {
                LMError.text("");
                LMFileOk = true;
            }
        } else {
            LMError.text("");
            LMFileOk = true;
        }
        updateSubmit();
    });

    CVInput.on("change", () => {
        if (CVInput.prop("files").length > 0) {
            let f = CVInput.prop("files")[0];
            if (!["image/jpeg", "application/pdf", "application/msword"].includes(f.type)) {
                CVError.text("Plik musi być typu JPEG, PDF lub MS WORD");
                CVFileOk = false;
            } else if (checkFile(f)) {
                CVError.text("Plik musi być mniejszy niż 2 MB");
                CVFileOk = false;
            } else {
                CVError.text("");
                CVFileOk = true;
            }
        } else {
            CVError.text("");
            CVFileOk = true;
        }
        updateSubmit();
    });
    updateSubmit();
});
let addAttachedFileValidator = (id) => {
    attachedFileValidators.push(id);
    updateSubmit();
}
let removeAttachedFileValidator = (id) => {
    attachedFileValidators = attachedFileValidators.filter(a => a !== id);
    updateSubmit();
}
let attachedFileValidatorCheck = (idChange = -1) => {
    let ok = true;
    attachedFileValidators.forEach(file => {
        let fileInput = $("#attachedFile" + file);
        if (fileInput.prop("files").length > 0) {
            let f = fileInput.prop("files")[0];
            if (checkFile(f)) {
                if (idChange === file) {
                    $("#attachedFileError" + file).text("Plik musi być mniejszy niż 2 MB");
                }
                ok = false;
            } else {
                if (idChange === file) {
                    $("#attachedFileError" + file).text("");
                }
            }
        } else {
            if (idChange === file) {
                $("#attachedFileError" + file).text("Musisz wybrać plik");
            }
            ok = false;
        }
    });
    anotherFilesOk = ok;
    updateSubmit();
}

let addInternshipValidator = (id) => {
    internshipValidators.push(id);
    updateSubmit();
}
let removeInternshipValidator = (id) => {
    internshipValidators = internshipValidators.filter(a => a !== parseInt(id));
    updateSubmit();
}

let internshipValidatorCheck = (idChange = -1, inputType = "") => {//input type = {Name, Start, End}
    let ok = true;
    internshipValidators.forEach(id => {
        let companyNameInput = $("#internship-company-name-" + id);
        let startInput = $("#internship-start-" + id);
        let endInput = $("#internship-end-" + id);

        let companyNameError = $("#internship-company-name-error-" + id);
        let startError = $("#internship-start-error-" + id);
        let endError = $("#internship-end-error-" + id);

        if (companyNameInput.val().length > 100) {
            if (idChange === id && inputType === "Name") {
                companyNameError.text("Nazwa firmy jest za długa");
            }
            ok = false;
        } else if (companyNameInput.val().length === 0) {
            if (idChange === id && inputType === "Name") {
                companyNameError.text("Musisz wprowadzić nazwę firmy");
            }
            ok = false;
        } else {
            if (idChange === id && inputType === "Name") {
                companyNameError.text("");
            }
        }
        if (!isDateBeforeToday(startInput.val())) {
            if (idChange === id && inputType === "Start") {
                startError.text("Data jest niepoprawna");
            }
            ok = false;
        } else {
            if (idChange === id && inputType === "Start") {
                startError.text("");
            }
        }

        if (!isDateBeforeToday(endInput.val())) {
            if (idChange === id && inputType === "End") {
                endError.text("Data jest niepoprawna");
            }
            ok = false;
        } else if (!isDateLess(startInput.val(), endInput.val())) {
            if (idChange === id && inputType === "End") {
                endError.text("Data zakończenia musi być po dacie poczatku");
            }
            ok = false;
        } else {
            if (idChange === id && inputType === "End") {
                endError.text("");
            }
        }
    });
    internshipOk = ok;
    updateSubmit();
}

let updateSubmit = () => {
    console.log(nameOk, surnameOk, emailOk, birthdayOk, LMFileOk, CVFileOk, anotherFilesOk, internshipOk);
    let submit = $("#submit")
    if (nameOk &&
        surnameOk &&
        emailOk &&
        birthdayOk &&
        LMFileOk &&
        CVFileOk &&
        anotherFilesOk &&
        internshipOk) {
        submit.removeAttr("disabled");
    } else {
        submit.attr("disabled", true);
    }
}
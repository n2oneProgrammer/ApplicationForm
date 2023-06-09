﻿let numberOfInternship = 0;
let internshipList = []


let createInternshipGroup = () => {
    let id = Math.floor(Math.random() * 100000000);
    let main = $("<div/>", {class: "internship-group", "data-id-internship": id});

    let group1 = $("<div/>", {class: "form-group"});
    let label1 = $("<label/>", {class: "control-label"});
    label1.text("Nazwa Firmy");
    let input1 = $("<input/>", {name: "CompanyNames", id: "internship-company-name-" + id, class: "form-control"});
    input1.on("change", () => internshipValidatorCheck(id, "Name"));
    let span1 = $("<span/>", {
        class: "text-danger",
        id: "internship-company-name-error-" + id,
        "data-valmsg-for": "CompanyNames"
    });
    group1.append(label1);
    group1.append(input1);
    group1.append(span1);

    let group2 = $("<div/>", {class: "form-group"});
    let label2 = $("<label/>", {class: "control-label"});
    label2.text("Od");
    let input2 = $("<input/>", {
        name: "InternshipStarts",
        id: "internship-start-" + id,
        class: "form-control",
        type: "Date"
    });
    input2.on("change", () => internshipValidatorCheck(id, "Start"));
    let span2 = $("<span/>", {
        class: "text-danger",
        id: "internship-start-error-" + id,
        "data-valmsg-for": "InternshipStarts"
    });
    group2.append(label2);
    group2.append(input2);
    group2.append(span2);

    let group3 = $("<div/>", {class: "form-group"});
    let label3 = $("<label/>", {class: "control-label"});
    label3.text("Do");
    let input3 = $("<input/>", {
        name: "InternshipEnds",
        id: "internship-end-" + id,
        class: "form-control",
        type: "Date"
    });
    input3.on("change", () => internshipValidatorCheck(id, "End"));
    let span3 = $("<span/>", {
        class: "text-danger",
        id: "internship-end-error-" + id,
        "data-valmsg-for": "InternshipEnds"
    });
    addInternshipValidator(id);
    group3.append(label3);
    group3.append(input3);
    group3.append(span3);

    main.append(group1);
    main.append(group2);
    main.append(group3);

    return main;
}


window.addEventListener("load", () => {
    //Add attached Files
    let attachedFileGroup = $("#attached-file-group");
    let addFileButton = $("#add-attached-file");
    addFileButton.on("click", () => {
        let group = $("<div/>", {class: "form-group file-group"});
        let line = $("<div/>", {class: "line"});
        let id = Math.floor(Math.random() * 100000000);
        let input = $("<input/>", {type: "file", name: "File", id: "attachedFile" + id, class: "form-control"});
        input.on("change", () => attachedFileValidatorCheck(id));
        let removeButton = $("<a/>", {class: "removeButton"});
        removeButton.text("X");
        removeButton.on("click", (e) => {
            group.remove()
            removeAttachedFileValidator(id);
        })
        addAttachedFileValidator(id);
        let span = $("<span/>", {class: "text-danger", id: "attachedFileError" + id});
        line.append(input);
        line.append(removeButton);
        group.append(line);
        group.append(span);
        attachedFileGroup.append(group);
    })


    //Add Internship 

    let internshipMain = $("#internship-list");
    let internshipNumberInput = $("#count-of-internship");

    let changeNumberOfInternship = () => {
        let diff = internshipNumberInput.val() - numberOfInternship;
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                let element = createInternshipGroup();
                internshipMain.append(element);
                internshipList.push(element)
            }
        } else if (diff < 0) {
            for (let ele of internshipList.splice(diff)) {
                removeInternshipValidator(ele.attr("data-id-internship"));
                ele.remove();
            }
        }
        numberOfInternship = internshipNumberInput.val();
    }
    internshipNumberInput.on("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            changeNumberOfInternship();
        }
    })
    internshipNumberInput.on("change", (event) => {
        changeNumberOfInternship();
    })
})


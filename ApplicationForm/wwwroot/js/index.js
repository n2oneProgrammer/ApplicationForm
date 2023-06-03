window.addEventListener("load", () => {
    let attachedFileGroup = $("#attached-file-group");
    let addFileButton = $("#add-attached-file");
    addFileButton.on("click", () => {
        let group = $("<div/>", {class: "form-group file-group"});
        let line = $("<div/>", {class: "line"});
        let input = $("<input/>", {type: "file", name: "File", class: "form-control"});
        let removeButton = $("<a/>", {class: "removeButton"});
        removeButton.text("X");
        removeButton.on("click", (e) => {
            group.remove()
        })
        let span = $("<span/>", {class: "text-danger"});
        line.append(input);
        line.append(removeButton);
        group.append(line);
        group.append(span);
        attachedFileGroup.append(group);
    })
})
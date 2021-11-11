const btnAdd = document.querySelector(".btn-add");
const btnEdit = document.querySelector(".btn-edit");
const btnDelete = document.querySelector(".btn-delete");

const addModal = document.querySelector(".add-modal");
const editModal = document.querySelector(".edit-modal");
const deleteModal = document.querySelector(".delete-modal");

const addScore = document.querySelector(".btn-modal-add");
const editScore = document.querySelector(".btn-modal-edit");
const deleteScore = document.querySelector(".btn-modal-delete");

const deleteName = document.getElementById("deleteName");

const editName = document.getElementById("editName");
const partChange = document.getElementById("partchange");
const newval = document.getElementById("newval");

const ScoreName = document.getElementById("scoreName");
const epNum = document.getElementById("score");
const sNum = document.getElementById("total");
const percent_score = document.getElementById("percent");

btnAdd.addEventListener("click", () => {
    addModal.classList.add("modal-show");
});
btnEdit.addEventListener("click", () => {
    editModal.classList.add("modal-show");
});
btnDelete.addEventListener("click", () => {
    deleteModal.classList.add("modal-show");
});

addScore.addEventListener("click", (e) => {
    e.preventDefault();
    axios({
        method: "post",
        url: "/save",
        data: {
            score_source: ScoreName.value,
            score: epNum.value,
            total: sNum.value,
            percent: percent_score.value,
        },
    });
    ScoreName.value = "";
    epNum.value = "";
    sNum.value = "";
    percent_score.value = "";
    addModal.classList.remove("modal-show");
});

deleteScore.addEventListener("click", (e) => {
    var dataList = {};
    e.preventDefault();
    axios({
        method: "delete",
        url: "/remove",
        data: {
            score_name: deleteName.value,
        },
    });
    console.log(dataList);
    console.log("a");
    deleteName.value = "";
    deleteModal.classList.remove("modal-show");
});

editScore.addEventListener("click", (e) => {
    e.preventDefault();
    axios({
        method: "put",
        url: "/update",
        data: {
            score_name: editName.value,
            part_change: partChange.value,
            new_val: newval.value,
        },
    });
    editName.value = "";
    partChange.value = "";
    newval.value = "";
    editModal.classList.remove("modal-show");
});
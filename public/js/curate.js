const e = require("express");

const depPicker = new Pikaday({ field: document.getElementById('curate_departure'), format: 'D/M/YYYY',
    toString(date, format) {
        // you should do formatting based on the passed format,
        // but we will just return 'D/M/YYYY' for simplicity
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        const year = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return `${dd}/${mm}/${year}`;
    },
});
const retPicker = new Pikaday({ field: document.getElementById('curate_return'), format: 'DD/MM/YYYY',
    toString(date, format) {
        // you should do formatting based on the passed format,
        // but we will just return 'D/M/YYYY' for simplicity
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        const year = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return `${dd}/${mm}/${year}`;
    },
});

const curateFormHandler = async (event) => {
    event.preventDefault();

    const group_size = getElementById('curate_group').value;
    const origin = getElementById('curate_origin').value;
    const departure_date = getElementById('curate_departure').value;
    const return_date = getElementById('curate_return').value;
    const notes = getElementById('curate_notes').innerText;



}

let curate_mode = true;

document
.querySelector('.curate-form')
.addEventListener('submit', loginFormHandler);
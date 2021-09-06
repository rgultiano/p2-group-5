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

    const groupsize = document.getElementById('curate_group').value;
    const origin = document.getElementById('curate_origin').value;
    const departure_date = document.getElementById('curate_departure').value;
    const return_date = document.getElementById('curate_return').value;
    const notes = document.getElementById('curate_notes').innerText;


    const response = await fetch(`/api/users/${user_id}/trips/${trip_id}/curate`, {
        method: 'POST',
        body: JSON.stringify({ groupsize, origin, departure_date, return_date, notes}),
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok)
    {
        location.replace('/');
    }
    else{
        alert('Error sending for curation');
    }

}

var curate_mode = true;
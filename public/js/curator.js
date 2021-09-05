const quoteFormHandler = async (event) => {
    event.preventDefault();

    const amount = document.getElementById('curate_group').value;
    const valid = document.getElementById('curate_origin').value;
    const booking_details = document.getElementById('curate_departure').value;


    const response = await fetch(`/api/users/${user_id}/trips/${trip_id}/curate`, {
        method: 'POST',
        body: JSON.stringify({ groupsize, origin, departure_date, return_date, notes}),
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok)
    {
        alert('ok');
    }
    else{
        alert('Error sending for curation');
    }

}
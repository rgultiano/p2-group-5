const quoteFormHandler = async (event) => {
    event.preventDefault();

    const amount = document.getElementById('quote_amount').value;
    const valid_until = document.getElementById('quote_valid').value;
    const booking_details = document.getElementById('quote_details').value;


    const response = await fetch(`/api/curator/trips/${trip_id}/quote`, {
        method: 'POST',
        body: JSON.stringify({ amount, valid_until, booking_details,}),
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
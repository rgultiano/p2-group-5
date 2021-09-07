async function deleteTrip(id){
    const response = await fetch(`/api/users/${user_id}/trips/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
      });
      if (response.ok) {
          document.location.replace("/");
      } else {
        alert("Trip Deletion failed.")
      }
}
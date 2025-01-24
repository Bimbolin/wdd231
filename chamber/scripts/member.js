async function fetchSpotlights() {
    try {
        const result = await fetch('data/members.json');
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error('Error fetching spotlight data:', error);
    }
}

function displaySpotlights(members) {
    const spotlightContent = document.getElementById('spotlightContent');
    spotlightContent.innerHTML = '';

    // Filter gold and silver members
    const goldSilverMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

    // Randomly select up to three members
    const randomMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Display selected members
    randomMembers.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight');
        spotlightCard.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name}">
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p>Membership Level: ${member.membershipLevel}</p>
        `;
        spotlightContent.appendChild(spotlightCard);
    });

}
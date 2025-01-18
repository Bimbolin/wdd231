        async function fetchMembers() {
            const response = await fetch('data/members.json');
            const members = await response.json();
            displayMembers(members);
        }

        function displayMembers(members) {
            const directoryContent = document.getElementById('directoryContent');
            directoryContent.innerHTML = '';
            
            members.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.classList.add('member-card');
                memberCard.innerHTML = `
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>Phone: ${member.phone}</p>
                    <p><a href="${member.website}" target="_blank">Website</a></p>
                    <img src="images/${member.image}" alt="${member.name}">
                    <p>${member.description}</p>
                    <p>Membership Level: ${member.membershipLevel}</p>
                `;
                directoryContent.appendChild(memberCard);
            });
        }

        fetchMembers();

        const gridViewBtn = document.getElementById('gridView');
        const listViewBtn = document.getElementById('listView');
        const directoryContent = document.getElementById('directoryContent');

        gridViewBtn.addEventListener('click', () => {
            directoryContent.classList.add('grid-view');
            directoryContent.classList.remove('list-view');
        });

        listViewBtn.addEventListener('click', () => {
            directoryContent.classList.add('list-view');
            directoryContent.classList.remove('grid-view');
        });
    

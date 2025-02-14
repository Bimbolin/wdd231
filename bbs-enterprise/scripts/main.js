// current year
const currentYear = new Date().getFullYear();

const yearElement = document.getElementById('currentyear');
yearElement.textContent = currentYear;

// last modified
const lastModified = document.lastModified;

const lastModifiedElement = document.getElementById('lastModified');
lastModifiedElement.textContent = `Last modified: ${lastModified}`;

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    updateCurrentYear();
});

// Sample function to fetch JSON data from a remote site
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return [];
    }
}

// Function to display items dynamically
function displayItems(data) {
    const container = document.getElementById('items-container');
    container.innerHTML = '';

    data.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p>${item.price}</p>
            <button class="open-modal" data-id="${item.id}">More Info</button>
        `;
        container.appendChild(itemElement);
    });

    // Save data to localStorage
    localStorage.setItem('items', JSON.stringify(data));
}

// Fetch and display items on page load
document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchData('https://api.example.com/items');
    displayItems(data);

    document.querySelectorAll('.open-modal').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.getAttribute('data-id');
            openModal(itemId, data);
        });
    });
});

export { fetchData, displayItems };

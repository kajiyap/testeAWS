document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const userIdInput = document.getElementById('userId');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    const apiUrl = 'http://localhost:3000/users';

    // Fetch users
    const fetchUsers = async () => {
        const response = await fetch(apiUrl);
        const users = await response.json();
        userList.innerHTML = users.map(user => `
            <li>
                ${user.name} (${user.email}) 
                <button onclick="editUser(${user.id})">Editar</button>
                <button onclick="deleteUser(${user.id})">Excluir</button>
            </li>
        `).join('');
    };

    // Handle form submission
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = userIdInput.value;
        const name = nameInput.value;
        const email = emailInput.value;

        const response = await fetch(apiUrl + (id ? `/${id}` : ''), {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        if (response.ok) {
            userForm.reset();
            await fetchUsers();
        }
    });

    // Edit user
    window.editUser = async (id) => {
        const response = await fetch(`${apiUrl}/${id}`);
        const user = await response.json();

        userIdInput.value = user.id;
        nameInput.value = user.name;
        emailInput.value = user.email;
    };

    // Delete user
    window.deleteUser = async (id) => {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (response.ok) await fetchUsers();
    };

    fetchUsers();
});

<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  let username = '';
  let password = '';
  let name = '';
  let surname = '';
  let type = 'user';
  let users: { username: string }[] = [];

  const dispatch = createEventDispatcher();

  const handleUsernameChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    username = target.value;
  };

  const handlePasswordChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    password = target.value;
  };

  const handleNameChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    name = target.value;
  };

  const handleSurnameChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    surname = target.value;
  };

  const handleTypeChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    type = target.value;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    // Check if the username already exists in the frontend state
    const usernameExists = users.some((user) => user.username === username);
    if (usernameExists) {
      console.error('Username already exists');
      // Handle the error, e.g., show an error message to the user
      return;
    }

    // Create a user object with the form data
    const user = {
      username: username,
      password: password,
      name: name,
      surname: surname,
      type: type,
    };

    // Make a POST request to create a new user
    fetch('https://user-xojp.onrender.com/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        // If the user was created successfully, update the users state in the frontend
        users = [...users, data];
        // Clear the form fields after successful submission
        username = '';
        password = '';
        name = '';
        surname = '';
        type = 'user';
        window.location.assign('https://frontend-rok.onrender.com/admin/user-list');
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        // Handle errors, e.g., show an error message to the user
      });
  };

  // You might want to replace the AdminDashboard with your Svelte equivalent component
  // Since we don't have the implementation for AdminDashboard, we'll just dispatch an event
  onMount(() => {
    dispatch('adminDashboardRendered');
  });
</script>

<!-- Replace AdminDashboard with your Svelte equivalent component or markup -->
<!-- Since we don't have the implementation, we'll just wait for the event to be dispatched -->
<div>
  <h2 class="mb-3">Add User</h2>
  <form on:submit={handleSubmit}>
    <div class="mb-3">
      <label for="username" class="form-label">Username:</label>
      <input
        type="text"
        id="username"
        class="form-control"
        bind:value={username}
        on:input={handleUsernameChange}
        required
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password:</label>
      <input
        type="password"
        id="password"
        class="form-control"
        bind:value={password}
        on:input={handlePasswordChange}
        required
      />
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Name:</label>
      <input
        type="text"
        id="name"
        class="form-control"
        bind:value={name}
        on:input={handleNameChange}
        required
      />
    </div>
    <div class="mb-3">
      <label for="surname" class="form-label">Surname:</label>
      <input
        type="text"
        id="surname"
        class="form-control"
        bind:value={surname}
        on:input={handleSurnameChange}
        required
      />
    </div>
    <div class="mb-3">
      <label for="type" class="form-label">Type:</label>
      <select
        id="type"
        class="form-select"
        bind:value={type}
        on:change={handleTypeChange}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Create</button>
  </form>
</div>

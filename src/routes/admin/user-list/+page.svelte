<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import axios from 'axios';

  // Define the user object type
  interface User {
    id: number;
    name: string;
    username: string;
    type: string;
  }

  // Create a writable store for users
  const usersStore = writable<(User | null)[]>([]);
  let editedUser: User | null = null;
  // Explicitly define the type of the 'users' variable

  onMount(() => {
    axios
      .get('https://user-xojp.onrender.com/users/')
      .then((response) => usersStore.set(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  });

  // Filter out null values when deriving the users array
  $: users = $usersStore.filter((user) => user !== null) as User[];

  const handleEdit = (user: User) => {
    editedUser = user;
  };

  const handleSave = () => {
    if (editedUser) {
      axios
        .put(`https://user-xojp.onrender.com/users/${editedUser.id}`, editedUser)
        .then((response) => {
          console.log(response.data);
          usersStore.update((prevUsers) =>
            prevUsers.map((user) => (user?.id === editedUser!.id ? editedUser : user))
          );
          editedUser = null;
        })
        .catch((error) => console.error('Error updating user:', error));
    }
  };

  const handleCancelEdit = () => {
    editedUser = null;
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`https://user-xojp.onrender.com/users/${id}`)
      .then((response) => {
        console.log(response.data);
        usersStore.update((prevUsers) => prevUsers.filter((user) => user?.id !== id));
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  const handleTypeChange = (e: Event) => {
    if (editedUser) {
      editedUser = { ...editedUser, type: (e.target as HTMLSelectElement).value };
    }
  };
</script>

<div class="container mt-5">
  <h2 class="mb-3">Users</h2>
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Type</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {#each users as user (user.id)}
        <tr>
          <td>
            {#if editedUser && editedUser.id === user.id}
              <input type="text" bind:value={editedUser.name} />
            {:else}
              {user.name}
            {/if}
          </td>
          <td>
            {#if editedUser && editedUser.id === user.id}
              <input type="text" bind:value={editedUser.username} />
            {:else}
              {user.username}
            {/if}
          </td>
          <td>
            {#if editedUser && editedUser.id === user.id}
              <select value={editedUser.type} on:change={handleTypeChange} class="form-control">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            {:else}
              {user.type}
            {/if}
          </td>
          <td>
            {#if editedUser && editedUser.id === user.id}
              <button class="btn btn-success btn-sm" on:click={handleSave}>Save</button>
              <button class="btn btn-secondary btn-sm" on:click={handleCancelEdit}>Cancel</button>
            {:else}
              <button class="btn btn-primary btn-sm" on:click={() => handleEdit(user)}>Edit</button>
            {/if}
          </td>
          <td>
            <button class="btn btn-danger btn-sm" on:click={() => handleDelete(user.id)}>Delete</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

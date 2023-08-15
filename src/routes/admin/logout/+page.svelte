<!-- Logout.svelte -->
<script>
    async function handleLogout() {
      // Perform any client-side logout actions here if needed
      // For example, clearing local storage, session data, etc.
      
      // Redirect to the login page
      window.location.href = '/login';
    }
  </script>
  
  <main class="container mt-5">
    <h1 class="mb-4">Logout</h1>
    <p>Are you sure you want to log out?</p>
    <button type="button" class="btn btn-danger" on:click={handleLogout}>Logout</button>
  </main>
  
  <style>
    /* Add your custom styles here */
  </style>
  
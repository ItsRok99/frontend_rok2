<script lang="ts">
  let username: string = '';
  let password: string = '';
  let name: string = '';
  let surname: string = '';
  let type: string = 'user'; 
  let errorMessage: string | null = null;

  const handleUsernameChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    username = target.value;
  };

  const handlePasswordChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    password = target.value;
  };

  const handleNameChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    name = target.value;
  };

  const handleSurnameChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    surname = target.value;
  };

  const handleTypeChange = (e: InputEvent) => {
    const target = e.target as HTMLSelectElement;
    type = target.value;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
      name: name,
      surname: surname,
      type: type,
    };
  
    try {
      const response = await fetch('https://user-xojp.onrender.com/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        if (!response.headers.get('content-type')?.includes('application/json')) {
          throw new Error('Unexpected server response');
        }
  
        const errorData = await response.json();
        errorMessage = errorData.detail;
        throw new Error(errorData.detail); 
      }
    
      window.location.href = 'https://frontend-rok.onrender.com/login';
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error registering user:', error.message);
      }
    }
  };
</script>

<div class="container mt-5">
  <h2 class="mb-3">Register</h2>
  {#if errorMessage}
    <p style="color: red">{errorMessage}</p>
  {/if}
  <form on:submit|preventDefault={handleSubmit}>
    <div class="mb-3">
      <label for="username" class="form-label">Username:</label>
      <input
        type="text"
        id="username"
        class="form-control"
        bind:value={username}
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
        required
      />
    </div>
    <div class="mb-3">
      <label for="type" class="form-label">User Type:</label>
      <select
        id="type"
        class="form-control"
        bind:value={type}
        required
      >
        <option value="user">User</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Register</button>
  </form>
  <div class="mt-3">
    <p>Already have an account? <a href="https://frontend-rok.onrender.com/login">Login here</a>!</p>
  </div>
</div>

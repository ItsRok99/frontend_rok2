<script lang="ts">
  let username: string = '';
  let password: string = '';
  let errorMessage: string | null = null;

  const handleUsernameChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    username = target.value;
  };

  const handlePasswordChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    password = target.value;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
  
    try {
      const loginResponse = await fetch('https://user-xojp.onrender.com/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      const data = await loginResponse.json();
  
      if (loginResponse.ok) {
        localStorage.setItem('jwtToken', data.access_token);
        localStorage.setItem('userType', data.user_type);
        localStorage.setItem('userId', data.user_id);
  
        const token = localStorage.getItem('jwtToken');
        const protectedResponse = await fetch('https://user-xojp.onrender.com/me/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (protectedResponse.ok) {
          const protectedData = await protectedResponse.json();
          console.log(protectedData);
        }
  
        if (data.user_type === "admin") {
          window.location.href = '/admin';
        } else {
          window.location.href = '/user';
        }
  
      } else if (loginResponse.status === 401) {
        errorMessage = 'Invalid username or password. Please check your credentials.';
      } else {
        errorMessage = 'An error occurred while logging in.';
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error);
      }
    }
  };
</script>

<div class="container mt-5">
  <h2>Login</h2>
  {#if errorMessage}
    <p style="color: red">{errorMessage}</p>
  {/if}
  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="username">Username</label>
      <input
        type="text"
        class="form-control"
        id="username"
        bind:value={username}
        required
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        bind:value={password}
        required
      />
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
  <div class="mt-3">
    <p>Don't have an account? <a href="https://frontend-rok.onrender.com/register">Register here</a>!</p>
  </div>
</div>

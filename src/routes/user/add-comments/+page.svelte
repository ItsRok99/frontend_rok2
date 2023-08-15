<!-- AddComments.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios';

  let subject: string = '';
  let text: string = '';

  // Fetch userId from local storage to initialize the state
  let userId: string = localStorage.getItem('userId') || '';
  const jwtTokenFromStorage = localStorage.getItem('jwtToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwtTokenFromStorage}`;

  const handleSubjectChange = (event: Event) => {
    subject = (event.target as HTMLInputElement).value;
  };

  const handleTextChange = (event: Event) => {
    text = (event.target as HTMLInputElement).value;
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    // Create a comment object with the form data
    const comment = {
      subject: subject,
      text: text,
      userid: userId,
    };

    // Make a POST request to create a new comment
    axios
      .post('https://comment-187a.onrender.com/comments/', comment)
      .then((response) => {
        // Handle the response here if needed
        console.log('Comment created successfully:', response.data);
        // Clear the form fields after successful submission
        subject = '';
        text = '';
        userId = '';
      })
      .catch((error) => {
        console.error('Error creating comment:', error);
        // Handle errors, e.g., show an error message to the user
      });
  };
</script>

<div class="container mt-5">
  <h2 class="mb-3">Add Comment</h2>
  <form on:submit={handleSubmit}>
    <div class="mb-3">
      <label for="subject" class="form-label">Subject:</label>
      <input
        type="text"
        id="subject"
        class="form-control"
        bind:value={subject}
        on:input={handleSubjectChange}
        required
      />
    </div>
    <div class="mb-3">
      <label for="text" class="form-label">Text:</label>
      <input
        type="text"
        id="text"
        class="form-control"
        bind:value={text}
        on:input={handleTextChange}
        required
      />
    </div>
    <!-- The userid field is now read-only, automatically populated from local storage -->
    <div class="mb-3">
      <label for="userid" class="form-label">User ID:</label>
      <input
        type="text"
        id="userid"
        class="form-control"
        bind:value={userId}
        readonly
        required
      />
    </div>
    <button type="submit" class="btn btn-primary">Create</button>
  </form>
</div>

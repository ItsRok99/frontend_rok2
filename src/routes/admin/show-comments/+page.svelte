<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios';

  // Interface to specify the type of the 'editedComment' and 'comment' variables
  interface Comment {
    id: number;
    subject: string;
    text: string;
    userid: number;
  }

  let comments: Comment[] = [];
  let editedComment: Comment | null = null;
  // tukaj da dela na frontendu ------------------------------
  const jwtTokenFromStorage = localStorage.getItem('jwtToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwtTokenFromStorage}`;

  onMount(() => {
    // Fetch comments data from the backend when the component mounts
    axios
      .get('https://comment-187a.onrender.com/comments/') // Make a GET request using axios to your backend URL
      .then((response) => (comments = response.data)) // Extract the data from the response
      .catch((error) => console.error('Error fetching comments:', error));
  });

  const handleEdit = (comment: Comment) => {
    // Toggle edit mode for the selected comment
    editedComment = comment;
  };

  const handleSubjectChange = (e: Event) => {
    // Update the subject value in the editedComment state when the input field changes
    if (editedComment) {
      editedComment = { ...editedComment, subject: (e.target as HTMLInputElement).value };
    }
  };

  const handleTextChange = (e: Event) => {
    // Update the text value in the editedComment state when the input field changes
    if (editedComment) {
      editedComment = { ...editedComment, text: (e.target as HTMLInputElement).value };
    }
  };

  const handleSave = () => {
    // Send a PUT request to the backend to update the comment
    if (editedComment) {
      axios
        .put(`https://comment-187a.onrender.com/comments/${editedComment.id}`, editedComment)
        .then((response) => {
          console.log(response.data); // Log the success message from the backend if needed
          // Update the comments state to reflect the changes
          comments = comments.map((comment) =>
            comment.id === editedComment!.id ? editedComment! : comment
          );
          // Clear the editedComment state and exit edit mode
          editedComment = null;
        })
        .catch((error) => console.error('Error updating comment:', error));
    }
  };

  const handleCancelEdit = () => {
    // Clear the editedComment state and exit edit mode
    editedComment = null;
  };

  const handleDelete = (id: number) => {
    // Send a DELETE request to the backend
    axios
      .delete(`https://comment-187a.onrender.com/comments/${id}`)
      .then((response) => {
        console.log(response.data); // Log the success message from the backend if needed
        // After successful deletion, update the comments state to remove the deleted comment from the list
        comments = comments.filter((comment) => comment.id !== id);
      })
      .catch((error) => console.error('Error deleting comment:', error));
  };
</script>

<div class="container mt-5">
  <h2 class="mb-3">Comments</h2>
  <table class="table">
    <thead>
      <tr>
        <th>Subject</th>
        <th>Text</th>
        <th>User ID</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {#each comments as comment (comment.id)}
        <tr>
          <td>
            {#if editedComment && editedComment.id === comment.id}
              <input
                type="text"
                bind:value={editedComment.subject}
                on:input={handleSubjectChange}
              />
            {:else}
              {comment.subject}
            {/if}
          </td>
          <td>
            {#if editedComment && editedComment.id === comment.id}
              <input
                type="text"
                bind:value={editedComment.text}
                on:input={handleTextChange}
              />
            {:else}
              {comment.text}
            {/if}
          </td>
          <td>{comment.userid}</td>
          <td>
            {#if editedComment && editedComment.id === comment.id}
              <button class="btn btn-success btn-sm" on:click={handleSave}>
                Save
              </button>
              <button class="btn btn-secondary btn-sm" on:click={handleCancelEdit}>
                Cancel
              </button>
            {:else}
              <button
                class="btn btn-primary btn-sm"
                on:click={() => handleEdit(comment)}
              >
                Edit
              </button>
            {/if}
          </td>
          <td>
            <button
              class="btn btn-danger btn-sm"
              on:click={() => handleDelete(comment.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

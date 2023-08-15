<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios';

  let payments: any[] = [];

  onMount(() => {
    const token = localStorage.getItem('jwtToken'); // Get the token from local storage

    // Fetch payments data from the backend when the component mounts
    axios
      .get('https://payment-yvbj.onrender.com/payments/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => payments = response.data)
      .catch((error) => console.error('Error fetching payments:', error));
  });

  function handleDelete(id: string): void {
    const token = localStorage.getItem('jwtToken'); // Get the token from local storage
    
    // Send a DELETE request to the backend
    axios
      .delete(`https://payment-yvbj.onrender.com/payments/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data); // Log the success message from the backend if needed
        payments = payments.filter((payment) => payment._id !== id); // Remove the deleted payment from the list
      })
      .catch((error) => console.error('Error deleting payment:', error));
  }
</script>


<div class="container mt-5">
  <h2 class="mb-3">Payments</h2>
  <table class="table">
    <thead>
      <tr>
        <th>User ID</th>
        <th>Type</th>
        <th>Details</th>
        <th>Amount</th>
        <th>Currency</th>
        <th>Payment Status</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {#each payments as payment (payment._id)}
        <tr>
          <td>{payment.user_id}</td>
          <td>{payment.type}</td>
          <td>{payment.details}</td>
          <td>{payment.amount}</td>
          <td>{payment.currency}</td>
          <td>{payment.payment_status}</td>
          <td>
            <button class="btn btn-danger btn-sm" on:click={() => handleDelete(payment._id)}>Delete</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

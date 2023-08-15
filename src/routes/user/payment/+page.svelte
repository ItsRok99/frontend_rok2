<script lang="ts">
    import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import axios from 'axios';

  export let data: PageData;

  let userId = '';
  let type = '';
  let details = '';
  let amount = 0;
  let currency = '';
  let cartId = '';
  let paymentStatus = '';

  onMount(async()  => {
    userId = localStorage.getItem('userId') || '';
    const token = localStorage.getItem('jwtToken');
    const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        
    const cartResponse = await axios.get(`http://localhost:3032/carts/user/${userId}`, { headers });
    console.log("Cart response: ", cartResponse.data)
    
    cartId = cartResponse.data._id;
  })





  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      

      const response = await axios.post('http://localhost:3088/payments', {
        user_id: userId,
        type,
        details,
        amount,
        currency,
        payment_status: paymentStatus
      }, { headers });

      if (response.status === 201) {

        if(userId == '' || userId == null){
          console.log("User id is null or empty");
          return;
        }
        
       // Redirect to the confirmation page
        window.location.href = '/user/confirmation'; // Change the URL to the correct path
      } else {
        alert('Payment creation failed');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('An error occurred while creating the payment');
    }
  };
</script>

  <div class="container mt-5">
    <h2 class="mb-3">Create Payment</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="mb-3">
        <label for="userId" class="form-label">User ID:</label>
        <input disabled type="text" id="userId" class="form-control" bind:value={userId} required />
      </div>
      <div class="mb-3">
        <label for="type" class="form-label">Type:</label>
        <input type="text" id="type" class="form-control" bind:value={type} required />
      </div>
      <div class="mb-3">
        <label for="details" class="form-label">Details:</label>
        <input type="text" id="details" class="form-control" bind:value={details} required />
      </div>
      <div class="mb-3">
        <label for="amount" class="form-label">Amount:</label>
        <input type="number" id="amount" class="form-control" bind:value={amount} required />
      </div>
      <div class="mb-3">
        <label for="currency" class="form-label">Currency:</label>
        <input type="text" id="currency" class="form-control" bind:value={currency} required />
      </div>
      <div class="mb-3">
        <label for="paymentStatus" class="form-label">Payment Status:</label>
        <input type="text" id="paymentStatus" class="form-control" bind:value={paymentStatus} required />
      </div>
      <button type="submit" class="btn btn-primary">Create Payment</button>
    </form>
  </div>

<style>
  /* Add your CSS styles here */
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  let orders: any[] = [];

  onMount(() => {
    // Fetch orders data from the backend when the component mounts
    axios
      .get('https://order-ps5n.onrender.com/order/get/All')
      .then((response) => {
        console.log(response.data); // Log the API response to check the data structure
        orders = response.data;
      })
      .catch((error) => console.error('Error fetching orders:', error));
  });

  function handleDelete(id: string): void {
    // Send a DELETE request to the backend
    axios
      .delete(`https://order-ps5n.onrender.com/order/delete/byID?Id=${id}`)
      .then((response) => {
        console.log(response.data); // Log the success message from the backend if needed
        // After successful deletion, update the orders to remove the deleted order from the list
        orders = orders.filter((order) => order._id !== id);
      })
      .catch((error) => console.error('Error deleting order:', error));
  }
</script>


<div class="container mt-5">
  <h2 class="mb-3">Orders</h2>
  <table class="table">
    <thead>
      <tr>
        <th>Product IDs</th>
        <th>Status</th>
        <th>User ID</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {#each orders as order (order._id)}
        <tr>
          <td>{order.ProductIds.join(', ')}</td>
          <td>{order.Status}</td>
          <td>{order.userId}</td>
          <td>
            <button class="btn btn-danger btn-sm" on:click={() => handleDelete(order._id)}>Delete</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

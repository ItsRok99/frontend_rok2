<script lang="ts">
  import { onMount } from 'svelte';

  onMount(async () => {
    const getHeaders = () => {
      const token = localStorage.getItem('jwtToken');
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    };
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(`http://localhost:3032/carts/user/${userId}`, {
        headers: getHeaders(),
      });

      if (response.status === 401) {
        console.error('Authorization failed:', response.statusText);
        return;
      }

      const data = await response.json();

      const post_order = {
        //"id": "64d8ff89a951676f7f6ba111",
        "userId": data.user_id,
        "productIds": data.products_id,
        "status": 'pending',
      };

      const postOrderResponse = await fetch('https://localhost:44361/order/post/order', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(post_order),
      });

      if (postOrderResponse.status === 200) {
        alert('Order successfully created');
        const cartDeleteResponse = await fetch(`http://localhost:3032/carts/${data.id}`, {
          method: 'DELETE',
          headers: getHeaders(),
        });
      } else {
        console.error('Order creation failed:', postOrderResponse.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
</script>

<style>
  .centeredContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: Arial, sans-serif;
  }

  .innerContent {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 70%;
    max-width: 600px;
    text-align: center;
  }

  .linkStyle {
    text-decoration: none;
    color: #007BFF;
    padding: 10px 20px;
    border: 1px solid #007BFF;
    border-radius: 3px;
    margin-top: 15px;
    display: inline-block;
    transition: background-color 0.3s, color 0.3s;
  }

  .linkStyle:hover {
    background-color: #007BFF;
    color: white;
  }
</style>


<div class="centeredContainer">
  <div class="innerContent">
    <h2>Order Confirmation</h2>
    <p id="order">Your order has been successfully created!</p>
    <p>Thank you for your purchase.</p>
    <a href="/user/product-add" class="linkStyle">Back to Products</a>
  </div>
</div>


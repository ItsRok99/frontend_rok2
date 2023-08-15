<!-- Cart.svelte -->
<script lang="ts">
  import axios from "axios";

  interface Cart {
    _id: string;
    user_id: string;
    products_id: string[];
  }

  interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
  }

  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }

  let cartItems: CartItem[] = [];
  let isLoaded = false;
  let totalPrice = 0;
  var isRemovingProduct: boolean = false;

  const jwtTokenFromStorage = localStorage.getItem('jwtToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwtTokenFromStorage}`;

  // Define a function to navigate to the payment route
  const goToPayment = () => {
    // Replace 'payment-route' with the actual route for payment
    window.location.href = '/user/payment';
  };
  const fetchCartItems = async () => {
    try {
      // Get the user id from local storage
      const userId = localStorage.getItem('userId');

      // Fetch the user's cart
      const cartResponse = await fetch(`http://127.0.0.1:3032/carts/user/${userId}`, {headers: {
      "Authorization": `Bearer ${jwtTokenFromStorage}`}});
      const cartData: Cart = await cartResponse.json();

      console.log(cartData);

      // Fetch the products in the cart
      const FetchedcartItems: CartItem[] = await Promise.all(cartData.products_id.map(async (productId) => {
        const productResponse = await fetch(`http://127.0.0.1:3000/products/${productId}`, {headers: {
      "Authorization": `Bearer ${jwtTokenFromStorage}`}});
        const productData: Product = await productResponse.json();

        return {
          id: productData._id,
          name: productData.name,
          price: productData.price,
          quantity: 1,
        };
      }));

      // Check for multiple instances of the same product, delete the duplicates, and increment the quantity by how many duplicates there were
      const uniqueCartItems: CartItem[] = [];
      const deleteDuplicates: CartItem[] = [];
      FetchedcartItems.forEach((item) => {
        const itemIndex = uniqueCartItems.findIndex((uniqueItem) => uniqueItem.id === item.id);
        if (itemIndex === -1) {
          uniqueCartItems.push(item);
        } else {
          uniqueCartItems[itemIndex].quantity++;
        }
      });
      
      // Set the cart items
      cartItems = uniqueCartItems;

      // Set isLoaded to true
      isLoaded = true;

    } catch (error) {
      console.error(error);
      //Create a new cart for the user if it doesn't exist
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch('http://127.0.0.1:3032/carts', {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${jwtTokenFromStorage}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId }),
        });
        const data: Cart = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    isRemovingProduct = false;
  };

  fetchCartItems();
  
    /**
   * @param {number} id
   */
    const removeFromCart = async (id: string) => {
      isRemovingProduct = true;
      const userId = localStorage.getItem('userId');
      const cartResponse = await fetch(`http://127.0.0.1:3032/carts/user/${userId}`, {headers: {
      "Authorization": `Bearer ${jwtTokenFromStorage}`}});

      const cartData: Cart = await cartResponse.json();

      console.log(cartData);

      const newProductsId = cartData.products_id.filter((productId) => productId !== id);

      cartData.products_id = newProductsId;
      const response = await fetch(`http://127.0.0.1:3032/carts/${cartData._id}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${jwtTokenFromStorage}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });

      console.log(response);

      fetchCartItems();
      
    }

    $: totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  </script>
  <style>
    /* Bootstrap CSS classes */
    .table {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
    }
  
    th,
    td {
      padding: 10px;
      text-align: center;
    }
  
    .btn {
      margin-right: 5px;
    }
  </style>
  {#if (!isLoaded)}
    <h2>Loading...</h2>
  {:else}
  <h2>Shopping Cart</h2>
  
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each cartItems as item}
        <tr>
          <td>{item.name}</td>
          <td>${item.price}</td>
          <td>{item.quantity}</td>
          <td>
            <!-- Remove button -->
            <button disabled='{isRemovingProduct}' class="btn btn-danger" on:click={() => removeFromCart(item.id)}>
              Remove
            </button>
          </td>
        </tr>
      {/each}
      <tr>
        <td colspan="3" class="text-right">
          <strong>Total:</strong>
        </td>
        <td>
          <strong>${totalPrice}</strong>
        </td>
      </tr>
    </tbody>


  </table>
    <!-- "Buy Products" button -->
    <div class="text-right">
      <button class="btn btn-primary" on:click={goToPayment}>
        Buy Products
      </button>
    </div>
  {/if}
  
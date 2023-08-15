<!-- ProductList.svelte -->
<script lang="ts">
  import axios from "axios";
  var isAddingProduct: boolean = false;


    interface Product{
      id: string;
      name: string;
      price: number;
      description?: string;
      // Add any other properties here
    }
    let products : Product[] = [];

    const jwtTokenFromStorage = localStorage.getItem('jwtToken') || "";
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtTokenFromStorage}`;

    function fetchProducts() {
      axios
        .get("http://127.0.0.1:3000/products")
        .then((response) => (products = response.data))
        .catch((error) => console.error("Error fetching products:", error));
    }
    /**
   * @param {{ id?: number; name: any; price?: number; }} product
   */
  interface Cart {
    _id: string;
    user_id: string;
    products_id: string[];
  }

  const handleAddProduct = async (productId: string) => {
    isAddingProduct = true;
    console.log(productId);

    // Fetch the cart from the API using user ID
    const userId = localStorage.getItem('userId');
    console.log(userId);

    await fetch(`http://127.0.0.1:3032/carts/user/${userId}`, {headers: {
      "Authorization": `Bearer ${jwtTokenFromStorage}`
    }})
      .then( async (res) => {
        console.log(res);
        if (res.status === 404) {
          const requestBody = {
            "user_id": userId,
            "products_id": [productId]
          };

          // Create a new cart
          fetch('http://127.0.0.1:3032/carts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${jwtTokenFromStorage}`,
            },
            body: JSON.stringify(requestBody),
          })
            .then((res) => res.json())
            .then((data: Cart) => {
              console.log(data);
            })
            .catch((err) => {
              console.error(err);
            });
        }
        if (res.status === 200) {
          let cartData: Cart = await res.json();
          console.log(cartData);

          // Add the product to the cart
          cartData.products_id.push(productId);
          console.log("cart_id", cartData._id)

          // Update the cart
          fetch(`http://127.0.0.1:3032/carts/${cartData._id}`, {
            method: 'PUT',
            headers: {
              "Authorization": `Bearer ${jwtTokenFromStorage}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartData),
          })
            .then((res) => res.json())
            .then((data: Cart) => {
              console.log(data);
            })
            .catch((err) => {
              console.error(err);
            });
      }})
      isAddingProduct = false
  };



    fetchProducts();
  </script>
  
  <h1>Product List</h1>
  
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Product</th>
        <th>Description</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each products as product}
        <tr>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>${product.price}</td>
          <td><button disabled='{isAddingProduct}' class="btn btn-primary" on:click={() => handleAddProduct(product.id)}>Add to Cart</button></td>
        </tr>
      {/each}
    </tbody>
  </table>
  
<!-- ProductList.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import axios from 'axios';
    interface Product {
      id: string;
      name: string;
      description: string;
      price: number;
    }
    
    const productStore = writable<(Product | null)[]>([]);
    let editedProduct: Product | null = null;

    
    const jwtTokenFromStorage = localStorage.getItem('jwtToken') || "";
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtTokenFromStorage}`;

    onMount(() => {
      axios
        .get('http://localhost:3000/products/')
        .then((response) => productStore.set(response.data))
        .catch((error) => console.error('Error fetching products:', error));
    });

    $: products = $productStore.filter((product) => product !== null) as Product[];

    /**
   * @param {number} index
   */

    const handleDelete = (index: number) => {
      axios
        .delete(`http://localhost:3000/products/${products[index].id}`)
        .then((response) => {
          console.log(response.data);
          productStore.update((prevProducts) => prevProducts.filter((product) => product?.id !== products[index].id));
        })
        .catch((error) => console.error('Error deleting product:', error));
    }
  
    // Function to edit product details (not implemented in this example)
    /**
   * @param {{ name: string; description: string; price: number; }} product
   */
    const handleEdit = (product: Product) => {
      editedProduct = product;
    }

    const handleCancelEdit = () => {
      editedProduct = null;
    }
    const handleSave = () =>{
      if (editedProduct) {
        axios
          .put(`http://localhost:3000/products/${editedProduct.id}`, editedProduct)
          .then((response) => {
            console.log(response.data);
            productStore.update((prevProducts) =>
              prevProducts.map((product) => (product?.id === editedProduct!.id ? editedProduct : product))
            );
            editedProduct = null;
          })
          .catch((error) => console.error('Error updating product:', error));
      }
    }
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
  
  <h2>Product List</h2>
  
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each products as product, index}
        <tr>
          <td>
            {#if editedProduct && editedProduct.id === product.id}
              <input type="text" bind:value={editedProduct.name} />
            {:else}
              {product.name}
            {/if}
          </td>
          <td>
            {#if editedProduct && editedProduct.id === product.id}
            <input type="text" bind:value={editedProduct.description} />
          {:else}
            {product.description}
          {/if}
          </td>
          <td>
            {#if editedProduct && editedProduct.id === product.id}
            <input type="text" bind:value={editedProduct.price} />
          {:else}
            {product.price}
          {/if}
          </td>
          <td>
            {#if editedProduct && editedProduct.id === product.id}
              <button class="btn btn-primary" on:click={handleSave}>
                Save
              </button>
              <button class="btn btn-danger" on:click={handleCancelEdit}>
                Cancel
              </button>
            {:else}
            <!-- Edit button -->
            <button class="btn btn-primary" on:click={() => handleEdit(product)}>
              Edit
            </button>
            {/if}
            <!-- Delete button -->
            <button class="btn btn-danger" on:click={() => handleDelete(index)}>
              Delete
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  
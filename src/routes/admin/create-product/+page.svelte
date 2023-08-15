<!-- CreateProduct.svelte -->
<script>
    import axios from "axios";

    let name = "";
    let description = "";
    let price = "";

    const jwtTokenFromStorage = localStorage.getItem('jwtToken');
     
    function createProduct() {
      const requestBody = {
        "name": name,
        "description": description,
        "price": price,
      };
  
      fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtTokenFromStorage}`,
        },
        body: JSON.stringify(requestBody),
      })
        .catch((err) => {
          console.error(err);
          alert("Error creating product");
        });
    }
  </script>
  
  <style>
    /* Bootstrap CSS classes */
    .container {
      max-width: 400px;
      margin: 20px auto;
    }
  
    .form-group {
      margin-bottom: 20px;
    }
  
    .btn {
      width: 100%;
    }
  </style>
  
  <div class="container">
    <h2>Create a Product</h2>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" bind:value={name} />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <input type="text" class="form-control" id="description" bind:value={description} />
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input type="number" class="form-control" id="price" bind:value={price} />
    </div>
    <button class="btn btn-primary" on:click={createProduct}>Create Product</button>
  </div>
  
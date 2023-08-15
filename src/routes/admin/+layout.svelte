<!-- Admin.svelte -->
<script>
  async function handleLogout() {
    // Perform any client-side logout actions here if needed
    // For example, clearing local storage, session data, etc.

    // Redirect to the login page
    window.location.href = '/login';
  }
</script>

<main class="container mt-5">
  <h1 class="mb-4">Admin Panel</h1>
  <!-- Your tab component -->
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <!--
    <li class="nav-item" role="presentation">
      <a class="nav-link active" id="settings-tab" data-bs-toggle="tab" href="/admin/settings" role="tab" aria-controls="settings"
        aria-selected="false">Settings</a>
    </li>
    -->
    <li class="nav-item" role="presentation">
      <a class="nav-link" id="create-user-tab" data-bs-toggle="tab" href="/admin/create-user" role="tab"
        aria-controls="create-user" aria-selected="false">Create user</a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" id="user-list-tab" data-bs-toggle="tab" href="/admin/user-list" role="tab"
        aria-controls="user-list" aria-selected="false">User list</a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" id="create-product-tab" data-bs-toggle="tab" href="/admin/create-product" role="tab"
        aria-controls="create-product" aria-selected="false">Create product</a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" id="product-list-tab" data-bs-toggle="tab" href="/admin/product-list" role="tab"
        aria-controls="product-list" aria-selected="false">Product list</a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" id="show-comments-tab" data-bs-toggle="tab" href="/admin/show-comments" role="tab"
        aria-controls="show-comments" aria-selected="false">Show Comments</a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" id="show-orders-tab" data-bs-toggle="tab" href="/admin/show-orders" role="tab"
        aria-controls="show-orders" aria-selected="false">Show Orders</a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" id="show-payments-tab" data-bs-toggle="tab" href="/admin/show-payments" role="tab"
        aria-controls="show-payments" aria-selected="false">Show Payments</a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" id="show-statistics-rok-tab" data-bs-toggle="tab" href="/admin/show-statistics-rok" role="tab"
        aria-controls="show-statistics-rok" aria-selected="false">Show Statistics Rok</a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" id="show-statistics-nik-tab" data-bs-toggle="tab" href="/admin/show-statistics-nik" role="tab"
        aria-controls="show-statistics-nik" aria-selected="false">Show Statistics Nik</a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" id="show-logs-nik-tab" data-bs-toggle="tab" href="/admin/show-logs-nik" role="tab"
        aria-controls="show-logs-nik" aria-selected="false">Show Logs Nik</a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" id="show-logs-rok-tab" data-bs-toggle="tab" href="/admin/show-logs-rok" role="tab"
        aria-controls="show-logs-rok" aria-selected="false">Show Logs Rok</a>
    </li>
    <!-- Logout Tab -->
    <li class="nav-item" role="presentation">
      <!-- <a class="nav-link" id="logout-tab" href="#" role="tab" aria-controls="logout" aria-selected="false" on:click={handleLogout}>Logout</a> -->
      <button class="nav-link" id="logout-tab" role="tab" aria-controls="logout" aria-selected="false" on:click={handleLogout}>Logout</button>

    </li>
  </ul>

  <slot></slot>
</main>

<style>
  /* Add your custom styles here */
</style>

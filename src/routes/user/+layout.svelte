<!-- Your tab component -->
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <a
      class="nav-link"
      id="product-add-tab"
      data-bs-toggle="tab"
      href="/user/product-add"
      role="tab"
      aria-controls="product-add"
      aria-selected="false">Product list</a
    >
  </li>
  <li class="nav-item" role="presentation">
    <a
      class="nav-link"
      id="cart-tab"
      data-bs-toggle="tab"
      href="/user/cart"
      role="tab"
      aria-controls="cart"
      aria-selected="false">Cart</a
    >
  </li>
  <li class="nav-item" role="presentation">
    <a
      class="nav-link"
      id="cart-tab"
      data-bs-toggle="tab"
      href="/user/add-comments"
      role="tab"
      aria-controls="cart"
      aria-selected="false">Add Comments</a
    >
  </li>
  <li class="nav-item" role="presentation">
    <a
      class="nav-link"
      id="login-tab"
      data-bs-toggle="tab"
      href="/login"
      role="tab"
      aria-controls="/login"
      aria-selected="false">Logout</a
    >
  </li>
</ul>

<slot />

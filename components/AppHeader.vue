<template>
  <div>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl">Мой сайт</a>
      </div>
      <div class="navbar-center">
        <ul class="menu menu-horizontal px-1">
          <li><a href="/">Главная</a></li>
          <li><a href="/posts">Посты</a></li>
          <li class="disabled">
            <details class="dropdown dropdown-end">
              <summary>В разработке</summary>
              <ul class="p-2">
                <li><a>Тест 1</a></li>
                <li><a>Тест 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>О нас</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabindex="0"
            class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div class="card-body">
              <span class="text-lg font-bold">8 Items</span>
              <span class="text-info">Subtotal: $999</span>
              <div class="card-actions">
                <button class="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="access_token"><UserProfile /></div>
        <div v-else><button @click="navigateTo('/login')">Войти</button></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const access_token = useCookie("access_token");
</script>

<style></style>

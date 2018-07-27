<template>
  <div class="container-fluid">
    <div class="row">
      <header id="header">
        <div class="logo" v-if="!authUser">
          <router-link to="/">Vue - Tipster Dashboard</router-link>
        </div>
        <nav class="ml-auto">
          <ul>
            <li v-if="!authUser">
              <router-link to="/signup">Sign Up</router-link>
            </li>
            <li v-if="!authUser">
              <router-link to="/signin">Sign In</router-link>
            </li>
            <li v-if="authUser">
              <router-link to="/dashboard">Dashboard</router-link>
            </li>
            <li v-if="authUser">
              <button @click="onLogout" class="logout">Logout</button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      authUser() {
        return this.$store.getters.isAuthenticated;
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
<style scoped>
  #header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #009688;
    padding: 0 20px;
    width: 100%;
  }

  .logo {
    font-weight: 700;
    color: #ffffff;
  }

  .logo a {
    text-decoration: none;
    color: #ffffff;
    font-weight: 700;
  }

  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: #ffffff;
    font-weight: 700;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #4dbfa2;
    font-weight: 700;
  }

  .logout {
    background-color: transparent;
    border: none;
    font: inherit;
    color: #ffffff;
    cursor: pointer;
  }
  
  @media only screen and (max-width: 1024px) {
    .logo{
      font-size: 15px;
    }

    li a{
      font-size: 12px;
    }
  }
</style>
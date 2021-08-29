<template>
  <div class="osrs-navbar-container">
    <div class="osrs-navbar-app-icon">
      <img
        src="../static/osrs/Worn equipment.png"
        alt="app icon"
      >
    </div>
    <router-link
      class="osrs-navbar-link"
      :to="{ name: 'Loadouts' }"
      active-class="osrs-navbar-active-link"
      exact
    >
      Loadouts
    </router-link>
    <router-link
      class="osrs-navbar-link"
      :to="{ name: 'DataManagement' }"
      active-class="osrs-navbar-active-link"
      exact
    >
      Data
    </router-link>
    <router-link
      class="osrs-navbar-link"
      :to="{ name: 'About' }"
      active-class="osrs-navbar-active-link"
      exact
    >
      About
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'OsrsNavbar',
};
</script>

<style scoped>
.osrs-navbar-container {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 32px;
  background: var(--osrs-darker);
  align-items: center;
  padding: 4px 8px;
  box-shadow: 1px 1px 6px black;
}

.osrs-navbar-container a {
  font-family: "runescape_quill_8regular", "Roboto", sans-serif;
  text-shadow: 1px 1px 1px black;
  font-size: 16px;
  color: var(--osrs-font-color);
}

.osrs-navbar-link {
  display: flex;
  align-items: center;
  min-width: 64px;
  min-height: 32px;
  padding: 10px;
  background: var(--osrs-dark);
  border: 2px solid var(--osrs-lightest-black-brown);
  text-decoration: none;
  margin: 0 2px;
  border-radius: 4px 20px 0 0;
  overflow: hidden;
}

.osrs-navbar-link.osrs-navbar-active-link {
  background: var(--osrs-darker);
  border-bottom: 2px solid transparent;
}

.osrs-navbar-app-icon {
  max-width: 32px;
  margin: 0 10px;
}
</style>

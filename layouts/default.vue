<template>
  <div class="d-flex flex-column vh-100" style="overflow: hidden;">
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light slds-context-bar"
      style="height: 50px;"
    >
      <div style="width: 35px; height: 35px;">
        <svg viewBox="0 0 64 64">
          <path fill="#00a1e0" d="M23 6h22l-8 18h11L20 58l6-26H16l7-26z" />
          <path
            fill="#032e61"
            d="M20 60a2 2 0 0 1-1.95-2.45L23.5 34H16a2 2 0 0 1-1.93-2.52l7-26A2 2 0 0 1 23 4h22a2 2 0 0 1 1.83 2.81L40.08 22H48a2 2 0 0 1 1.54 3.27l-28 34A2 2 0 0 1 20 60zm-1.4-30H26a2 2 0 0 1 1.95 2.45l-4.1 17.72L43.76 26H37a2 2 0 0 1-1.83-2.81L41.92 8h-17.4z"
          />
          <path
            fill="#fff"
            d="M26 26a2 2 0 0 1-1.93-2.53l3-11a2 2 0 1 1 3.86 1.05l-3 11A2 2 0 0 1 26 26z"
          />
        </svg>
      </div>
      <a
        class="navbar-brand mr-auto slds-context-bar__app-name"
        style="font-family: 'Salesforce Sans';"
        href="#"
        >Lightning Schema Builder</a
      >
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <div
          class="d-flex"
          style="position: relative; width: 100%; height: 50px;"
        >
          <button
            class="slds-button slds-button_icon ml-auto"
            style="margin-right: 25px; !important"
            title="Show Favorites"
            @click="toogleMenu"
          >
            <span
              class="slds-avatar slds-icon-standard-user slds-avatar_circle slds-avatar-profile-button ml-auto"
            >
              <img
                :src="profilePicture"
                :title="$store.state.auth.user.display_name"
                style="height: 100% !important; width: 100% !important;"
              />
            </span>
            <span class="slds-assistive-text">Profile</span>
          </button>
          <section
            v-if="showMenu"
            aria-describedby="dialog-body-id-18"
            aria-label="My Favourites"
            class="slds-popover slds-nubbin_top-right slds-dynamic-menu"
            role="dialog"
            style="position: absolute; right: 15px; top: 65px; width: 400px;"
          >
            <div
              id="dialog-body-id-18"
              class="slds-popover__body slds-p-horizontal_none"
            >
              <div class="slds-grid">
                <div class="slds-col slds-p-left_small slds-size_4-of-12">
                  <span
                    class="slds-avatar slds-icon-standard-user slds-avatar_circle slds-avatar-profile-button-menu ml-auto"
                  >
                    <img
                      alt="Person name"
                      :src="profilePicture"
                      title="Person name"
                      style="height: 100% !important; width: 100% !important;"
                    />
                  </span>
                </div>
                <div class="slds-col slds-grid slds-grid_vertical">
                  <span
                    class="slds-m-bottom_x-small"
                    style="font-size: 25px;"
                    role="presentation"
                  >
                    {{ $store.state.auth.user.display_name }}
                  </span>
                  <span
                    class="slds-m-bottom_x-small"
                    style="font-size: 15px;"
                    role="presentation"
                  >
                    {{ $store.state.auth.user.email }}
                  </span>
                  <a @click="logout">
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </nav>
    <!-- Global content -->
    <div class="slds-global-content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      showMenu: false,
    }
  },
  computed: {
    profilePicture() {
      return this.$store.state.auth.user.photos
        ? this.$store.state.auth.user.photos.picture
        : null
    },
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    toogleMenu() {
      this.showMenu = !this.showMenu
    },
  },
}
</script>

<style scoped>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

a:not(.navbar-brand) {
  color: var(--lwc-brandTextLink, rgb(0, 109, 204)) !important;
  font-weight: normal !important;
  font-family: Arial, Helvetica, sans-serif;
  transition: color 0.1s linear !important;
}

a:hover:not(.navbar-brand) {
  text-decoration: underline !important;
}

.slds-avatar-profile-button {
  width: 2rem;
  height: 2rem;
}

.slds-avatar-profile-button-menu {
  width: 6rem;
  height: 6rem;
}
</style>

<template>
  <div>
    <button
      v-if="!$store.state.auth.loggedIn"
      class="slds-button slds-button_brand"
      @click="login"
    >
      Login
    </button>
    <button class="slds-button slds-button_brand" @click="query">
      Query
    </button>
  </div>
</template>

<script>
export default {
  layout: 'login',
  middleware: ['auth_callback'],
  methods: {
    login() {
      window.location = `${process.env.SALESFORCE_ENV}/services/oauth2/authorize?client_id=${process.env.SALESFORCE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_CALLBACK}&response_type=code&scope=${process.env.SALESFORCE_SCOPES}&state=oWcNMwVju4NZvKgQbWFb`
    },
    query() {
      this.$axios
        .$get(
          `/api/salesforce/v${process.env.SALESFORCE_API_VERSION}/query?q=SELECT+Id+FROM+Account+LIMIT+1`,
          {
            headers: {
              authorization: `Bearer ${this.$store.state.auth.access_token}`,
            },
          }
        )
        .then((response) => console.log(response))
        .catch((e) => console.error(e))
    },
  },
}
</script>

<style></style>

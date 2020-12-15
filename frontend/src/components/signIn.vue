<template>
  <div>
    <v-btn
      Normal
      @click="handleClickSignIn"
      v-if="!this.isSignIn"
      :disabled="!this.isInit"
    >sign in</v-btn>
    <v-btn
      Normal
      @click="handleClickSignOut"
      v-if="this.isSignIn"
      :disabled="!this.isInit"
    >sign out</v-btn>
  </div>
</template>

<script>
export default {
  name: 'signIn',

  data () {
    return {
      isInit: false,
      isSignIn: false,
    }
  },

  methods: {

    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        // console.log("googleUser", googleUser);
        // console.log("getId", googleUser.getId());
        // console.log("getBasicProfile", googleUser.getBasicProfile());
        // console.log("getAuthResponse", googleUser.getAuthResponse());
        // console.log(
        //   "getAuthResponse",
        //   this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
        // );
        this.isSignIn = this.$gAuth.isAuthorized;
        this.$router.push({ path: 'Subscriptions' })  // push to route
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        this.isSignIn = this.$gAuth.isAuthorized;
        console.log("isSignIn", this.$gAuth.isAuthorized);
        this.$router.push({ path: '/' })  // push to route
      } catch (error) {
        console.error(error);
      }
    },

  },

  created() {
    let that = this;
    let checkGauthLoad = setInterval(function () {
      that.isInit = that.$gAuth.isInit;
      that.isSignIn = that.$gAuth.isAuthorized;
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 1000);
  },



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

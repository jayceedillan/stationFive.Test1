<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Test - radio buttons</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank"></v-btn>
    </v-toolbar>

    <v-content>
      <Test />
      <vue-snotify></vue-snotify>
    </v-content>
  </v-app>
</template>

<script>
import Test from "./views/Test.vue";

export default {
  name: "App",
  components: {
    Test
  },
  data() {
    return {
      //
    };
  }
};
</script>

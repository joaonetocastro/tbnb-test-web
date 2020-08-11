<template>
  <div>
    <main-app-bar />
    <v-app>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import MainAppBar from "./components/MainAppBar.vue";
export default {
  name: "App",

  components: { MainAppBar },

  data: () => ({
    //
  })
};
</script>

<template>
  <v-app>
    <Setup />
    <v-app-bar app dark>

        <v-img
          max-height="70"
          max-width="70"
          src="https://near.org/wp-content/themes/near-19/assets/downloads/near_icon_wht.png"
        ></v-img>

      <h4  class="text-h4 font-weight-black mr-14">BTM</h4>
      
      <v-tabs
        dark
        slider-color="white"
        
      >
        <v-tab to="/">Ví</v-tab>
        <v-tab to="/vay">Vay</v-tab>
        <v-tab to="/hotro">Hỗ Trợ</v-tab>
      </v-tabs>
      <v-chip>
        {{$store.state.address}}
      </v-chip>
    </v-app-bar>

    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <router-view></router-view>
        </v-layout>
      </v-container>
    </v-main>
  
  </v-app>
</template>

<script>
import Setup from './components/setup.vue'
export default {
  name: "App",
  components:{
    Setup
  },
  data: () => ({
    address:"Chưa kết nối......"
  }),
  
};
</script>

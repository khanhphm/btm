<template>
  <v-card class="" elevation="3" width="632">
    <v-tabs fixed-tabs height="70" color="gray">
      <v-tab>
        Balance
      </v-tab>
    </v-tabs>
    <v-container fill-height fluid>
      <v-row class="mt-10">
        <v-col align="center" justify="center">
          <p class="balanceNumber">{{ parseInt($store.state.amount) }}</p>

          <p class="text--disabled">{{ $store.state.address }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center" justify="center">
          <v-container class="">
            <v-row>
              <v-col></v-col>
              <v-row>
                
                <v-col cols="4" justify="center">
                  <v-btn
                    class="mb-3"
                    @click="()=>{this.dialogNap = true}"
                    x-large
                    elevation="2"
                    fab
                    dark
                    color="black"
                  >
                    <v-icon class="ml-1">mdi-send</v-icon>
                  </v-btn>
                  <p class="text--disabled ">Gửi</p>
                </v-col>
                
                <v-col cols="4" align="center">
                  <v-btn
                    class="mb-3"
                    x-large
                    elevation="2"
                    fab
                    dark
                    @click="()=>{this.dialogRut = true}"
                  >
                    <v-icon class="mr-1">mdi-subdirectory-arrow-left</v-icon>
                  </v-btn>
                  <p class="text--disabled">Rút</p>
                </v-col>
                
                <v-col cols="4" align="center">
                  <v-btn
                    class="mb-3"
                    x-large
                    elevation="2"
                    fab
                    dark
                    @click="()=>{this.dialogChuyen = true}"
                  >
                    <v-icon class="mr-1">mdi-arrow-up</v-icon>
                  </v-btn>
                  <p class="text--disabled">Chuyển</p>
                </v-col>
              </v-row>

              <v-col></v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0">
          <v-container> </v-container>

          <v-divider class=""></v-divider>

          <v-card flat title class="d-flex flex-row ">
            <v-container>
              <v-row>
                <v-col class="d-flex flex-row ">
                  <div>
                    <v-img
                      src="https://s3-us-west-1.amazonaws.com/compliance-ico-af-us-west-1/production/token_profiles/logos/original/9d5/c43/cc-/9d5c43cc-e232-4267-aa8a-8c654a55db2d-1608222929-b90bbe4696613e2faeb17d48ac3aa7ba6a83674a.png"
                      :width="32"
                      :height="32"
                    ></v-img>
                  </div>

                  <h2 class="ml-3">BTM</h2>
                </v-col>
                
                

                
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
        v-model="dialogNap"
        max-width="300px"
        transition="dialog-transition"
    >
        <v-card>
            <v-app-bar dark>
                <h3 class="text-h5 font-weight-black">Gửi Tiền</h3>
            </v-app-bar>

            
            <v-container class="d-flex align-center">
                <v-text-field label="Tiền Gửi" v-model="amountGui"></v-text-field>
                <v-btn @click="send(amountGui)" dark>Gửi</v-btn>
            </v-container>

            
            

        </v-card>
    </v-dialog>
    
    <v-dialog
        v-model="dialogChuyen"
        max-width="300px"
        transition="dialog-transition"
    >
        <v-card>
            <v-app-bar dark>
                <h3 class="text-h5 font-weight-black">Chuyển Tiền</h3>
            </v-app-bar>

            
            <v-container>
                <v-text-field label="Tiền Gửi (finney)" v-model="amountChuyen"></v-text-field>
                <v-text-field label="Địa chỉ" v-model="addressChuyen"></v-text-field>
                <v-btn @click="transfer()" dark>Chuyển</v-btn>
            </v-container>

            
            

        </v-card>
    </v-dialog>
<v-dialog
        v-model="dialogRut"
        max-width="300px"
        transition="dialog-transition"
    >
        <v-card>
            <v-app-bar dark>
                <h3 class="text-h5 font-weight-black">Rút Tiền</h3>
            </v-app-bar>

            
            <v-container class="d-flex align-center">
                <v-text-field label="Tiền Gửi" v-model="amountRut"></v-text-field>
                <v-btn @click="withdraw(amountRut)" dark>Rút</v-btn>
            </v-container>

            
            

        </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import {contract} from '../web3/contract'
//import {web3} from '../web3/web3'
export default {
  name: "wallet",

  components: {},

  data: () => ({
    dialogNap: false,
    dialogRut: false,
    dialogChuyen: false,
    
    amountGui:"",
    amountChuyen:"",
    amountRut:"",
    addressChuyen:""
  }),
  async created(){
    this.address = this.$store.state.address;  
    //this.$data.amount = this.$store.state.amount;
  },
  methods: {
      send(amount){
          
          let a = parseInt(amount)
          contract.methods.deposit().send({from:this.$store.state.address,value: a*1000000000000000});
      },
      transfer(){
          console.log(this.addressChuyen);
          let a = parseInt(this.amountChuyen)
          contract.methods.transfer(this.addressChuyen,a).send({from:this.$store.state.address});
      },
      withdraw(amount){
          contract.methods.withdraw(parseInt(amount)).send({from:this.$store.state.address});
      }
  },
  async mounted() {
      
      
      contract.events.data().on('data',async ()=>{
          this.$store.state.vay =await contract.methods.getVay().call({from:this.$store.state.address})
          this.$store.state.amount =await contract.methods.getBalance().call({from:this.$store.state.address})
      })
      contract.events.data().on('data',async ()=>{
        this.$store.state.amount =await contract.methods.getBalance().call({from:this.$store.state.address})
        this.$store.state.vay =await contract.methods.getVay().call({from:this.$store.state.address})
      })
  },
};
</script>

<style scoped>
.balanceNumber {
  font-size: 4rem;
  font-weight: 900;
  margin: 0;
}
.text--disabled {
  font-size: 1rem;
}
.text-token {
  text-align: center;
}
</style>

<template>
  <v-layout>
  <v-container>
  <v-flex  xs12 sm6 offset-sm3>
    <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline">Login</h3>
            <div>Please enter your credentials and log into the application or sign-up</div>
          </div>
        </v-card-title>
        <v-form ref="form" v-model="valid">
        <v-container flud grid-list-lg>
            <v-layout column wrap>
                <v-flex xs-12>
                    <v-text-field
                         label="Email"
                         v-model="username"
                         :rules="usernameRules"
                    >
                    </v-text-field>
                </v-flex>
                <v-flex>
                    <v-text-field
                        label="Password"
                        :rules="passwordRules"
                        type="password"
                        v-model="password"
                    >
                    </v-text-field>
                </v-flex>
            </v-layout>
        </v-container>
        
        <v-btn @click="login" color="primary" :disabled="!valid">Login</v-btn>
        <v-btn @click="toSignUp" flat color="primary">Sign up</v-btn>
      
        </v-form>
     
    </v-card>
 </v-flex>
  </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import NoAuthenticationMixin from "../../mixins/NoAuthentication";

@Component({
  mixins: [NoAuthenticationMixin]
})
export default class Login extends Vue {
  public username: string = "";
  public password: string = "";
  public valid: boolean = false;

  public usernameRules: any[];
  public passwordRules: any[];

  @Getter("isLoggedIn")
  isLoggedIn;

  @Action("Login")
  signIn: any;
  constructor() {
    super();
    this.usernameRules = [
      (v: string) => !!v || "E-mail is required",
      (v: string) => /.+@.+/.test(v) || "E-mail must be valid"
    ];
    this.passwordRules = [(v: string) => !!v || "Password is required"];
  }

  login() {
    if ((this.$refs.form as any).validate()) {
      this.signIn({
        username: this.username,
        password: this.password
      });
    }
  }
  toSignUp() {
    this.$router.push("/signup");
  }

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.isLoggedIn) {
        next("/");
      }
    });
  }
}
</script>

<style scoped>
</style>




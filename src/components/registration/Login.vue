<template>
  <v-layout>
    <v-container>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline">Login</h3>
              <div>Please enter your credentials and log into the application or sign-up</div>
            </div>
          </v-card-title>
          <v-form ref="form">
            <v-container flud grid-list-lg>
              <v-layout column wrap>
                <v-flex xs-12>
                  <v-text-field
                    label="Email"
                    v-model="username"
                    :error-messages="usernameErrors"
                    @blur="$v.username.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="Password"
                    type="password"
                    v-model="password"
                    :error-messages="passwordErrors"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>

            <v-btn @click="login" color="primary" :disabled="$v.$invalid">Login</v-btn>
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

import { withParams } from "vuelidate/lib";
import { required, minLength, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

import NoAuthenticationMixin from "../../mixins/NoAuthentication";
import ErrorGenerator from "../../shared/error-parser";
import CustomValidators from "../../shared/validators";

@Component({
  mixins: [NoAuthenticationMixin, validationMixin],
  validations: {
    username: { required, email },
    password: { required, minLength: minLength(6) }
  }
})
export default class Login extends Vue {
  public username: string = "";
  public password: string = "";

  @Getter("isLoggedIn")
  isLoggedIn;

  @Action("Login")
  signIn: any;
  constructor() {
    super();
  }

  get usernameErrors() {
    return ErrorGenerator.parse(this.$v.username, "Email");
  }

  get passwordErrors() {
    return ErrorGenerator.parse(this.$v.password, "Password");
  }

  login() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
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




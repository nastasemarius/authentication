<template>
  <v-layout>
  <v-container>
  <v-flex  xs12 sm6 offset-sm3>
    <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline">Sign up</h3>
          </div>
        </v-card-title>
        <v-form ref="form" v-model="valid">
        <v-container flud grid-list-lg>
          <v-layout column wrap>
              <v-flex xs-12>
                <v-text-field
                  label="First name"
                  v-model="firstName"
                  :rules="firstNameRules"
                >
                </v-text-field>
                <v-text-field
                  label="Last Name"
                  v-model="lastName"
                  :rules="lastNameRules"
                >
                </v-text-field>
            </v-flex>
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
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :type="show? 'text' : 'password'"
                @click:append="show = !show"
                v-model="password"
              >
             </v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                label="Password confirmation"
                :rules="passwordConfirmationRules"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :type="show? 'text' : 'password'"
                @click:append="show = !show"
                v-model="passwordConfirmation"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        
        <v-btn @click="register" color="primary" :disabled="!valid">Register</v-btn>
        <v-btn @click="goBack" flat color="primary">Back</v-btn>
      
        </v-form>
     
    </v-card>
 </v-flex>
  </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component({})
export default class Login extends Vue {
  public show: boolean = false;

  public firstName: string = "";
  public lastName: string = "";
  public username: string = "";
  public password: string = "";
  public passwordConfirmation: string = "";
  public valid: boolean = false;

  public usernameRules: any[];
  public passwordRules: any[];
  public passwordConfirmationRules: any[];
  public firstNameRules: any[];
  public lastNameRules: any[];

  @Action("SignUp")
  signUp: any;
  constructor() {
    super();
    this.usernameRules = [
      (v: string) => !!v || "E-mail is required",
      (v: string) => /.+@.+/.test(v) || "E-mail must be valid"
    ];
    this.passwordRules = [
      (v: string) => !!v || "Password is required",
      (v: string) =>
        v === this.passwordConfirmation ||
        !this.passwordConfirmation ||
        "Password should match Password confirmation"
    ];
    this.passwordConfirmationRules = [
      (v: string) => !!v || "Password confirmation is required"
    ];
    this.firstNameRules = [(v: string) => !!v || "First name is required"];
    this.lastNameRules = [(v: string) => !!v || "Last name is required"];
  }

  register() {
    if ((this.$refs.form as any).validate()) {
      this.signUp({
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password
      });
    }
  }
  goBack() {
    this.$router.push("/");
  }
}
</script>

<style scoped>
</style>




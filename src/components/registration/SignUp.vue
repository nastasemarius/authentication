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
        <v-form ref="form">
        <v-container flud grid-list-lg>
          <v-layout column wrap>
              <v-flex xs-12>
                <v-text-field
                  label="First name"
                  v-model="firstName"
                  :error-messages="firstNameErrors"
                  @blur="$v.firstName.$touch()"
                  required
                >
                </v-text-field>
                <v-text-field
                  @blur="$v.lastName.$touch()"
                  :error-messages="lastNameErrors"
                  label="Last Name"
                  v-model="lastName"
                >
                </v-text-field>
            </v-flex>
            <v-flex xs-12>
              <v-text-field
                :error-messages="usernameErrors"
                label="Email"
                @blur="$v.username.$touch()"
                v-model="username"
              >
              </v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                label="Password"
                @blur="$v.password.$touch()"
                :error-messages="passwordErrors"
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
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :type="show? 'text' : 'password'"
                @click:append="show = !show"
                v-model="passwordConfirmation"
                @blur="$v.passwordConfirmation.$touch()"
                :error-messages="passwordConfirmationErrors"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        
        <v-btn @click="register"  :disabled="$v.$invalid" color="primary" >Register</v-btn>
        <v-btn @click="goBack" flat color="primary">Back</v-btn>
      
        </v-form>
     
    </v-card>
 </v-flex>
  </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import UsersService from "../../services/users.service";
import {
  required,
  minLength,
  between,
  email,
  sameAs
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

import NoAuthenticationMixin from "../../mixins/NoAuthentication";
import errorMessage from "../../shared/error-dictionary";

@Component({
  mixins: [NoAuthenticationMixin, validationMixin],
  validations: {
    firstName: { required, minLength: minLength(10) },
    lastName: { required, minLength: minLength(3) },
    username: {
      isUnique(val: string) {
        if (!val) {
          return true;
        }
        return new Promise((resolve, reject) => {
          UsersService.findUser(val).then((user: any) => {
            resolve(val !== user.data.username);
          });
        });
      },
      required,
      email
    },
    password: {
      required,
      sameAs: sameAs("passwordConfirmation"),
      minLength: minLength(6)
    },
    passwordConfirmation: { required }
  }
})
export default class Login extends Vue {
  public show: boolean = false;

  public firstName: string = "";
  public lastName: string = "";
  public username: string = "";
  public password: string = "";
  public passwordConfirmation: string = "";

  @Getter("isLoggedIn")
  isLoggedIn;

  @Action("SignUp")
  signUp: any;
  constructor() {
    super();
  }

  get firstNameErrors() {
    const errors: any[] = [];

    if (!(this.$v as any).firstName.$dirty) return errors;
    !(this.$v as any).firstName.minLength &&
      errors.push(errorMessage("minLength", "First name", (this.$v.firstName as any).$params.minLength.min));
    !(this.$v as any).firstName.required &&
      errors.push(errorMessage("required", "First name"));

    return errors;
  }

  get lastNameErrors() {
    const errors: any[] = [];
    if (!(this.$v as any).lastName.$dirty) return errors;
    !(this.$v as any).lastName.minLength &&
      errors.push(errorMessage("minLength", "Last name", (this.$v.lastName as any).$params.minLength.min));
    !(this.$v as any).lastName.required &&
      errors.push(errorMessage("required", "Last name"));

    return errors;
  }

  get usernameErrors() {
    const errors: any[] = [];
    if (!(this.$v as any).username.$dirty) return errors;
    !(this.$v as any).username.required &&
      errors.push(errorMessage("required", "Email"));
    !(this.$v as any).username.email &&
      errors.push(errorMessage("email", "Email"));

    !(this.$v as any).username.isUnique &&
      errors.push(errorMessage("unique", "Email"));

    return errors;
  }

  get passwordErrors() {
    const errors: any[] = [];
    if (!(this.$v as any).password.$dirty) return errors;
    !(this.$v as any).password.required &&
      errors.push(errorMessage("required", "Password"));
    !(this.$v as any).password.sameAs &&
      errors.push(
        errorMessage("sameAs", "Password", "", "password confirmation")
      );
    !(this.$v as any).password.minLength &&
      errors.push(errorMessage("minLength", "Password", (this.$v.password as any).$params.minLength.min));

    return errors;
  }

  get passwordConfirmationErrors() {
    const errors: any[] = [];
    if (!(this.$v as any).passwordConfirmation.$dirty) return errors;
    !(this.$v as any).passwordConfirmation.required &&
      errors.push(errorMessage("required", "Password confirmation"));

    return errors;
  }

  register() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
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




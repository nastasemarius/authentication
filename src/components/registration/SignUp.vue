<template>
  <v-layout>
    <v-container>
      <v-flex xs12 sm6 offset-sm3>
        <v-card flat>
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
                  ></v-text-field>
                  <v-text-field
                    @blur="$v.lastName.$touch()"
                    :error-messages="lastNameErrors"
                    label="Last Name"
                    v-model="lastName"
                  ></v-text-field>
                </v-flex>
                <v-flex xs-12>
                  <v-text-field
                    :error-messages="usernameErrors"
                    label="Email"
                    @blur="$v.username.$touch()"
                    v-model="username"
                  ></v-text-field>
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
                  ></v-text-field>
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
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>

            <v-btn @click="register" :disabled="$v.$invalid" color="primary">Register</v-btn>
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

import { withParams } from "vuelidate/lib";
import { validationMixin } from "vuelidate";

import NoAuthenticationMixin from "../../mixins/NoAuthentication";
import ErrorGenerator, { FormValidator } from "../../shared/error-parser";
import errorMessage from "../../shared/error-dictionary";
import CustomValidators from "../../shared/validators";

@Component({
  mixins: [NoAuthenticationMixin, validationMixin],
  validations: {
    firstName: { required, minLength: minLength(3) },
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
    return ErrorGenerator.parse(<FormValidator>this.$v.firstName, "First name");
  }

  get lastNameErrors() {
    return ErrorGenerator.parse(<FormValidator>this.$v.lastName, "Last name");
  }

  get usernameErrors() {
    return ErrorGenerator.parse(<FormValidator>this.$v.username, "Email");
  }

  get passwordErrors() {
    return ErrorGenerator.parse(<FormValidator>this.$v.password, "Password");
  }

  get passwordConfirmationErrors() {
    return ErrorGenerator.parse(
      <FormValidator>this.$v.passwordConfirmation,
      "Password confirmation"
    );
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




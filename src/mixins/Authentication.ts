import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AuthenticationMixin extends Vue {
  beforeRouteEnter(to: any, from: any, next: any) {
    next(vm => {
      if (vm.isLoggedIn) {
        next();
      } else {
        next("/login");
      }
    });
  }
}

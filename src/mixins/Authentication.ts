import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
@Component({})
export default class AuthenticationMixin extends Vue {
  beforeRouteEnter(to: any, from: any, next: any) {
    next(vm => {
      if (vm.isPermitted) {
        next();
      } else {
        next("/login");
      }
    });
  }
}

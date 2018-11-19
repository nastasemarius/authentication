
import { withParams } from 'vuelidate/lib';
export default class CustomValidators {
    public static between(min, max) {
        return withParams({ min, max }, val => val.length >= min && val.length <= max);
    }

}
import { Validation } from "vuelidate";
import errorMessage from "./error-dictionary";

export interface FormValidator extends Validation {
  isUnique: (arg: string) => Promise<boolean> | boolean;
  required: (arg: string) => boolean;
  minLength: (arg: string) => boolean;
  sameAs: (arg: string) => boolean;
  email: (arg: string) => boolean;
}

const PARAM_VALUE_MAP = {
  minLength: "min",
  maxLength: "max",
  between: ["min", "max"]
};

class ErrorMessages {
  public parse(
    validator: FormValidator,
    field1: string,
    field2?: string
  ): string[] {
    const errors: any[] = [];

    if (!validator.$dirty) return errors;
    for (const [key, value] of Object.entries(validator)) {
      if (!value && !key.includes("$")) {
        const { param1, param2 } = this.determineParams(validator, key);
        errors.push(errorMessage(key, field1, param1, field2, param2));
      }
    }

    return errors;
  }

  determineParams(validator, key) {
    let param1;
    let param2;

    if (PARAM_VALUE_MAP[key]) {
      if (Array.isArray(PARAM_VALUE_MAP[key])) {

        let pk1 = PARAM_VALUE_MAP[key][0];
        let pk2 = PARAM_VALUE_MAP[key][1];

        param1 = validator.$params[key][pk1];
        param2 = validator.$params[key][pk2];
      } else {
        param1 = validator.$params[key][PARAM_VALUE_MAP[key]];
      }
    }
    return { param1, param2 };
  }
}

export default new ErrorMessages();

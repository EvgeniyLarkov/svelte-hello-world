import { writable } from "svelte/store";

export type ValidatorType = (...args: unknown[]) => string | true;

function buildValidator(validators: ValidatorType[]) {
  return function validate(value: string, dirty: boolean) {
    if (!validators || validators.length === 0) {
      return { dirty, valid: true, message: '' };
    }

    const failing = validators.find((v) => v(value) !== true);

    return {
      dirty,
      valid: !failing,
      message: (failing && failing(value) as string) || '',
    };
  };
}

export function createFieldValidator(...validators: ValidatorType[]) {
  const { subscribe, set } = writable<{
    dirty: boolean,
    valid: boolean,
    message: string,
  }>({
    dirty: false,
    valid: false,
    message: '',
  });
  const validator = buildValidator(validators);

  function action(node: HTMLInputElement | HTMLTextAreaElement, binding: string) {
    function validate(value: string, dirty: boolean) {
      const result = validator(value, dirty);
      set(result);
    }

    validate(binding, false);

    return {
      update(value: string) {
        validate(value, true);
      },
    };
  }

  return [{ subscribe }, action] as const;
}

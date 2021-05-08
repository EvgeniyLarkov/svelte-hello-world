<script lang="ts">
  import { createFieldValidator } from "src/validation/core";
  import {
    lengthValidator,
    requiredValidator,
  } from "src/validation/validators";

  let text = "";
  let author = "";
  export let setData: (x: { [x: string]: any }) => void;
  export let addMessage: (
    ...str: Array<{ msg: string; type: "error" | "success" | "warning" }>
  ) => void;
  export let submitForm: () => void;

  const [nameValidation, validateName] = createFieldValidator(
    requiredValidator(),
    lengthValidator(4, 20)
  );
  const [textValidation, validateText] = createFieldValidator(
    requiredValidator(),
    lengthValidator(10, 500)
  );

  $: validationFields = [$nameValidation, $textValidation];
  $: isFieldsValid = validationFields.every((field) => field.valid);

  const handleSubmit = () => {
    setData({ text, author });

    validationFields.forEach((field) => {
      if (!field.valid) {
        addMessage({
          msg: field.message,
          type: "error",
        });
      }
    });

    console.log(validationFields);
    if (isFieldsValid) {
      submitForm();
    }
  };
</script>

<form
  class="pure-form pure-form-stacked"
  on:submit|preventDefault={handleSubmit}
>
  <fieldset class="pure-group">
    <legend>Provide some info about marker</legend>
    <input
      class="pure-input-1-2"
      type="text"
      id="stacked-name"
      placeholder="Your name"
      bind:value={author}
      class:field-danger={!$nameValidation.valid}
      use:validateName={author}
    />
    <textarea
      class="pure-input-1-2"
      id="stacked-message"
      placeholder="Your marker message"
      bind:value={text}
      class:field-danger={!$textValidation.valid}
      use:validateText={text}
    />
  </fieldset>
  <button
    type="submit"
    class="pure-button pure-button-primary"
    disabled={!isFieldsValid}
  >
    Add marker
  </button>
</form>

<style>
  .pure-form .field-danger {
    border-color: red;
  }
</style>

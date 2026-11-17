class FormWorker {
  getErrors(errors, target, form) {
    const validator = {
      recieptId: (value) => {
        if (value.length < 4) {
          return "invalid reciept ID";
        }
        return false;
      },
    };

    if (!target.value.length) {
      return { ...errors, [target.name]: "required" };
    }

    if (validator[target.name]) {
      const error = validator[target.name](target.value, form);
      if (error) {
        return { ...errors, [target.name]: error };
      }
    }

    const { [target.name]: value, ...remainingErrors } = errors;
    return remainingErrors;
  }
}

export default FormWorker;

const Errors = {
    'minLength': '%{field} must be at least %{value1} characters long',
    'maxLength': '%{field} must be at most %{value1} characters long',
    'required': '%{field} is required',
    'email': '%{field} is not valid',
    'sameAs': '%{field} must match %{field2}',
    'unique': '%{field} already exists'
}

export default function errorMessage(errorType, field: string, value1?: string, field2?: string, value2?: string) {
    let err: string = Errors[errorType];

    if (err) {
        return err
            .replace('%{field}', field)
            .replace('%{field2}', field2 || '')
            .replace('%{value1}', value1 || '')
            .replace('%{value2}', value2 || '');
    }
    return 'Error message not found';

}
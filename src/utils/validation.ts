export const validateForm = (formData: { name: string; email: string; age?: number | undefined }) => {
    const errors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 3) errors.name = "Name must be at least 3 characters.";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid email format.";
    if (formData.age && isNaN(Number(formData.age))) errors.age = "Age must be a number.";
    return errors;
  };
  
export const processData = <T extends Record<string, any>>(
  data: T,
  required: (keyof T)[]
): T => {
  // Convert empty strings to null for validation
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'string' && data[key].trim() === '') {
      (data as any)[key] = null;
    }
  });

  // Check for required fields
  const missingFields = required.filter((field) => !data[field]);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  return data;
};

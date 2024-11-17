export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getImagePath(imagePath: string) {
  const cloudinaryBaseUrl = "https://res.cloudinary.com";
  if (imagePath.startsWith(cloudinaryBaseUrl)) {
    return imagePath;
  } else {
    return `/products/${imagePath}.jpg`;
  }
}

export function excludeKeys<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  // Creamos un nuevo objeto excluyendo las claves especificadas
  const result = { ...obj };

  keys.forEach((key) => {
    delete result[key]; // TypeScript sabe que 'key' es una clave válida de 'T'
  });

  return result;
}

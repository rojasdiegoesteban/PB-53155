let products = [];


const addProduct = (title, description, price, thumbnail, code, stock) => {
  const newProduct = {
    id: products.length + 1,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  };


  if (Object.values(newProduct).includes(undefined)) {
    console.log("Todos los campos son obligatorios");
    return;
  }

  const productExists = products.find((product) => product.code === code);
  if (productExists) {
    console.log(`Ya existe el producto con el código ${code}`);
    return;
  }

  products.push(newProduct);
};

const getProducts = () => {
  console.log(products);
  return products;
};

const getProductById = (id) => {
  const product = products.find( product => product.id === id);
  if(!product) {
    console.log(`No se encontró el producto con el id ${id}`);
    return;
  }

  console.log(product);
  return product;
};

// Test
addProduct("Camisa de algodón", "Camisa de algodón de manga larga", 29.99, "https://ejemplo.com/camisa.jpg", "CM001", 50);
addProduct("Pantalones vaqueros", "Pantalones vaqueros de corte clásico", 39.99, "https://ejemplo.com/pantalones.jpg", "PN002", 30);
addProduct("Zapatillas deportivas", "Zapatillas deportivas para correr", 49.99, "https://ejemplo.com/zapatillas.jpg", "ZP003", 25);
addProduct("Chaqueta de cuero", "Chaqueta de cuero genuino", 99.99, "https://ejemplo.com/chaqueta.jpg", "CH004", 20);
addProduct("Sombrero de paja", "Sombrero de paja trenzada", 19.99, "https://ejemplo.com/sombrero.jpg", "SH005", 40);
addProduct("Bufanda de lana", "Bufanda de lana suave y cálida", 14.99, "https://ejemplo.com/bufanda.jpg", "BF006", 35);
addProduct("Reloj de pulsera", "Reloj de pulsera con correa de cuero", 79.99, "https://ejemplo.com/reloj.jpg", "RL007", 15);
addProduct("Mochila resistente", "Mochila resistente al agua con múltiples compartimentos", 59.99, "https://ejemplo.com/mochila.jpg", "MC008", 10);
addProduct("Gafas de sol", "Gafas de sol polarizadas con montura de metal", 34.99, "https://ejemplo.com/gafas.jpg", "GS009", 20);
addProduct("Pulsera de plata", "Pulsera de plata con diseño elegante", 49.99, "https://ejemplo.com/pulsera.jpg", "PS010", 30);
addProduct("Zapatillas deportivas", "Zapatillas deportivas para correr", 49.99, "https://ejemplo.com/zapatillas.jpg", "ZP003", 25);

// getProducts();
getProductById(7);

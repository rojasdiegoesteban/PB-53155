//Agrego modulo fileSystem
const fs = require("fs");

let products = [];
// Guardo la ruta del archivo para reutilizar
let pathFile = "./data/products.json";


const addProduct = async (title, description, price, thumbnail, code, stock) => {
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
    console.log(`El producto ${title} con el código ${code} ya existe`);
    return;
  }

  products.push(newProduct);

  // Guardo la información del array products en el archivo json
  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

const getProductsJson = async () => {
  try {
    // leo el contenido del archivo y lo guardo en formato string
    const productsJson = await fs.promises.readFile(pathFile, "utf8");
    //convierto el resultado de tipo texto a json para tener acceso a cada posicion del array
    products = JSON.parse(productsJson) || [];
    return products;  

    //Si no existe el archivo devuelvo un array vacio
  } catch (error) {
    return [];
  }
};

const getProducts = async () => {
  await getProductsJson();
  console.log(products);
}

const getProductById = async (id) => {
  // cargo el array products con los datos del archivo json
  await getProductsJson();
  //Busco en el array el producto por id
  const product = products.find((product) => product.id === id);

  if (!product) {
    console.log(`No se encontró el producto con el id ${id}`);
    return;
  }

  console.log(product);
  return product;
};

// Metodo para actualizar un producto
const updateProduct = async (id, dataProduct) => {
  await getProductsJson();
  // Busco la posicion indice dentro del array products
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    console.log(`No se encontró el producto con el id ${id} para actualizar`);
  }
  
  products[index] = {
    // Hago una copia del producto
    ...products[index],
    // Sobrescribo las propiedades que recibo por parámetro
    ...dataProduct,
  };
  // piso el contenido del arcivo json con la nueva info
  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

// Metodo para eliminar un producto
const deleteProduct = async (id) => {
  await getProductsJson();
  // products = products.filter( product => product.id !== id);

  //Busco el indice del producto que necesito eliminar
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    console.log(`No se encontró el producto con el id ${id} para eliminar`);
  }
  // Elimino el producto en el indice especificado
  products.splice(index, 1);

  await fs.promises.writeFile(pathFile, JSON.stringify(products));
}



// Test
// LLamo a getProducts() sin haber cargado ningun producto
getProducts();

// LLamo a getProductById() sin haber cargado ningun producto
// getProductById(2);

// Agrego productos
/* addProduct("Camisa de algodón", "Camisa de algodón de manga larga", 29.99, "https://ejemplo.com/camisa.jpg", "CM001", 50);
addProduct("Pantalones vaqueros", "Pantalones vaqueros de corte clásico", 39.99, "https://ejemplo.com/pantalones.jpg", "PN002", 30);
addProduct("Zapatillas deportivas", "Zapatillas deportivas para correr", 49.99, "https://ejemplo.com/zapatillas.jpg", "ZP003", 25);
addProduct("Chaqueta de cuero", "Chaqueta de cuero genuino", 99.99, "https://ejemplo.com/chaqueta.jpg", "CH004", 20);
addProduct("Bufanda de lana", "Bufanda de lana suave y cálida", 14.99, "https://ejemplo.com/bufanda.jpg", "BF006", 35);
addProduct("Reloj de pulsera", "Reloj de pulsera con correa de cuero", 79.99, "https://ejemplo.com/reloj.jpg", "RL007", 15);
addProduct("Mochila resistente", "Mochila resistente al agua con múltiples compartimentos", 59.99, "https://ejemplo.com/mochila.jpg", "MC008", 10);
addProduct("Gafas de sol", "Gafas de sol polarizadas con montura de metal", 34.99, "https://ejemplo.com/gafas.jpg", "GS009", 20);
addProduct("Zapatillas deportivas", "Zapatillas deportivas para correr", 49.99, "https://ejemplo.com/zapatillas.jpg", "ZP003", 25); */

// LLamo a getProducts() luego de haber cargado productos
// getProducts();

// LLamo a getProductById() luego de haber cargado productos
// getProductById(4);

// LLamo a updateProduct()
// updateProduct(2, {"description": "Jeans de corte oversize"});

// Muestro por pantalla para verificar que se haya modificado
// getProductById(2);

//Llamo a deleteProduct()
// deleteProduct(5);

// Muestro por pantalla todos los productos para verificar que se haya eliminado
// getProducts();


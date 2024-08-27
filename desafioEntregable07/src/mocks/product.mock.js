import { fakerES as faker } from "@faker-js/faker";

export const generateProductsMocks = (amount) => {
    const products = [];

    for (let i = 0; i < amount; i++) {
        const product = {
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            /* thumbnail: [faker.image.url()],
            code: faker.string.alphanumeric(10),
            stock: faker.number.int(9000),
            status: true,
            price: faker.number.int(999000),
            category: faker.commerce.department() */
        };

        products.push(product);
    };

    return products;
}
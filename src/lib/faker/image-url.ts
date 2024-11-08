import { faker } from "@faker-js/faker";

const imageUrls = [
  "https://rpbcompany.com.br/static/1.jpg",
  "https://rpbcompany.com.br/static/2.jpg",
  "https://rpbcompany.com.br/static/3.jpg",
  "https://rpbcompany.com.br/static/4.jpg",
  "https://rpbcompany.com.br/static/5.jpg",
  "https://rpbcompany.com.br/static/6.jpg",
  "https://rpbcompany.com.br/static/7.jpg",
  "https://rpbcompany.com.br/static/8.jpg",
  "https://rpbcompany.com.br/static/9.jpg",
  "https://rpbcompany.com.br/static/10.jpg",
  "https://rpbcompany.com.br/static/11.jpg",
  "https://rpbcompany.com.br/static/12.jpg",
  "https://rpbcompany.com.br/static/13.jpg",
  "https://rpbcompany.com.br/static/14.jpg",
  "https://rpbcompany.com.br/static/15.jpg",
  "https://rpbcompany.com.br/static/16.jpg",
  "https://rpbcompany.com.br/static/17.jpg",
  "https://rpbcompany.com.br/static/18.jpg",
];

export function getRandomImageUrl() {
  return faker.helpers.arrayElement(imageUrls);
}
